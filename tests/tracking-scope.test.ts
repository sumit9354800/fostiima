// GTM and Microsoft Clarity: public routes only, never on /admin.
// Run: npm test (needs --experimental-test-module-mocks, set in package.json).
//
// PublicTracking is rendered to HTML with react-dom/server, with
// next/navigation and next/script replaced by module mocks, so the test sees
// exactly what the component renders for a given path. It cannot prove how a
// real browser loads the scripts: that still needs browser verification.

import { before, describe, mock, test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import {
  CLARITY_PROJECT_ID,
  GTM_ID,
  isTrackedPath,
  shouldReloadToStopTracking,
} from "../src/lib/tracking-scope";

let currentPath: string | null = "/";

mock.module("next/navigation", {
  namedExports: { usePathname: () => currentPath },
});
mock.module("next/script", {
  defaultExport: ({ id, strategy, children }: { id: string; strategy: string; children?: ReactNode }) =>
    createElement("script", { id, "data-strategy": strategy }, children),
});

let PublicTracking: () => ReactNode;

before(async () => {
  PublicTracking = (await import("../src/components/common/PublicTracking")).default;
});

function renderAt(pathname: string | null): string {
  currentPath = pathname;
  return renderToStaticMarkup(createElement(PublicTracking));
}

const PUBLIC_PATHS = [
  "/",
  "/contact-us",
  "/programs/pgdm",
  "/pgdm-admission",
  "/ag-landing-page",
  "/thank-you",
  "/admissions",
  "/administration-and-governance",
  "/does-not-exist",
];

const ADMIN_PATHS = [
  "/admin",
  "/admin/",
  "/admin/login",
  "/admin/admission-enquiries",
  "/admin/contact-messages",
  "/admin/home/placement-videos",
  "/admin/blog/123/edit",
  "/admin/not-a-page",
  "/ADMIN/contact-messages",
];

describe("isTrackedPath", () => {
  for (const pathname of PUBLIC_PATHS) {
    test(`tracked: ${pathname}`, () => assert.equal(isTrackedPath(pathname), true));
  }
  for (const pathname of ADMIN_PATHS) {
    test(`not tracked: ${pathname}`, () => assert.equal(isTrackedPath(pathname), false));
  }
  test("missing pathname fails closed", () => {
    assert.equal(isTrackedPath(null), false);
    assert.equal(isTrackedPath(undefined), false);
    assert.equal(isTrackedPath(""), false);
  });
});

describe("shouldReloadToStopTracking (client-side navigation into Admin)", () => {
  test("public page viewed, then Admin via client navigation -> reload", () => {
    assert.equal(shouldReloadToStopTracking("/admin/contact-messages", true), true);
  });
  test("Admin opened directly (tracking never started) -> no reload, no loop", () => {
    assert.equal(shouldReloadToStopTracking("/admin/contact-messages", false), false);
  });
  test("public pages never reload", () => {
    assert.equal(shouldReloadToStopTracking("/contact-us", true), false);
    assert.equal(shouldReloadToStopTracking("/thank-you", false), false);
  });
});

describe("PublicTracking render", () => {
  for (const pathname of ["/", "/pgdm-admission", "/ag-landing-page", "/thank-you"]) {
    test(`public ${pathname}: GTM script, GTM noscript iframe and Clarity, once each`, () => {
      const html = renderAt(pathname);
      assert.equal(html.split('id="google-tag-manager"').length - 1, 1);
      assert.equal(html.split('id="microsoft-clarity"').length - 1, 1);
      assert.equal(html.split("googletagmanager.com/ns.html?id=GTM-5V6T54N").length - 1, 1);
      assert.ok(html.includes("'dataLayer','GTM-5V6T54N'"));
      assert.ok(html.includes('"clarity", "script", "zcg11c51hw"'));
    });
  }

  test("public: both scripts use afterInteractive", () => {
    const html = renderAt("/");
    assert.equal(html.split('data-strategy="afterInteractive"').length - 1, 2);
    assert.ok(!html.includes("beforeInteractive"));
  });

  for (const pathname of ADMIN_PATHS) {
    test(`admin ${pathname}: renders nothing (no GTM, no noscript iframe, no Clarity)`, () => {
      assert.equal(renderAt(pathname), "");
    });
  }

  test("GTM bootstrap is the standard snippet, separate from lead events", () => {
    const html = renderAt("/");
    assert.ok(html.includes("event:'gtm.js'"));
    for (const forbidden of ["generate_lead", "contact_lead", "lead_type", "user_data"]) {
      assert.ok(!html.includes(forbidden), forbidden);
    }
  });
});

describe("Single installation (source scan)", () => {
  function sourceFiles(dir: string): string[] {
    return readdirSync(dir).flatMap((entry) => {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) return entry === "generated" ? [] : sourceFiles(full);
      return /\.(ts|tsx|js|jsx)$/.test(entry) ? [full] : [];
    });
  }
  const files = sourceFiles(path.resolve("src")).map((file) => ({
    relative: path.relative(process.cwd(), file).replace(/\\/g, "/"),
    text: readFileSync(file, "utf8"),
  }));

  test("IDs are unchanged", () => {
    assert.equal(GTM_ID, "GTM-5V6T54N");
    assert.equal(CLARITY_PROJECT_ID, "zcg11c51hw");
  });

  test("GTM and Clarity IDs are defined only in src/lib/tracking-scope.ts", () => {
    for (const id of [GTM_ID, CLARITY_PROJECT_ID]) {
      assert.deepEqual(
        files.filter((file) => file.text.includes(id)).map((file) => file.relative),
        ["src/lib/tracking-scope.ts"],
        id,
      );
    }
  });

  test("only PublicTracking loads the GTM and Clarity scripts", () => {
    for (const marker of ["googletagmanager.com", "clarity.ms/tag"]) {
      assert.deepEqual(
        files.filter((file) => file.text.includes(marker)).map((file) => file.relative),
        ["src/components/common/PublicTracking.tsx"],
        marker,
      );
    }
  });

  test("root layout mounts PublicTracking once and has no inline tracking", () => {
    const layout = readFileSync(path.resolve("src/app/layout.tsx"), "utf8");
    assert.equal(layout.split("<PublicTracking />").length - 1, 1);
    for (const forbidden of ["beforeInteractive", "googletagmanager", "clarity.ms", "next/script"]) {
      assert.ok(!layout.includes(forbidden), forbidden);
    }
  });

  test("Admin layouts do not mount tracking", () => {
    for (const file of ["src/app/admin/layout.tsx", "src/app/admin/(protected)/layout.tsx", "src/app/admin/AdminShell.tsx"]) {
      const text = readFileSync(path.resolve(file), "utf8");
      assert.ok(!text.includes("PublicTracking"), file);
    }
  });

  test("Admin shell carries the Clarity mask safeguard", () => {
    assert.ok(readFileSync(path.resolve("src/app/admin/AdminShell.tsx"), "utf8").includes('data-clarity-mask="true"'));
  });

  test("AttributionCapture keeps its /admin exclusion", () => {
    assert.ok(readFileSync(path.resolve("src/components/common/AttributionCapture.tsx"), "utf8").includes('pathname?.startsWith("/admin")'));
  });

  test("Enhanced Conversions helper stays unused", () => {
    assert.deepEqual(
      files.filter((file) => /from\s+["']@\/lib\/enhanced-conversions["']/.test(file.text)).map((file) => file.relative),
      [],
    );
  });
});

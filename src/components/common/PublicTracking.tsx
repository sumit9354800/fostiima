"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

import {
  CLARITY_PROJECT_ID,
  GTM_ID,
  isTrackedPath,
  shouldReloadToStopTracking,
} from "@/lib/tracking-scope";

// Set once GTM/Clarity have been rendered in this document. Module state
// lives as long as the document, which is exactly how long the scripts live.
let trackingStarted = false;

/**
 * The site's only Google Tag Manager and Microsoft Clarity installation.
 *
 * Mounted once in the root layout so every public route keeps tracking,
 * including pages outside the (site) group (/pgdm-admission,
 * /ag-landing-page, /thank-you, 404). Renders nothing on /admin routes: no
 * GTM script, no GTM noscript iframe, no Clarity. This also applies during
 * server rendering, because usePathname is available there.
 *
 * Both scripts use `afterInteractive`: `beforeInteractive` scripts are always
 * emitted into the HTML of every route, so they cannot be scoped by path.
 * next/script de-duplicates by `id`, so remounting never runs a script twice.
 */
export default function PublicTracking() {
  const pathname = usePathname();
  const tracked = isTrackedPath(pathname);

  useEffect(() => {
    if (tracked) {
      trackingStarted = true;
      return;
    }
    if (shouldReloadToStopTracking(pathname, trackingStarted)) {
      window.location.reload();
    }
  }, [pathname, tracked]);

  if (!tracked) return null;

  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>

      {/* Microsoft Clarity */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
        `}
      </Script>

      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{
            display: "none",
            visibility: "hidden",
          }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}

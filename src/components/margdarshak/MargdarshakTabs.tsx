"use client";

import { useState } from "react";

import {
  margdarshakTabs,
  type MargdarshakTabId,
} from "@/data/margdarshak";

import Margdarshak1 from "./Margdarshak1";
import Margdarshak2 from "./Margdarshak2";
import Margdarshak3 from "./Margdarshak3";
import Margdarshak4 from "./Margdarshak4";

function TabContent({
  selectedTab,
}: {
  selectedTab: MargdarshakTabId;
}) {
  switch (selectedTab) {
    case "margdarshak-1":
      return <Margdarshak1 />;

    case "margdarshak-2":
      return <Margdarshak2 />;

    case "margdarshak-3":
      return <Margdarshak3 />;

    case "margdarshak-4":
      return <Margdarshak4 />;

    default:
      return null;
  }
}

export default function MargdarshakTabs() {
  const [selectedTab, setSelectedTab] =
    useState<MargdarshakTabId>(
      "margdarshak-1",
    );

  return (
    <section
      id="margdarshak-awards"
      className="bg-slate-50"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
            Margdarshak Awards
          </p>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#102a56] sm:text-4xl">
            Editions
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Margdarshak editions"
          className="grid grid-cols-2 gap-2 rounded-2xl border border-slate-200 bg-white p-2 md:grid-cols-4"
        >
          {margdarshakTabs.map((tab) => {
            const isActive =
              selectedTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() =>
                  setSelectedTab(tab.id)
                }
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 sm:px-5 sm:py-3.5 ${
                  isActive
                    ? "bg-[#102a56] text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100 hover:text-[#102a56]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          className="mt-8"
          role="tabpanel"
        >
          <TabContent selectedTab={selectedTab} />
        </div>
      </div>
    </section>
  );
}
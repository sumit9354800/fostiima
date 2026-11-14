import {
  describeLeadAttribution,
  type LeadAttributionRecord,
} from "@/lib/lead-attribution";

function formatTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

/**
 * Lead source and first-touch campaign details for an admission or contact
 * enquiry in Admin. Legacy rows (no attribution captured) say so instead of
 * showing a channel label. Shows campaign data only, no personal data.
 */
export default function LeadAttributionPanel({
  record,
}: {
  record: LeadAttributionRecord;
}) {
  const display = describeLeadAttribution(record);

  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
        Lead source
      </p>
      <p
        className={`mt-1 text-sm font-semibold ${
          display.legacy ? "text-slate-500" : "text-[#061A3A]"
        }`}
      >
        {display.sourceLabel}
      </p>

      {display.legacy ? (
        display.storedSource && (
          <p className="mt-1 text-xs text-slate-500">
            Stored value from before attribution tracking:{" "}
            {display.storedSource}
          </p>
        )
      ) : (
        <dl className="mt-3 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-[9rem_1fr]">
          {display.rows.map((row) => (
            <div key={row.label} className="contents">
              <dt className="text-xs text-slate-500 sm:py-0.5">{row.label}</dt>
              <dd className="whitespace-pre-line break-all text-slate-800">
                {row.value ?? <span className="text-slate-400">—</span>}
              </dd>
            </div>
          ))}
          <div className="contents">
            <dt className="text-xs text-slate-500 sm:py-0.5">First touch</dt>
            <dd className="text-slate-800">
              {display.firstTouchAt ? (
                formatTimestamp(display.firstTouchAt)
              ) : (
                <span className="text-slate-400">—</span>
              )}
            </dd>
          </div>
        </dl>
      )}
    </div>
  );
}

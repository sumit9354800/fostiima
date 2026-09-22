import { RefundPolicyContent } from "@/components/refund-policy/RefundPolicyContent";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="relative overflow-hidden bg-[#061a3a]">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5b83f]">
            Policies
          </p>

          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Refund Policy &amp; Cancellation Policy
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#b8c5d8] sm:text-base">
            Information regarding admission withdrawal and refund requests.
          </p>
        </div>
      </section>

      <RefundPolicyContent />
    </main>
  );
}
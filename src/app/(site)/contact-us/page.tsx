import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | FOSTIIMA Business School",
  description:
    "Contact FOSTIIMA Business School for admissions and programme enquiries.",
};

export default function ContactUsPage() {
  return (
    <>
      <ContactHero />

      <main className="bg-[#f8fafc] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <ContactInfo />
          <ContactForm />
        </div>
      </main>

      <section className="border-t border-[#dbe3ee] bg-white px-6 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="border-l-4 border-[#e5b83f] bg-[#f8fafc] px-5 py-4">
            <p className="text-sm leading-6 text-slate-600">
              For official admission confirmation and programme-specific
              information, please contact FOSTIIMA Admissions directly.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#f8fafc] px-6 pb-16 sm:px-8 lg:px-12 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
              Find Us
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#061a3a] sm:text-3xl">
              Visit FOSTIIMA Business School
            </h2>
          </div>

          <div className="overflow-hidden border border-[#dbe3ee] bg-white shadow-[0_16px_50px_rgba(6,26,58,0.08)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.1740789044543!2d77.0667725!3d28.5809439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce25e35301717%3A0xc928e6782b250d7c!2sFOSTIIMA%20Business%20School!5e1!3m2!1sen!2sin!4v1789591812361!5m2!1sen!2sin"
              className="h-[320px] w-full sm:h-[400px] lg:h-[450px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="FOSTIIMA Business School Location"
            />
          </div>
        </div>
      </section>
    </>
  );
}

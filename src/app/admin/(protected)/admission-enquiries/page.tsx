
import AdmissionEnquiriesTable from "@/components/admin/admission-enquiries/AdmissionEnquiriesTable";

export const metadata = {
  title: "Admission Enquiries | FOSTIIMA Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdmissionEnquiriesPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <AdmissionEnquiriesTable />
      </div>
    </main>
  );
}

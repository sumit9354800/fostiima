export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#c31e3b]"
          aria-label="Loading"
        />

        <p className="text-sm font-medium text-gray-600">
          Loading...
        </p>
      </div>
    </main>
  );
}
export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="text-center">
        <p className="mb-2 text-6xl font-bold text-[#c31e3b]">404</p>

        <h1 className="mb-3 text-2xl font-semibold text-gray-900">
          Page Not Found
        </h1>

        <p className="text-gray-600">
          The page you are looking for does not exist.
        </p>
      </div>
    </main>
  );
}
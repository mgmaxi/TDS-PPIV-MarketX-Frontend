export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-bold text-indigo-600 mb-4">404</h1>
      <p className="text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <a
        href="/"
        className="text-indigo-600 font-semibold hover:underline"
      >
        Go back home
      </a>
    </main>
  );
}

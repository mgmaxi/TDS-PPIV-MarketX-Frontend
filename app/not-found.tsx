import { Link } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center">
      <p className="text-gray-600 mb-6">Parece que esta página no existe</p>
      <Link
        href="/"
        className="text-indigo-600 font-semibold hover:underline"
      >
        Ir a la página principal
      </Link>
    </main>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Vitajte na Tvojton.online
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Všetko pre váš e-shop na jednom mieste
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-brand-600 mb-4">
              Brand Twin AI
            </h2>
            <p className="text-gray-600 mb-4">
              AI asistent pre komunikáciu so zákazníkmi, SEO optimalizáciu 
              a generovanie obsahu. Podporuje SK, CZ, HR a EN jazyky.
            </p>
            <Link
              href="/agent"
              className="inline-block bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700 transition"
            >
              Vyskúšať Brand Twin
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-brand-600 mb-4">
              E-shop služby
            </h2>
            <p className="text-gray-600 mb-4">
              Kompletné riešenia pre váš e-shop vrátane marketingu, 
              reklamácií a automatizácie.
            </p>
            <button
              className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
              disabled
            >
              Čoskoro...
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

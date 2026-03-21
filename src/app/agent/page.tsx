import BrandTwinChat from "@/components/BrandTwinChat";

export const metadata = {
  title: "Brand Twin AI - Tvojton.online",
  description: "AI asistent pre vašu firmu - komunikácia, SEO, reklamácie",
};

export default function AgentPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Brand Twin AI
          </h1>
          <p className="text-gray-600">
            Váš autonómny obchodný asistent pre e-shopy a malé firmy
          </p>
        </div>
        
        <BrandTwinChat />
        
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-brand-600 mb-2">💬 Komunikácia</h3>
            <p className="text-sm text-gray-600">
              Odpovedá na otázky zákazníkov vo vašom jazyku
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-brand-600 mb-2">📝 SEO</h3>
            <p className="text-sm text-gray-600">
              Pomáha s optimalizáciou pre vyhľadávače
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-brand-600 mb-2">📋 Reklamácie</h3>
            <p className="text-sm text-gray-600">
              Profesionálne vyrieši reklamácie zákazníkov
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tvojton.online - Všetko pre váš e-shop",
  description: "Brand Twin AI asistent pre vašu firmu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <body className="antialiased">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="text-2xl font-bold text-brand-600">
                  Tvojton.online
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href="/"
                  className="text-gray-700 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Domov
                </a>
                <a
                  href="/agent"
                  className="text-brand-600 hover:text-brand-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Brand Twin AI
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

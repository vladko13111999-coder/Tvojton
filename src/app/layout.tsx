import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TvojKlip - Premeniť Video na Krátke Klipy',
  description: 'Aplikácia na premenu dlhých videí na krátke virálne klipy pre TikTok, YouTube Shorts a Instagram Reels. Jednoduché, rýchle, bez AI.',
  keywords: 'video editor, TikTok, YouTube Shorts, klipy, virálne video, video strih',
  openGraph: {
    title: 'TvojKlip - Video to Short Clips',
    description: 'Premeniť dlhé videá na krátke klipy za pár sekúnd',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sk">
      <body className={inter.className}>
        <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TK</span>
                </div>
                <span className="text-xl font-bold gradient-text">TvojKlip</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <Link href="/blog" className="text-dark-300 hover:text-white transition-colors">
                  Blog
                </Link>
                <Link href="/cennik" className="text-dark-300 hover:text-white transition-colors">
                  Cenník
                </Link>
                <Link href="/app" className="btn-primary text-sm py-2 px-4">
                  Začať teraz
                </Link>
              </div>
            </div>
          </nav>
        </header>
        
        <main className="pt-16">
          {children}
        </main>
        
        <footer className="bg-dark-950 border-t border-dark-800 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <Link href="/" className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">TK</span>
                  </div>
                  <span className="text-xl font-bold gradient-text">TvojKlip</span>
                </Link>
                <p className="text-dark-400 text-sm mb-4">
                  Jednoduchý nástroj na premenu dlhých videí na krátke virálne klipy pre TikTok, YouTube Shorts a Instagram Reels.
                </p>
                <p className="text-dark-500 text-xs">
                  © 2024 tvojton.online. Všetky práva vyhradené.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Odkazy</h4>
                <ul className="space-y-2 text-sm text-dark-400">
                  <li><Link href="/o-nas" className="hover:text-primary-400 transition-colors">O nás</Link></li>
                  <li><Link href="/blog" className="hover:text-primary-400 transition-colors">Blog</Link></li>
                  <li><Link href="/kontakt" className="hover:text-primary-400 transition-colors">Kontakt</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Právne</h4>
                <ul className="space-y-2 text-sm text-dark-400">
                  <li><Link href="/gdpr" className="hover:text-primary-400 transition-colors">GDPR</Link></li>
                  <li><Link href="/podmienky" className="hover:text-primary-400 transition-colors">Podmienky</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
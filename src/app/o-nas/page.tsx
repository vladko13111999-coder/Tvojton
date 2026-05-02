import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">
          O <span className="gradient-text">nás</span>
        </h1>
        
        <div className="space-y-8">
          <section className="card">
            <h2 className="text-xl font-semibold mb-4">Kto sme</h2>
            <p className="text-dark-400">
              TvojKlip je slovenský nástroj vytvorený pre tvorcov obsahu na sociálnych sieťach. 
              Veríme, že každý by mal mať prístup k jednoduchým nástrojom na vytváranie virálneho obsahu.
            </p>
          </section>

          <section className="card">
            <h2 className="text-xl font-semibold mb-4">Naša misia</h2>
            <p className="text-dark-400">
              Zjednodušiť proces vytvárania krátkych videí pre TikTok, YouTube Shorts a Instagram Reels. 
              Bez zložitých editačných softvérov, bez AI - jednoducho a efektívne.
            </p>
          </section>

          <section className="card">
            <h2 className="text-xl font-semibold mb-4">Naše hodnoty</h2>
            <ul className="space-y-2 text-dark-400">
              <li>✓ Jednoduchosť - jednoduché použitie</li>
              <li>✓ Transparentnosť - žiadne skryté poplatky</li>
              <li>✓ Lokálnosť - podpora v slovenčine</li>
              <li>✓ Súkromie - vaše dáta sú v bezpečí</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link href="/kontakt" className="btn-primary">
            Kontaktuj nás
          </Link>
        </div>
      </div>
    </div>
  )
}
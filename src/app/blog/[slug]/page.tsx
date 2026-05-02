import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - tvojton.online',
  description: 'Tipy, návody a stratégie pre tvorbu virálneho obsahu na TikTok, YouTube a Instagram.',
}

const articles = {
  'ako-vytvorit-viral-tiktok-za-5-minut': {
    title: 'Ako vytvoriť virálny TikTok za 5 minút',
    content: `
# Ako vytvoriť virálny TikTok za 5 minút

Chceš vytvárať virálne videá, ktoré prilákajú tisíce zhliadnutí? TU je návod!

## 1. Začni s dobrým obsahom

Najdôležitejšie je mať zaujímavý obsah. Môže to byť:
- Vtipná situácia
- Zaujímavý fakt
- Edukačný obsah
- Emocionálny moment

## 2. Použi TvojKlip

S aplikáciou TvojKlip môžeš:
- Nahrať dlhé video
- Nechať AI vybrať najlepšie momenty
- Exportovať vo formáte pre TikTok

## 3. Pridaj hudbu

Hudba je kľúčová pre virálnosť. Použi:
- Trending songs na TikTok
- Originálnu hudbu
- Bezplatnú hudbu z knižnice

## 4. Optimalizuj popis

- Použi relevantné hashtagy
- Pridaj call-to-action
- Napíš zaujímavý popis

## Záver

Virálnosť nie je o šťastí, ale o stratégii. 
Použi tieto tipy a sleduj, ako rástu tvoje počty!
    `,
    category: 'TikTok',
    readTime: '5 min',
    date: '2024-01-15',
  },
  'najlepsie-nastroje-na-klipy': {
    title: 'Top 5 nástrojov na strih videí pre Sociálne siete',
    content: `
# Top 5 nástrojov na strih videí

Porovnanie najlepších nástrojov na vytváranie krátkych videí.

## 1. TvojKlip (✓ Odporúčame)

- Jednoduché použitie
- Automatický výber klipov
- Bez AI - stabilné výsledky
- Cena: Zadarmo - 19,99€/mes

## 2. Opus Clip

- AI-powered
- Automatické generovanie
- Vyššia cena
- Cena: 19,99$/mes

## 3. Vizard

- Multi-platform
- AI funkcie
- Drahšie predplatné
- Cena: 29$/mes

## 4. Kapwing

- Online editor
- Základné funkcie
- Free verzia dostupná
- Cena: Free - 19$/mes

## 5. InShot

- Mobilná appka
- Jednoduché ovládanie
- Obsahuje reklamy
- Cena: Free

## Záver

Pre slovenský trh odporúčame TvojKlip - najlepší pomer cena/výkon!
    `,
    category: 'Nástroje',
    readTime: '8 min',
    date: '2024-01-10',
  },
  'youtube-shorts-vs-tiktok': {
    title: 'YouTube Shorts vs TikTok: Čo je lepšie pre teba?',
    content: `
# YouTube Shorts vs TikTok

Porovnanie dvoch najpopulárnejších platforiem pre krátke videá.

## TikTok

### Výhody
- Väčší dosah
- Virálnejší algoritmus
- Mladšie publikum
- Jednoduchšie nahrať

### Nevýhody
- Konkurencia
- Časovo obmedzené
- Menej monetizačné možnosti

## YouTube Shorts

### Výhody
- Monetizácia cez Shorts
- Dlhodobejšie výnosy
- Spojenie s YT kanálom
- Staršie, платejšie publikum

### Nevýhody
- Algoritmus nie taký priaznivý
- Menší organický dosah
- Náročnejšie nahrať

## Čo vybrať?

| Faktor | TikTok | Shorts |
|--------|--------|--------|
| Rýchlosť rastu | Rýchlejšia | Pomalšia |
| Monetizácia | Základná | Pokročilá |
| Publikum | Mladšie | Staršie |
| Obsah | Zábava | Vzdelávanie |

## Záver

Obe platformy sú skvelé. 
Odporúčame používať obe pre maximálny dosah!
    `,
    category: 'Porovnanie',
    readTime: '6 min',
    date: '2024-01-05',
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug as keyof typeof articles]

  if (!article) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Článok nenájdený</h1>
          <p className="text-dark-400 mb-8">Ľutujeme, tento článok neexistuje.</p>
          <Link href="/blog" className="btn-primary">
            Späť na blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <article className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link href="/blog" className="text-primary-400 hover:text-primary-300 text-sm">
            ← Späť na blog
          </Link>
        </div>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-primary-500/20 rounded-full text-xs text-primary-400">
              {article.category}
            </span>
            <span className="text-dark-500 text-sm">{article.readTime}</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          
          <p className="text-dark-400">{article.date}</p>
        </header>
        
        <div className="prose prose-invert max-w-none">
          {article.content.split('\n').map((line, i) => {
            if (line.startsWith('# ')) {
              return <h1 key={i} className="text-3xl font-bold mt-8 mb-4">{line.slice(2)}</h1>
            }
            if (line.startsWith('## ')) {
              return <h2 key={i} className="text-2xl font-bold mt-6 mb-3">{line.slice(3)}</h2>
            }
            if (line.startsWith('### ')) {
              return <h3 key={i} className="text-xl font-semibold mt-4 mb-2">{line.slice(4)}</h3>
            }
            if (line.startsWith('- ')) {
              return <li key={i} className="ml-4 mb-1">{line.slice(2)}</li>
            }
            if (line.startsWith('| ')) {
              return <div key={i} className="font-mono text-sm">{line}</div>
            }
            if (line.trim() === '') {
              return <br key={i} />
            }
            return <p key={i} className="mb-4">{line}</p>
          })}
        </div>
      </article>
    </div>
  )
}
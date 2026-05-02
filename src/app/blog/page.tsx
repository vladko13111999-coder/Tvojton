'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const articles = [
  {
    slug: 'ako-vytvorit-viral-tiktok-za-5-minut',
    title: 'Ako vytvoriť virálny TikTok za 5 minút',
    excerpt: 'Nauč sa tajomstvá vytvárania virálnych videí, ktoré prilákajú tisíce zhliadnutí.',
    category: 'TikTok',
    readTime: '5 min',
    date: '2024-01-15',
  },
  {
    slug: 'najlepsie-nastroje-na-klipy',
    title: 'Top 5 nástrojov na strih videí pre Sociálne siete',
    excerpt: 'Porovnanie najlepších nástrojov na vytváranie krátkych videí pre TikTok a YouTube Shorts.',
    category: 'Nástroje',
    readTime: '8 min',
    date: '2024-01-10',
  },
  {
    slug: 'youtube-shorts-vs-tiktok',
    title: 'YouTube Shorts vs TikTok: Čo je lepšie pre teba?',
    excerpt: 'Porovnanie dvoch najpopulárnejších platforiem pre krátke videá.',
    category: 'Porovnanie',
    readTime: '6 min',
    date: '2024-01-05',
  },
  {
    slug: 'nastroje-na-video-strih',
    title: 'Ako používať AI na automatický video strih',
    excerpt: 'Objav ako nechať AI vybrať najlepšie momenty z tvojho videa.',
    category: 'Návody',
    readTime: '7 min',
    date: '2024-01-01',
  },
  {
    slug: 'tvojklip-tutorial',
    title: 'Kompletný návod: Ako používať TvojKlip',
    excerpt: 'Podrobný návod na používanie aplikácie TvojKlip pre začiatočníkov.',
    category: 'Návody',
    readTime: '10 min',
    date: '2023-12-28',
  },
  {
    slug: 'best-practices-social-media',
    title: 'Best practices pre sociálne siete v roku 2024',
    excerpt: 'Tipy a triky pre maximálny dosah na sociálnych sieťach.',
    category: 'Marketing',
    readTime: '12 min',
    date: '2023-12-25',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Blog o <span className="gradient-text">videu a sociálnych sieťach</span>
          </h1>
          <p className="text-dark-400 max-w-2xl mx-auto">
            Tipy, návody a stratégie pre tvorbu virálneho obsahu na TikTok, YouTube a Instagram.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${article.slug}`}>
                <article className="card h-full hover:border-primary-500 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-primary-500/20 rounded-full text-xs text-primary-400">
                      {article.category}
                    </span>
                    <span className="text-dark-500 text-xs">{article.readTime}</span>
                  </div>
                  
                  <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-dark-400 text-sm line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center text-sm text-dark-500">
                    <span>{article.date}</span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
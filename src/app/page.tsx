'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const features = [
    {
      icon: '🎬',
      title: 'Automatické klipy',
      description: 'Umelá inteligencia vyberie najzaujímavejšie momenty z videa',
    },
    {
      icon: '⚡',
      title: 'Rýchly export',
      description: 'Stiahni klipy v HD alebo 4K kvalite za pár sekúnd',
    },
    {
      icon: '📱',
      title: 'Všetky platformy',
      description: 'TikTok, YouTube Shorts, Instagram Reels - jeden export pre všetky',
    },
    {
      icon: '🎯',
      title: 'Bez vodorovného',
      description: 'Automaticky naformátuje video na vertikálny formát',
    },
  ]

  const steps = [
    { number: '01', title: 'Nahraj video', description: 'Potiahni a pusti alebo zadaj YouTube URL' },
    { number: '02', title: 'AI spracuje', description: 'Automaticky nájde najlepšie momenty' },
    { number: '03', title: 'Stiahni klipy', description: 'Exportuj vo formáte pre TikTok/Shorts' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10" />
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-dark-800 border border-dark-700 text-sm text-primary-400 mb-6">
                🚀 Teraz s AI výberom najlepších momentov
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Premeniť video na{' '}
                <span className="gradient-text">virálne klipy</span>{' '}
                za pár sekúnd
              </h1>
              
              <p className="text-lg sm:text-xl text-dark-300 max-w-2xl mx-auto mb-8">
                Jednoduchý nástroj na vytvorenie krátkych klipov z dlhých videí. 
                Pre TikTok, YouTube Shorts a Instagram Reels.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/app" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                  Začať teraz - Zadarmo
                </Link>
                <Link href="/demo" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                  Pozrieť demo ✨
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Demo Video Area */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden border border-dark-700 bg-dark-800 aspect-video flex items-center justify-center group cursor-pointer"
               onClick={() => setIsVideoPlaying(!isVideoPlaying)}>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent" />
              
              {!isVideoPlaying ? (
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-primary-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-dark-300">Pozrieť ukážku</p>
                </div>
              ) : (
                <div className="relative z-10 w-full h-full flex items-center justify-center bg-dark-900">
                  <p className="text-dark-400">Video sa prehráva...</p>
                </div>
              )}
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-dark-400">TvojKlip</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="px-2 py-1 rounded bg-accent-500/20 text-xs text-accent-400">TikTok</span>
                  <span className="px-2 py-1 rounded bg-primary-500/20 text-xs text-primary-400">Shorts</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Všetko čo potrebuješ na <span className="gradient-text">virálne video</span>
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Žiadne zložité editačné softvéry. Stačí nahrať video a my sa postaráme o zvyšok.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-dark-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ako to <span className="gradient-text">funguje</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 opacity-30" />
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4 text-white font-bold text-xl">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-dark-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card text-center py-12">
            <h2 className="text-3xl font-bold mb-4">
              Pripravený na virálny <span className="gradient-text">úspech</span>?
            </h2>
            <p className="text-dark-400 mb-8 max-w-xl mx-auto">
              Pridaj sa k tisíckam tvorcov, ktorí používajú TvojKlip pre svoje sociálne siete.
            </p>
            <Link href="/app" className="btn-primary text-lg px-8 py-4 inline-block">
              Začať teraz - Zadarmo
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
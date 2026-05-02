'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          <span className="gradient-text">Kontakt</span>uj nás
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Napíš nám</h2>
            
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <p className="text-lg font-medium mb-2">Správa odoslaná!</p>
                <p className="text-dark-400 text-sm">Čoskoro ti odpovieme.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Meno</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="input-field w-full"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="input-field w-full"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Správa</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="input-field w-full h-32 resize-none"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full"
                >
                  {isSubmitting ? 'Odosielam...' : 'Odoslať'}
                </button>
              </form>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-semibold mb-2">Email</h3>
              <a href="mailto:kontakt@tvojton.online" className="text-primary-400">
                kontakt@tvojton.online
              </a>
            </div>
            
            <div className="card">
              <h3 className="font-semibold mb-2">Sociálne siete</h3>
              <div className="flex gap-4">
                <a href="#" className="text-2xl">📸</a>
                <a href="#" className="text-2xl">🎵</a>
                <a href="#" className="text-2xl">📺</a>
              </div>
            </div>
            
            <div className="card">
              <h3 className="font-semibold mb-2">FAQ</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Ako dlho trvá spracovanie?</p>
                  <p className="text-dark-400">cca 1-2 minúty na klip</p>
                </div>
                <div>
                  <p className="font-medium">Aké formáty podporujete?</p>
                  <p className="text-dark-400">MP4, WebM, MOV, AVI</p>
                </div>
                <div>
                  <p className="font-medium">Môžem zmazať watermark?</p>
                  <p className="text-dark-400">Áno, s premium plánom</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
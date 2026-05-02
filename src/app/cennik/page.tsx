export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '0€',
      period: 'navždy',
      features: [
        '3 klipy mesačne',
        'HD kvalita (720p)',
        'Watermark "tvojton"',
        'Manuálny výber klipov',
        'Základné formáty',
      ],
      notIncluded: [
        'YouTube stiahnutie',
        '4K kvalita',
        'Bez watermark',
        'Batch export',
      ],
      cta: 'Začať zadarmo',
      popular: false,
    },
    {
      name: 'Basic',
      price: '9,99€',
      period: 'mesačne',
      features: [
        '20 klipov mesačne',
        'Full HD (1080p)',
        'YouTube URL stiahnutie',
        'Auto výber klipov',
        'Všetky formáty (9:16, 16:9, 1:1)',
        'E-mail podpora',
      ],
      notIncluded: [
        '4K kvalita',
        'Bez watermark',
        'Batch export',
      ],
      cta: 'Upgrade na Basic',
      popular: true,
    },
    {
      name: 'Pro',
      price: '19,99€',
      period: 'mesačne',
      features: [
        'Neobmedzené klipy',
        '4K kvalita (2160p)',
        'Bez watermark',
        'Batch export',
        'Prioritná podpora',
        'API prístup',
        'Custom branding',
      ],
      notIncluded: [],
      cta: 'Upgrade na Pro',
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Jednoduché <span className="gradient-text">ceny</span>
          </h1>
          <p className="text-dark-400 max-w-2xl mx-auto">
            Vyber si plan ktorý ti vyhovuje. Všetky plány obsahujú prístup k základným funkciám.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`
                relative card flex flex-col
                ${plan.popular ? 'border-primary-500 ring-2 ring-primary-500/30' : ''}
              `}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full text-sm font-medium">
                  Najobľúbenejší
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold gradient-text">{plan.price}</div>
                <p className="text-dark-400 text-sm">{plan.period}</p>
              </div>

              <ul className="flex-1 space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <span className="text-primary-400 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
                {plan.notIncluded?.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-dark-500">
                    <span className="text-dark-600 mr-2">×</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`
                  w-full py-3 rounded-xl font-medium transition-all
                  ${plan.popular 
                    ? 'btn-primary' 
                    : 'btn-secondary'
                  }
                `}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-dark-400">
            Potrebuješ väčší plan?{' '}
            <a href="/kontakt" className="text-primary-400 hover:text-primary-300">
              Kontaktuj nás
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
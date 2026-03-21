# Tvojton.online

Landing page a Brand Twin AI asistent pre tvojton.online

## Brand Twin AI

AI asistent pre e-shopy a malé firmy - komunikácia, SEO, reklamácie.

### Podporované jazyky
- Slovenčina (SK)
- Čeština (CZ)
- Chorvatčina (HR)
- Angličtina (EN)

### API Endpoint
Brand Twin komunikuje s Ollama serverom na RunPod:
- URL: `https://i5nrun-ci2ahz-7777.proxy.runpod.net`
- Port: 7777

### Development

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Deployment na Vercel

1. Import this repo to Vercel
2. Set environment variable: `NEXT_PUBLIC_API_URL=https://i5nrun-ci2ahz-7777.proxy.runpod.net`
3. Deploy

## Štruktúra

```
src/
├── app/
│   ├── page.tsx          # Domovská stránka
│   ├── agent/
│   │   └── page.tsx      # Brand Twin AI stránka
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   └── BrandTwinChat.tsx # Chat komponent
└── lib/
    └── api.ts            # API client
```

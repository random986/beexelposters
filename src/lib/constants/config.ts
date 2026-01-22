export const config = {
  app: {
    name: 'Beexel AI Render Portal',
    version: '2.0.0',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  intasend: {
    publicKey: process.env.INTASEND_PUBLIC_KEY || '',
    secretKey: process.env.INTASEND_SECRET_KEY || '',
    testMode: process.env.INTASEND_TEST_MODE === 'true',
  },
  apis: {
    kie: {
      apiKey: process.env.KIE_API_KEY || '',
      baseUrl: 'https://api.kie.ai/api/v1',
      uploadUrl: 'https://kieai.redpandaai.co/api',
    },
    veo: {
      apiKey: process.env.VEO_API_KEY || '',
      baseUrl: 'https://api.veo.ai',
    },
  },
  tokens: {
    pricePerToken: 15, // KES
    minPurchase: 15,
    maxPurchase: 1500,
  },
  video: {
    fast: {
      tokens: 5,
      price: 75,
    },
    quality: {
      tokens: 13,
      price: 195,
    },
  },
} as const


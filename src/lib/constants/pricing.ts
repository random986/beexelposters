export const PRICING = {
  TOKEN_PRICE: 5, // KES per token (Changed from 20)
  MIN_PURCHASE: 20, // Minimum purchase amount
  MAX_PURCHASE: 2000, // Maximum purchase amount
  MONTHLY_SUBSCRIPTION: {
    price: 1500,
    tokens: 300, // Adjusted roughly for value? Or leave as is? User didn't specify. I'll leave price/tokens ratio alone unless requested.
  },
  VIDEO: {
    FAST: {
      tokens: 10,
      price: 50,
    },
    QUALITY: {
      tokens: 36,
      price: 180,
    },
  },
  RENDER: {
    BASIC: {
      '1K': 2,    // KES 10
      '2K': 3,    // KES 15
      '4K': 3,    // Fallback
    },
    PRO: {
      '1K': 4,    // KES 20
      '2K': 4,    // KES 20
      '4K': 8,    // KES 40
    }
  }
} as const

export function calculateTokens(amount: number): number {
  return Math.floor(amount / PRICING.TOKEN_PRICE)
}

export function calculateAmount(tokens: number): number {
  return tokens * PRICING.TOKEN_PRICE
}

export function getRenderCost(resolution: string, model: 'basic' | 'pro' | string): number {
  const isBasic = model === 'basic'
  const res = resolution.toUpperCase()

  if (isBasic) {
    if (res === '1K') return PRICING.RENDER.BASIC['1K']
    return PRICING.RENDER.BASIC['2K'] // Default to 2K/4K price which is 0.65
  }

  // Pro logic
  if (res === '4K') return PRICING.RENDER.PRO['4K']
  return PRICING.RENDER.PRO['2K'] // Default 1 token
}


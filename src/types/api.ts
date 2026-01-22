/**
 * API request/response types
 */

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  msg?: string
  error?: string
}

export interface TokenBalanceResponse {
  balance: number
  totalTokens: number
  usedTokens: number
  remainingFromCodes: number
  userBalance: number
}

export interface RedeemCodeResponse {
  success: boolean
  tokens: number
  balance: number
  remainingTokens: number
  alreadyRedeemed: boolean
  msg?: string
}

export interface PurchaseTokensRequest {
  amount: number
  mpesaNumber: string
  email?: string
  userId?: string
}

export interface PurchaseTokensResponse {
  success: boolean
  invoiceId?: string
  msg?: string
}

export interface PaymentStatusResponse {
  success: boolean
  paymentComplete?: boolean
  paymentFailed?: boolean
  codeGenerated?: boolean
  redemptionCode?: string
  status?: string
  mpesaReceipt?: string
  msg?: string
}

export interface RenderJobRequest {
  prompt?: string
  settings: {
    timeOfDay?: string
    sky?: string
    imperfection?: string
    landscape?: string
  }
  aspect: string
  resolution: string
  maxImages?: number
  seed?: number
  images: File[]
}

export interface RenderJobResponse {
  success: boolean
  jobId?: string
  taskId?: string
  msg?: string
}

export interface JobStatusResponse {
  success: boolean
  status?: string
  resultUrls?: string[]
  error?: string
  msg?: string
}

export interface VideoTaskRequest {
  prompt: string
  imageUrl?: string
  imageUrls?: string[]
  template?: string
  model?: 'veo3_fast' | 'veo3'
  aspectRatio?: string
  seed?: number
  watermark?: string
}

export interface VideoTaskResponse {
  success: boolean
  taskId?: string
  msg?: string
}


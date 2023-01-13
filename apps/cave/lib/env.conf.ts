// Get environment variables
// ##### PROC
export const NODE_ENV = process.env.NODE_ENV
export const VERCEL_ENV = process.env.VERCEL_ENV
export const LIVE_URL = process.env.VERCEL_URL
export const LOCALHOST =
  typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : 'http://localhost:3000'
export const BASEURL =
  LIVE_URL !== undefined && process.env.NODE_ENV !== 'development' ? LIVE_URL : LOCALHOST
export const NEXTAUTH_URL = BASEURL

// ##### API KEYS
export const NEXT_PUBLIC_MORALIS_TOKEN = process.env.NEXT_PUBLIC_MORALIS_TOKEN
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_UNIVERSAL_GA

// ##### ETHERS PROVIDERS
export const NEXT_PUBLIC_CONCAVE_RPC_KEY = process.env.NEXT_PUBLIC_CONCAVE_RPC_KEY
export const NEXT_PUBLIC_INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID
export const NEXT_PUBLIC_ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_ID
export const NEXT_PUBLIC_ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY

// ##### NEXT-AUTH
export const LOCAL_APP_STORAGE = process.env.LOCAL_APP_STORAGE
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET
export const AUTH_PRIVATE_KEY = process.env.AUTH_PRIVATE_KEY
export const AUTH_EXP_DATE = process.env.AUTH_EXP_DATE

// ##### HASURA
export const GRAPHQL_ADMIN_SECRET = process.env.GRAPHQL_ADMIN_SECRET
export const NEXT_PUBLIC_GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT

// #### API ENDPOINTS
export const NEXT_PUBLIC_CHART_ENDPOINT =
  process.env.NODE_ENV !== 'development'
    ? process.env.NEXT_PUBLIC_CHART_API
    : process.env.NEXT_PUBLIC_CHART_API_DEV
export const NEXT_PUBLIC_USERDASHBOARD_ENDPOINT =
  process.env.NODE_ENV !== 'development'
    ? process.env.NEXT_PUBLIC_USERDASHBOARD_API
    : process.env.NEXT_PUBLIC_USERDASHBOARD_API_DEV

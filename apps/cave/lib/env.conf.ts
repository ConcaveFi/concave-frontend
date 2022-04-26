// Get environment variables
// ##### PROC
export const NODE_ENV = process.env.NODE_ENV

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
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL
export const BASEURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : NEXTAUTH_URL
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET
export const AUTH_PRIVATE_KEY = process.env.AUTH_PRIVATE_KEY
export const AUTH_EXP_DATE = process.env.AUTH_EXP_DATE

// ##### HASURA
export const GRAPHQL_ADMIN_SECRET = process.env.GRAPHQL_ADMIN_SECRET
export const NEXT_PUBLIC_GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT

// export const concaveKey = process.env.CONCAVE_KEY
// export const concaveRPChttp = `https://api.concave.lol/node/3508819b-6e74-41c9-a41e-933725697466` //${concaveKey}`;
// export const alchemyMainnet = process.env.ALCHEMYAPI_MAIN
// export const alchemyHTTPmainnet = `https://eth-mainnet.alchemyapi.io/v2/${alchemyMainnet}`
// export const alchemyWSmainnet = `https://eth-mainnet.alchemyapi.io/v2/${alchemyMainnet}`
// export const alchemyRinkeby = process.env.ALCHEMYAPI_RINK
// export const alchemyRPCrinkeby = `https://eth-rinkeby.alchemyapi.io/v2/${alchemyRinkeby}`
// export const infuraKey = process.env.INFURA_KEY
// export const infuraId = infuraKey
// export const infuraHTTPmainnet = `https://mainnet.infura.io/v3/${infuraKey}`
// export const infuraHTTPropsten = `https://ropsten.infura.io/v3/${infuraKey}`
// export const infuraWSropsten = `wss://ropsten.infura.io/v3/${infuraKey}`
// export const etherscanKey = process.env.ETHERSCAN_KEY
// export const StrorageName = process.env.LOCAL_APP_STORAGE
// export const nextautURL = process.env.NEXTAUTH_URL
// export const baseurl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : nextautURL

// export const secretNextAuth = process.env.NEXTAUTH_SECRET
// export const jwtSecretKey = process.env.AUTH_PRIVATE_KEY
// export const jwtSecretType = process.env.AUTH_PRIVATE_TYPE
// export const expInDate = process.env.AUTH_EXP_DATE

// export const hasuraEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
// export const hasuraAdminSecret = process.env.GRAPHQL_ADMIN_SECRET

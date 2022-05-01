declare namespace NodeJS {
  export interface ProcessEnv {
    /** namespace NodeJs for env - see lib/env.conf */
    NEXT_PUBLIC_MORALIS_TOKEN: srting
    NEXT_PUBLIC_UNIVERSAL_GA: string
    NEXT_PUBLIC_CONCAVE_RPC_KEY: string
    NEXT_PUBLIC_INFURA_ID: string
    NEXT_PUBLIC_ALCHEMY_ID: string
    NEXT_PUBLIC_ETHERSCAN_API_KEY: string
    NEXT_PUBLIC_GRAPHQL_ENDPOINT: URL
    GRAPHQL_ADMIN_SECRET: string
    LIVE_URL: URL
    NODE_ENV: 'development' | 'production' | 'test'
    NEXTAUTH_SECRET: string
    AUTH_PRIVATE_KEY: string
    AUTH_EXP_DATE: string
    LOCAL_APP_STORAGE: string
  }
}

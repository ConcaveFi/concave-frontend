declare namespace NodeJS {
  export interface ProcessEnv {
    /** namespace NodeJs for env - see lib/env.conf */
    NEXT_PUBLIC_DISCORD_MORALIS_TOKEN: srting
    NEXT_PUBLIC_DISCORD_UNIVERSAL_GA: string
    NEXT_PUBLIC_DISCORD_CONCAVE_RPC_KEY: string
    NEXT_PUBLIC_DISCORD_INFURA_ID: string
    NEXT_PUBLIC_DISCORD_ALCHEMY_ID: string
    NEXT_PUBLIC_DISCORD_ETHERSCAN_API_KEY: string
    NEXT_PUBLIC_DISCORD_GRAPHQL_ENDPOINT: string
    NEXT_PUBLIC_DISCORD_CHART_ENDPOINT: string
    GRAPHQL_ADMIN_SECRET: string
    LIVE_URL: string
    NODE_ENV: 'development' | 'production' | 'test'
    NEXTAUTH_SECRET: string
    AUTH_PRIVATE_KEY: string
    AUTH_EXP_DATE: string
    LOCAL_APP_STORAGE: string

    NEXT_PUBLIC_DISCORD_WEBHOOK_ID: string
    NEXT_PUBLIC_DISCORD_SMART_BONDING_ID: string
    NEXT_PUBLIC_DISCORD_POOLS_ID: string
    NEXT_PUBLIC_DISCORD_MARKETPLACE_ID: string
    NEXT_PUBLIC_DISCORD_LIQUID_STAKING_ID: string
    NEXT_PUBLIC_DISCORD_LIQUID_STAKING_POSITIONS_ID: string
    NEXT_PUBLIC_DISCORD_GEMSWAP_ID: string
    NEXT_PUBLIC_DISCORD_ADDLIQUIDITY_ID: string

    NEXT_PUBLIC_DISCORD_WEBHOOK_TOKEN: string,
    NEXT_PUBLIC_DISCORD_SMART_BONDING_TOKEN: string
    NEXT_PUBLIC_DISCORD_POOLS_TOKEN: string
    NEXT_PUBLIC_DISCORD_MARKETPLACE_TOKEN: string
    NEXT_PUBLIC_DISCORD_LIQUID_STAKING_TOKEN: string
    NEXT_PUBLIC_DISCORD_LIQUID_STAKING_POSITIONS_TOKEN: string
    NEXT_PUBLIC_DISCORD_GEMSWAP_TOKEN: string
    NEXT_PUBLIC_DISCORD_ADDLIQUIDITY_TOKEN: string

  }
}

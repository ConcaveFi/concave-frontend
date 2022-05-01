import { Session } from 'next-auth'

/**
 * Session object need to be crafted and returned inside api/auth/[...nextauth].ts
 */

export declare module 'next-auth' {
  export interface Ens {
    /** extended types/next-auth.d.ts Ens */
    address?: string | null
    avatar?: string | null
  }

  export interface User {
    /** extended types/next-auth.d.ts to incule User Ens */
    id: UUID
    address: string
    ens?: Ens
  }

  export interface Session {
    /** extended types/next-auth.d.ts to incule user */
    token?: JWT
    user: User
  }
}

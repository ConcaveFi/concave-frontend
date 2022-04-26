import { Session } from 'next-auth'

export declare module 'next-auth' {
  interface Session {
    /** extended types/next-auth.d.ts to incule user */
    // id: string;
    // name?: string | null;
    // email?: string | null;
    // image?: string | null;
    user: {
      address: string
      ens: {
        address: string
        avatar: string
      }
    }
  }
}

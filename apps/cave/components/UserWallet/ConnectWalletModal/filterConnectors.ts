import { Connector } from 'wagmi'

export const filterConnectors = (connectors: Connector[]) =>
  [
    ...new Map(connectors.map((c) => [c.name, c])).values(), // remove repeated
  ].filter((c) => c.ready) // remove not ready

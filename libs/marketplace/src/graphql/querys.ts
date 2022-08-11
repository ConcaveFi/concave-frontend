export const listCavemartListingDocuments = `
query GET_ALL_CAVEMART_USERS_LISTINGS {
  logStakingV1(
    where: {marketplace: {tokenID: {_is_null: false}}}
    distinct_on: [tokenID]
    order_by: [{tokenID: asc}, {txBlockNumber: desc}, {created_at: desc}], 
  ) {
    created_at
    to
    amountLocked
    poolID
    tokenID
    txHash
    lockedUntil
    marketplace(order_by: {created_at: asc}, where: {tokenID: {_is_null: false}}) {
      tokenID
      newOwner
      start
      startPrice
      endPrice
      deadline
      soldFor
      tokenOwner
      txHash
      tokenIsListed
      signatureHash
      tokenOption
      created_at
    }
  }
}
`
export const fetchUserPositionsQuery = `query GET_ALL_USERS_POSITIONS {
  logStakingV1(
    distinct_on: [tokenID]
    order_by: [{tokenID: asc}, {txBlockNumber: desc}, {created_at: desc}], 
  ) {
    created_at
    to
    amountLocked
    poolID
    tokenID
    txHash
    lockedUntil
    marketplace {
      tokenID
      newOwner
      start
      startPrice
      endPrice
      deadline
      soldFor
      tokenOwner
      txHash
      tokenOption
      tokenIsListed
      signatureHash
      created_at
    }
  }
}`

export const fetchAllCavemart = `query ListCavemart {
  logStakingV1(
    where: {marketplace: {} }
  ) {
    created_at
    to
    amountLocked
    poolID
    tokenID
    txHash
    lockedUntil
    marketplace(order_by: {updated_at: desc_nulls_last}) {
      tokenID
      updated_at
      newOwner
      start
      startPrice
      endPrice
      deadline
      soldFor
      tokenOwner
      txHash
      tokenIsListed
      signatureHash
      created_at
      tokenOption
    }
  }
}
`

export const listCavemartListingDocuments = `
query GET_ALL_CAVEMART_USERS_LISTINGS {
  logStakingV1(where: {cavemart: {tokenID: {_is_null: false}}}, order_by: {tokenID: desc, created_at: desc}, distinct_on: tokenID) {
    created_at
    to
    amountLocked
    poolID
    tokenID
    txHash
    lockedUntil
    cavemart(order_by: {created_at: asc}, where: {tokenID: {_is_null: false}}) {
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
      created_at
    }
  }
}
`
export const fetchUserPositionsQuery = `query GET_ALL_USERS_POSITIONS {
  logStakingV1(order_by: {tokenID: desc, created_at: desc}, distinct_on: tokenID) {
    created_at
    to
    amountLocked
    poolID
    tokenID
    txHash
    lockedUntil
    cavemart {
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
      created_at
    }
  }
}`

export const fetchAllCavemart = `query ListCavemart {
  logStakingV1(
    where: {cavemart: {updated_at: {_is_null: false}}}
    order_by: { updated_at: desc}
  ) {
    created_at
    to
    amountLocked
    poolID
    tokenID
    txHash
    lockedUntil
    cavemart {
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
    }
  }
}
`

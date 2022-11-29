import { RQ_HASURA_ENDPOINT, RQ_HASURA_PARAMS } from 'lib/hasura.rq'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(RQ_HASURA_ENDPOINT as string, {
      method: 'POST',
      ...RQ_HASURA_PARAMS,
      body: JSON.stringify({ query, variables }),
    })

    const json = await res.json()

    if (json.errors) {
      const { message } = json.errors[0]

      throw new Error(message)
    }

    return json.data
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  numeric: any
  timestamptz: any
  uuid: any
}

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>
  _gt?: InputMaybe<Scalars['Boolean']>
  _gte?: InputMaybe<Scalars['Boolean']>
  _in?: InputMaybe<Array<Scalars['Boolean']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['Boolean']>
  _lte?: InputMaybe<Scalars['Boolean']>
  _neq?: InputMaybe<Scalars['Boolean']>
  _nin?: InputMaybe<Array<Scalars['Boolean']>>
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>
  _gt?: InputMaybe<Scalars['String']>
  _gte?: InputMaybe<Scalars['String']>
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>
  _in?: InputMaybe<Array<Scalars['String']>>
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>
  _is_null?: InputMaybe<Scalars['Boolean']>
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>
  _lt?: InputMaybe<Scalars['String']>
  _lte?: InputMaybe<Scalars['String']>
  _neq?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>
  _nin?: InputMaybe<Array<Scalars['String']>>
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>
}

export type CnvData = {
  __typename?: 'cnvData'
  baseVolume?: Maybe<Scalars['String']>
  blockchain?: Maybe<Scalars['String']>
  circulatingSupply?: Maybe<Scalars['Float']>
  high24hr?: Maybe<Scalars['String']>
  highestBid?: Maybe<Scalars['String']>
  isFrozen?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Float']>
  low24hr?: Maybe<Scalars['String']>
  lowestAsk?: Maybe<Scalars['String']>
  marketCap?: Maybe<Scalars['Float']>
  name?: Maybe<Scalars['String']>
  percentChange?: Maybe<Scalars['String']>
  quoteVolume?: Maybe<Scalars['String']>
  removedTokens?: Maybe<Scalars['Float']>
  ticker?: Maybe<Scalars['String']>
  totalSupply?: Maybe<Scalars['Float']>
}

export type CnvDataOutput = {
  __typename?: 'cnvDataOutput'
  code?: Maybe<Scalars['Int']>
  data?: Maybe<CnvData>
  msg?: Maybe<Scalars['String']>
}

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC',
}

/** columns and relationships of "logACNVRedemption" */
export type LogAcnvRedemption = {
  __typename?: 'logACNVRedemption'
  address?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['numeric']>
  txBlockNumber?: Maybe<Scalars['numeric']>
  txHash?: Maybe<Scalars['String']>
}

/** Boolean expression to filter rows from the table "logACNVRedemption". All fields are combined with a logical 'AND'. */
export type LogAcnvRedemption_Bool_Exp = {
  _and?: InputMaybe<Array<LogAcnvRedemption_Bool_Exp>>
  _not?: InputMaybe<LogAcnvRedemption_Bool_Exp>
  _or?: InputMaybe<Array<LogAcnvRedemption_Bool_Exp>>
  address?: InputMaybe<String_Comparison_Exp>
  amount?: InputMaybe<Numeric_Comparison_Exp>
  txBlockNumber?: InputMaybe<Numeric_Comparison_Exp>
  txHash?: InputMaybe<String_Comparison_Exp>
}

/** Ordering options when selecting data from "logACNVRedemption". */
export type LogAcnvRedemption_Order_By = {
  address?: InputMaybe<Order_By>
  amount?: InputMaybe<Order_By>
  txBlockNumber?: InputMaybe<Order_By>
  txHash?: InputMaybe<Order_By>
}

/** select columns of table "logACNVRedemption" */
export enum LogAcnvRedemption_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Amount = 'amount',
  /** column name */
  TxBlockNumber = 'txBlockNumber',
  /** column name */
  TxHash = 'txHash',
}

/** Streaming cursor of the table "logACNVRedemption" */
export type LogAcnvRedemption_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: LogAcnvRedemption_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type LogAcnvRedemption_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']>
  amount?: InputMaybe<Scalars['numeric']>
  txBlockNumber?: InputMaybe<Scalars['numeric']>
  txHash?: InputMaybe<Scalars['String']>
}

/** get BondSold events from AccrualBondsV1 */
export type LogAccrualBondsV1_BondSold = {
  __typename?: 'logAccrualBondsV1_BondSold'
  created_at: Scalars['timestamptz']
  id: Scalars['uuid']
  inputAmount?: Maybe<Scalars['String']>
  inputToken?: Maybe<Scalars['String']>
  method?: Maybe<Scalars['String']>
  output?: Maybe<Scalars['String']>
  timestamp?: Maybe<Scalars['numeric']>
  to?: Maybe<Scalars['String']>
  txBlockNumber?: Maybe<Scalars['numeric']>
  txHash?: Maybe<Scalars['String']>
  updated_at: Scalars['timestamptz']
}

/** Boolean expression to filter rows from the table "logAccrualBondsV1_BondSold". All fields are combined with a logical 'AND'. */
export type LogAccrualBondsV1_BondSold_Bool_Exp = {
  _and?: InputMaybe<Array<LogAccrualBondsV1_BondSold_Bool_Exp>>
  _not?: InputMaybe<LogAccrualBondsV1_BondSold_Bool_Exp>
  _or?: InputMaybe<Array<LogAccrualBondsV1_BondSold_Bool_Exp>>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  id?: InputMaybe<Uuid_Comparison_Exp>
  inputAmount?: InputMaybe<String_Comparison_Exp>
  inputToken?: InputMaybe<String_Comparison_Exp>
  method?: InputMaybe<String_Comparison_Exp>
  output?: InputMaybe<String_Comparison_Exp>
  timestamp?: InputMaybe<Numeric_Comparison_Exp>
  to?: InputMaybe<String_Comparison_Exp>
  txBlockNumber?: InputMaybe<Numeric_Comparison_Exp>
  txHash?: InputMaybe<String_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
}

/** Ordering options when selecting data from "logAccrualBondsV1_BondSold". */
export type LogAccrualBondsV1_BondSold_Order_By = {
  created_at?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  inputAmount?: InputMaybe<Order_By>
  inputToken?: InputMaybe<Order_By>
  method?: InputMaybe<Order_By>
  output?: InputMaybe<Order_By>
  timestamp?: InputMaybe<Order_By>
  to?: InputMaybe<Order_By>
  txBlockNumber?: InputMaybe<Order_By>
  txHash?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
}

/** select columns of table "logAccrualBondsV1_BondSold" */
export enum LogAccrualBondsV1_BondSold_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InputAmount = 'inputAmount',
  /** column name */
  InputToken = 'inputToken',
  /** column name */
  Method = 'method',
  /** column name */
  Output = 'output',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  To = 'to',
  /** column name */
  TxBlockNumber = 'txBlockNumber',
  /** column name */
  TxHash = 'txHash',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** Streaming cursor of the table "logAccrualBondsV1_BondSold" */
export type LogAccrualBondsV1_BondSold_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: LogAccrualBondsV1_BondSold_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type LogAccrualBondsV1_BondSold_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>
  id?: InputMaybe<Scalars['uuid']>
  inputAmount?: InputMaybe<Scalars['String']>
  inputToken?: InputMaybe<Scalars['String']>
  method?: InputMaybe<Scalars['String']>
  output?: InputMaybe<Scalars['String']>
  timestamp?: InputMaybe<Scalars['numeric']>
  to?: InputMaybe<Scalars['String']>
  txBlockNumber?: InputMaybe<Scalars['numeric']>
  txHash?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
}

/** get Gemswap tx */
export type LogAmm = {
  __typename?: 'logAmm'
  buyGetCNVAmount?: Maybe<Scalars['numeric']>
  buyInDaiAmount?: Maybe<Scalars['numeric']>
  chainId?: Maybe<Scalars['numeric']>
  cnvPrice?: Maybe<Scalars['numeric']>
  from?: Maybe<Scalars['String']>
  router?: Maybe<Scalars['String']>
  routerName?: Maybe<Scalars['String']>
  sellCNVAmount?: Maybe<Scalars['numeric']>
  sellGetDAIAmount?: Maybe<Scalars['numeric']>
  symbol?: Maybe<Scalars['String']>
  timestamp?: Maybe<Scalars['numeric']>
  txBlockNumber: Scalars['numeric']
  txHash?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

/** aggregated selection of "logAmm" */
export type LogAmm_Aggregate = {
  __typename?: 'logAmm_aggregate'
  aggregate?: Maybe<LogAmm_Aggregate_Fields>
  nodes: Array<LogAmm>
}

/** aggregate fields of "logAmm" */
export type LogAmm_Aggregate_Fields = {
  __typename?: 'logAmm_aggregate_fields'
  avg?: Maybe<LogAmm_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<LogAmm_Max_Fields>
  min?: Maybe<LogAmm_Min_Fields>
  stddev?: Maybe<LogAmm_Stddev_Fields>
  stddev_pop?: Maybe<LogAmm_Stddev_Pop_Fields>
  stddev_samp?: Maybe<LogAmm_Stddev_Samp_Fields>
  sum?: Maybe<LogAmm_Sum_Fields>
  var_pop?: Maybe<LogAmm_Var_Pop_Fields>
  var_samp?: Maybe<LogAmm_Var_Samp_Fields>
  variance?: Maybe<LogAmm_Variance_Fields>
}

/** aggregate fields of "logAmm" */
export type LogAmm_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<LogAmm_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type LogAmm_Avg_Fields = {
  __typename?: 'logAmm_avg_fields'
  buyGetCNVAmount?: Maybe<Scalars['Float']>
  buyInDaiAmount?: Maybe<Scalars['Float']>
  chainId?: Maybe<Scalars['Float']>
  cnvPrice?: Maybe<Scalars['Float']>
  sellCNVAmount?: Maybe<Scalars['Float']>
  sellGetDAIAmount?: Maybe<Scalars['Float']>
  timestamp?: Maybe<Scalars['Float']>
  txBlockNumber?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "logAmm". All fields are combined with a logical 'AND'. */
export type LogAmm_Bool_Exp = {
  _and?: InputMaybe<Array<LogAmm_Bool_Exp>>
  _not?: InputMaybe<LogAmm_Bool_Exp>
  _or?: InputMaybe<Array<LogAmm_Bool_Exp>>
  buyGetCNVAmount?: InputMaybe<Numeric_Comparison_Exp>
  buyInDaiAmount?: InputMaybe<Numeric_Comparison_Exp>
  chainId?: InputMaybe<Numeric_Comparison_Exp>
  cnvPrice?: InputMaybe<Numeric_Comparison_Exp>
  from?: InputMaybe<String_Comparison_Exp>
  router?: InputMaybe<String_Comparison_Exp>
  routerName?: InputMaybe<String_Comparison_Exp>
  sellCNVAmount?: InputMaybe<Numeric_Comparison_Exp>
  sellGetDAIAmount?: InputMaybe<Numeric_Comparison_Exp>
  symbol?: InputMaybe<String_Comparison_Exp>
  timestamp?: InputMaybe<Numeric_Comparison_Exp>
  txBlockNumber?: InputMaybe<Numeric_Comparison_Exp>
  txHash?: InputMaybe<String_Comparison_Exp>
  type?: InputMaybe<String_Comparison_Exp>
}

/** aggregate max on columns */
export type LogAmm_Max_Fields = {
  __typename?: 'logAmm_max_fields'
  buyGetCNVAmount?: Maybe<Scalars['numeric']>
  buyInDaiAmount?: Maybe<Scalars['numeric']>
  chainId?: Maybe<Scalars['numeric']>
  cnvPrice?: Maybe<Scalars['numeric']>
  from?: Maybe<Scalars['String']>
  router?: Maybe<Scalars['String']>
  routerName?: Maybe<Scalars['String']>
  sellCNVAmount?: Maybe<Scalars['numeric']>
  sellGetDAIAmount?: Maybe<Scalars['numeric']>
  symbol?: Maybe<Scalars['String']>
  timestamp?: Maybe<Scalars['numeric']>
  txBlockNumber?: Maybe<Scalars['numeric']>
  txHash?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type LogAmm_Min_Fields = {
  __typename?: 'logAmm_min_fields'
  buyGetCNVAmount?: Maybe<Scalars['numeric']>
  buyInDaiAmount?: Maybe<Scalars['numeric']>
  chainId?: Maybe<Scalars['numeric']>
  cnvPrice?: Maybe<Scalars['numeric']>
  from?: Maybe<Scalars['String']>
  router?: Maybe<Scalars['String']>
  routerName?: Maybe<Scalars['String']>
  sellCNVAmount?: Maybe<Scalars['numeric']>
  sellGetDAIAmount?: Maybe<Scalars['numeric']>
  symbol?: Maybe<Scalars['String']>
  timestamp?: Maybe<Scalars['numeric']>
  txBlockNumber?: Maybe<Scalars['numeric']>
  txHash?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

/** Ordering options when selecting data from "logAmm". */
export type LogAmm_Order_By = {
  buyGetCNVAmount?: InputMaybe<Order_By>
  buyInDaiAmount?: InputMaybe<Order_By>
  chainId?: InputMaybe<Order_By>
  cnvPrice?: InputMaybe<Order_By>
  from?: InputMaybe<Order_By>
  router?: InputMaybe<Order_By>
  routerName?: InputMaybe<Order_By>
  sellCNVAmount?: InputMaybe<Order_By>
  sellGetDAIAmount?: InputMaybe<Order_By>
  symbol?: InputMaybe<Order_By>
  timestamp?: InputMaybe<Order_By>
  txBlockNumber?: InputMaybe<Order_By>
  txHash?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
}

/** select columns of table "logAmm" */
export enum LogAmm_Select_Column {
  /** column name */
  BuyGetCnvAmount = 'buyGetCNVAmount',
  /** column name */
  BuyInDaiAmount = 'buyInDaiAmount',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  CnvPrice = 'cnvPrice',
  /** column name */
  From = 'from',
  /** column name */
  Router = 'router',
  /** column name */
  RouterName = 'routerName',
  /** column name */
  SellCnvAmount = 'sellCNVAmount',
  /** column name */
  SellGetDaiAmount = 'sellGetDAIAmount',
  /** column name */
  Symbol = 'symbol',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TxBlockNumber = 'txBlockNumber',
  /** column name */
  TxHash = 'txHash',
  /** column name */
  Type = 'type',
}

/** aggregate stddev on columns */
export type LogAmm_Stddev_Fields = {
  __typename?: 'logAmm_stddev_fields'
  buyGetCNVAmount?: Maybe<Scalars['Float']>
  buyInDaiAmount?: Maybe<Scalars['Float']>
  chainId?: Maybe<Scalars['Float']>
  cnvPrice?: Maybe<Scalars['Float']>
  sellCNVAmount?: Maybe<Scalars['Float']>
  sellGetDAIAmount?: Maybe<Scalars['Float']>
  timestamp?: Maybe<Scalars['Float']>
  txBlockNumber?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type LogAmm_Stddev_Pop_Fields = {
  __typename?: 'logAmm_stddev_pop_fields'
  buyGetCNVAmount?: Maybe<Scalars['Float']>
  buyInDaiAmount?: Maybe<Scalars['Float']>
  chainId?: Maybe<Scalars['Float']>
  cnvPrice?: Maybe<Scalars['Float']>
  sellCNVAmount?: Maybe<Scalars['Float']>
  sellGetDAIAmount?: Maybe<Scalars['Float']>
  timestamp?: Maybe<Scalars['Float']>
  txBlockNumber?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type LogAmm_Stddev_Samp_Fields = {
  __typename?: 'logAmm_stddev_samp_fields'
  buyGetCNVAmount?: Maybe<Scalars['Float']>
  buyInDaiAmount?: Maybe<Scalars['Float']>
  chainId?: Maybe<Scalars['Float']>
  cnvPrice?: Maybe<Scalars['Float']>
  sellCNVAmount?: Maybe<Scalars['Float']>
  sellGetDAIAmount?: Maybe<Scalars['Float']>
  timestamp?: Maybe<Scalars['Float']>
  txBlockNumber?: Maybe<Scalars['Float']>
}

/** Streaming cursor of the table "logAmm" */
export type LogAmm_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: LogAmm_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type LogAmm_Stream_Cursor_Value_Input = {
  buyGetCNVAmount?: InputMaybe<Scalars['numeric']>
  buyInDaiAmount?: InputMaybe<Scalars['numeric']>
  chainId?: InputMaybe<Scalars['numeric']>
  cnvPrice?: InputMaybe<Scalars['numeric']>
  from?: InputMaybe<Scalars['String']>
  router?: InputMaybe<Scalars['String']>
  routerName?: InputMaybe<Scalars['String']>
  sellCNVAmount?: InputMaybe<Scalars['numeric']>
  sellGetDAIAmount?: InputMaybe<Scalars['numeric']>
  symbol?: InputMaybe<Scalars['String']>
  timestamp?: InputMaybe<Scalars['numeric']>
  txBlockNumber?: InputMaybe<Scalars['numeric']>
  txHash?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
}

/** aggregate sum on columns */
export type LogAmm_Sum_Fields = {
  __typename?: 'logAmm_sum_fields'
  buyGetCNVAmount?: Maybe<Scalars['numeric']>
  buyInDaiAmount?: Maybe<Scalars['numeric']>
  chainId?: Maybe<Scalars['numeric']>
  cnvPrice?: Maybe<Scalars['numeric']>
  sellCNVAmount?: Maybe<Scalars['numeric']>
  sellGetDAIAmount?: Maybe<Scalars['numeric']>
  timestamp?: Maybe<Scalars['numeric']>
  txBlockNumber?: Maybe<Scalars['numeric']>
}

/** aggregate var_pop on columns */
export type LogAmm_Var_Pop_Fields = {
  __typename?: 'logAmm_var_pop_fields'
  buyGetCNVAmount?: Maybe<Scalars['Float']>
  buyInDaiAmount?: Maybe<Scalars['Float']>
  chainId?: Maybe<Scalars['Float']>
  cnvPrice?: Maybe<Scalars['Float']>
  sellCNVAmount?: Maybe<Scalars['Float']>
  sellGetDAIAmount?: Maybe<Scalars['Float']>
  timestamp?: Maybe<Scalars['Float']>
  txBlockNumber?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type LogAmm_Var_Samp_Fields = {
  __typename?: 'logAmm_var_samp_fields'
  buyGetCNVAmount?: Maybe<Scalars['Float']>
  buyInDaiAmount?: Maybe<Scalars['Float']>
  chainId?: Maybe<Scalars['Float']>
  cnvPrice?: Maybe<Scalars['Float']>
  sellCNVAmount?: Maybe<Scalars['Float']>
  sellGetDAIAmount?: Maybe<Scalars['Float']>
  timestamp?: Maybe<Scalars['Float']>
  txBlockNumber?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type LogAmm_Variance_Fields = {
  __typename?: 'logAmm_variance_fields'
  buyGetCNVAmount?: Maybe<Scalars['Float']>
  buyInDaiAmount?: Maybe<Scalars['Float']>
  chainId?: Maybe<Scalars['Float']>
  cnvPrice?: Maybe<Scalars['Float']>
  sellCNVAmount?: Maybe<Scalars['Float']>
  sellGetDAIAmount?: Maybe<Scalars['Float']>
  timestamp?: Maybe<Scalars['Float']>
  txBlockNumber?: Maybe<Scalars['Float']>
}

/** get daily cnv metrics */
export type LogCnvData = {
  __typename?: 'logCnvData'
  chainID: Scalars['String']
  circulatingSupply?: Maybe<Scalars['numeric']>
  contract: Scalars['String']
  created_at: Scalars['timestamptz']
  id: Scalars['uuid']
  last?: Maybe<Scalars['numeric']>
  marketCap?: Maybe<Scalars['numeric']>
  removedTokens?: Maybe<Scalars['numeric']>
  ticker: Scalars['String']
  totalSupply?: Maybe<Scalars['numeric']>
  updated_at: Scalars['timestamptz']
}

/** Boolean expression to filter rows from the table "logCnvData". All fields are combined with a logical 'AND'. */
export type LogCnvData_Bool_Exp = {
  _and?: InputMaybe<Array<LogCnvData_Bool_Exp>>
  _not?: InputMaybe<LogCnvData_Bool_Exp>
  _or?: InputMaybe<Array<LogCnvData_Bool_Exp>>
  chainID?: InputMaybe<String_Comparison_Exp>
  circulatingSupply?: InputMaybe<Numeric_Comparison_Exp>
  contract?: InputMaybe<String_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  id?: InputMaybe<Uuid_Comparison_Exp>
  last?: InputMaybe<Numeric_Comparison_Exp>
  marketCap?: InputMaybe<Numeric_Comparison_Exp>
  removedTokens?: InputMaybe<Numeric_Comparison_Exp>
  ticker?: InputMaybe<String_Comparison_Exp>
  totalSupply?: InputMaybe<Numeric_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
}

/** Ordering options when selecting data from "logCnvData". */
export type LogCnvData_Order_By = {
  chainID?: InputMaybe<Order_By>
  circulatingSupply?: InputMaybe<Order_By>
  contract?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  last?: InputMaybe<Order_By>
  marketCap?: InputMaybe<Order_By>
  removedTokens?: InputMaybe<Order_By>
  ticker?: InputMaybe<Order_By>
  totalSupply?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
}

/** select columns of table "logCnvData" */
export enum LogCnvData_Select_Column {
  /** column name */
  ChainId = 'chainID',
  /** column name */
  CirculatingSupply = 'circulatingSupply',
  /** column name */
  Contract = 'contract',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Last = 'last',
  /** column name */
  MarketCap = 'marketCap',
  /** column name */
  RemovedTokens = 'removedTokens',
  /** column name */
  Ticker = 'ticker',
  /** column name */
  TotalSupply = 'totalSupply',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** Streaming cursor of the table "logCnvData" */
export type LogCnvData_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: LogCnvData_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type LogCnvData_Stream_Cursor_Value_Input = {
  chainID?: InputMaybe<Scalars['String']>
  circulatingSupply?: InputMaybe<Scalars['numeric']>
  contract?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  id?: InputMaybe<Scalars['uuid']>
  last?: InputMaybe<Scalars['numeric']>
  marketCap?: InputMaybe<Scalars['numeric']>
  removedTokens?: InputMaybe<Scalars['numeric']>
  ticker?: InputMaybe<Scalars['String']>
  totalSupply?: InputMaybe<Scalars['numeric']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
}

/** get Transfer events for Staking V1 */
export type LogStakingV1 = {
  __typename?: 'logStakingV1'
  amountLocked?: Maybe<Scalars['String']>
  created_at: Scalars['timestamptz']
  from?: Maybe<Scalars['String']>
  id: Scalars['uuid']
  lockedUntil?: Maybe<Scalars['numeric']>
  /** fetch data from the table: "marketplace" */
  marketplace: Array<Marketplace>
  poolID?: Maybe<Scalars['numeric']>
  sold?: Maybe<Scalars['Boolean']>
  to?: Maybe<Scalars['String']>
  tokenID?: Maybe<Scalars['numeric']>
  txBlockNumber?: Maybe<Scalars['numeric']>
  txHash?: Maybe<Scalars['String']>
  updated_at: Scalars['timestamptz']
}

/** get Transfer events for Staking V1 */
export type LogStakingV1MarketplaceArgs = {
  distinct_on?: InputMaybe<Array<Marketplace_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Marketplace_Order_By>>
  where?: InputMaybe<Marketplace_Bool_Exp>
}

/** get Lock events from Staking V1 */
export type LogStakingV1_Lock = {
  __typename?: 'logStakingV1_Lock'
  amount?: Maybe<Scalars['String']>
  created_at: Scalars['timestamptz']
  deposit?: Maybe<Scalars['String']>
  id: Scalars['uuid']
  maturity?: Maybe<Scalars['numeric']>
  poolBalance?: Maybe<Scalars['String']>
  poolExcessRatio?: Maybe<Scalars['numeric']>
  poolG?: Maybe<Scalars['numeric']>
  poolID?: Maybe<Scalars['numeric']>
  poolRewardsPerShare?: Maybe<Scalars['String']>
  poolSupply?: Maybe<Scalars['String']>
  poolTerm?: Maybe<Scalars['numeric']>
  positionID?: Maybe<Scalars['numeric']>
  rewardDebt?: Maybe<Scalars['String']>
  shares?: Maybe<Scalars['String']>
  timestamp?: Maybe<Scalars['numeric']>
  to?: Maybe<Scalars['String']>
  txBlockNumber?: Maybe<Scalars['numeric']>
  txHash?: Maybe<Scalars['String']>
  updated_at: Scalars['timestamptz']
}

/** Boolean expression to filter rows from the table "logStakingV1_Lock". All fields are combined with a logical 'AND'. */
export type LogStakingV1_Lock_Bool_Exp = {
  _and?: InputMaybe<Array<LogStakingV1_Lock_Bool_Exp>>
  _not?: InputMaybe<LogStakingV1_Lock_Bool_Exp>
  _or?: InputMaybe<Array<LogStakingV1_Lock_Bool_Exp>>
  amount?: InputMaybe<String_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  deposit?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Uuid_Comparison_Exp>
  maturity?: InputMaybe<Numeric_Comparison_Exp>
  poolBalance?: InputMaybe<String_Comparison_Exp>
  poolExcessRatio?: InputMaybe<Numeric_Comparison_Exp>
  poolG?: InputMaybe<Numeric_Comparison_Exp>
  poolID?: InputMaybe<Numeric_Comparison_Exp>
  poolRewardsPerShare?: InputMaybe<String_Comparison_Exp>
  poolSupply?: InputMaybe<String_Comparison_Exp>
  poolTerm?: InputMaybe<Numeric_Comparison_Exp>
  positionID?: InputMaybe<Numeric_Comparison_Exp>
  rewardDebt?: InputMaybe<String_Comparison_Exp>
  shares?: InputMaybe<String_Comparison_Exp>
  timestamp?: InputMaybe<Numeric_Comparison_Exp>
  to?: InputMaybe<String_Comparison_Exp>
  txBlockNumber?: InputMaybe<Numeric_Comparison_Exp>
  txHash?: InputMaybe<String_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
}

/** Ordering options when selecting data from "logStakingV1_Lock". */
export type LogStakingV1_Lock_Order_By = {
  amount?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  deposit?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  maturity?: InputMaybe<Order_By>
  poolBalance?: InputMaybe<Order_By>
  poolExcessRatio?: InputMaybe<Order_By>
  poolG?: InputMaybe<Order_By>
  poolID?: InputMaybe<Order_By>
  poolRewardsPerShare?: InputMaybe<Order_By>
  poolSupply?: InputMaybe<Order_By>
  poolTerm?: InputMaybe<Order_By>
  positionID?: InputMaybe<Order_By>
  rewardDebt?: InputMaybe<Order_By>
  shares?: InputMaybe<Order_By>
  timestamp?: InputMaybe<Order_By>
  to?: InputMaybe<Order_By>
  txBlockNumber?: InputMaybe<Order_By>
  txHash?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
}

/** select columns of table "logStakingV1_Lock" */
export enum LogStakingV1_Lock_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Deposit = 'deposit',
  /** column name */
  Id = 'id',
  /** column name */
  Maturity = 'maturity',
  /** column name */
  PoolBalance = 'poolBalance',
  /** column name */
  PoolExcessRatio = 'poolExcessRatio',
  /** column name */
  PoolG = 'poolG',
  /** column name */
  PoolId = 'poolID',
  /** column name */
  PoolRewardsPerShare = 'poolRewardsPerShare',
  /** column name */
  PoolSupply = 'poolSupply',
  /** column name */
  PoolTerm = 'poolTerm',
  /** column name */
  PositionId = 'positionID',
  /** column name */
  RewardDebt = 'rewardDebt',
  /** column name */
  Shares = 'shares',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  To = 'to',
  /** column name */
  TxBlockNumber = 'txBlockNumber',
  /** column name */
  TxHash = 'txHash',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** Streaming cursor of the table "logStakingV1_Lock" */
export type LogStakingV1_Lock_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: LogStakingV1_Lock_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type LogStakingV1_Lock_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  deposit?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['uuid']>
  maturity?: InputMaybe<Scalars['numeric']>
  poolBalance?: InputMaybe<Scalars['String']>
  poolExcessRatio?: InputMaybe<Scalars['numeric']>
  poolG?: InputMaybe<Scalars['numeric']>
  poolID?: InputMaybe<Scalars['numeric']>
  poolRewardsPerShare?: InputMaybe<Scalars['String']>
  poolSupply?: InputMaybe<Scalars['String']>
  poolTerm?: InputMaybe<Scalars['numeric']>
  positionID?: InputMaybe<Scalars['numeric']>
  rewardDebt?: InputMaybe<Scalars['String']>
  shares?: InputMaybe<Scalars['String']>
  timestamp?: InputMaybe<Scalars['numeric']>
  to?: InputMaybe<Scalars['String']>
  txBlockNumber?: InputMaybe<Scalars['numeric']>
  txHash?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
}

/** get PoolRewarded events from staking V1  */
export type LogStakingV1_PoolRewarded = {
  __typename?: 'logStakingV1_PoolRewarded'
  balance?: Maybe<Scalars['String']>
  baseObligation?: Maybe<Scalars['String']>
  base_vAPR?: Maybe<Scalars['numeric']>
  created_at: Scalars['timestamptz']
  excessObligation?: Maybe<Scalars['String']>
  id: Scalars['uuid']
  poolID?: Maybe<Scalars['numeric']>
  to?: Maybe<Scalars['String']>
  txBlockNumber?: Maybe<Scalars['numeric']>
  txHash?: Maybe<Scalars['String']>
  updated_at: Scalars['timestamptz']
}

/** Boolean expression to filter rows from the table "logStakingV1_PoolRewarded". All fields are combined with a logical 'AND'. */
export type LogStakingV1_PoolRewarded_Bool_Exp = {
  _and?: InputMaybe<Array<LogStakingV1_PoolRewarded_Bool_Exp>>
  _not?: InputMaybe<LogStakingV1_PoolRewarded_Bool_Exp>
  _or?: InputMaybe<Array<LogStakingV1_PoolRewarded_Bool_Exp>>
  balance?: InputMaybe<String_Comparison_Exp>
  baseObligation?: InputMaybe<String_Comparison_Exp>
  base_vAPR?: InputMaybe<Numeric_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  excessObligation?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Uuid_Comparison_Exp>
  poolID?: InputMaybe<Numeric_Comparison_Exp>
  to?: InputMaybe<String_Comparison_Exp>
  txBlockNumber?: InputMaybe<Numeric_Comparison_Exp>
  txHash?: InputMaybe<String_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
}

/** Ordering options when selecting data from "logStakingV1_PoolRewarded". */
export type LogStakingV1_PoolRewarded_Order_By = {
  balance?: InputMaybe<Order_By>
  baseObligation?: InputMaybe<Order_By>
  base_vAPR?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  excessObligation?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  poolID?: InputMaybe<Order_By>
  to?: InputMaybe<Order_By>
  txBlockNumber?: InputMaybe<Order_By>
  txHash?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
}

/** select columns of table "logStakingV1_PoolRewarded" */
export enum LogStakingV1_PoolRewarded_Select_Column {
  /** column name */
  Balance = 'balance',
  /** column name */
  BaseObligation = 'baseObligation',
  /** column name */
  BaseVApr = 'base_vAPR',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExcessObligation = 'excessObligation',
  /** column name */
  Id = 'id',
  /** column name */
  PoolId = 'poolID',
  /** column name */
  To = 'to',
  /** column name */
  TxBlockNumber = 'txBlockNumber',
  /** column name */
  TxHash = 'txHash',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** Streaming cursor of the table "logStakingV1_PoolRewarded" */
export type LogStakingV1_PoolRewarded_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: LogStakingV1_PoolRewarded_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type LogStakingV1_PoolRewarded_Stream_Cursor_Value_Input = {
  balance?: InputMaybe<Scalars['String']>
  baseObligation?: InputMaybe<Scalars['String']>
  base_vAPR?: InputMaybe<Scalars['numeric']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  excessObligation?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['uuid']>
  poolID?: InputMaybe<Scalars['numeric']>
  to?: InputMaybe<Scalars['String']>
  txBlockNumber?: InputMaybe<Scalars['numeric']>
  txHash?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
}

/** Boolean expression to filter rows from the table "logStakingV1". All fields are combined with a logical 'AND'. */
export type LogStakingV1_Bool_Exp = {
  _and?: InputMaybe<Array<LogStakingV1_Bool_Exp>>
  _not?: InputMaybe<LogStakingV1_Bool_Exp>
  _or?: InputMaybe<Array<LogStakingV1_Bool_Exp>>
  amountLocked?: InputMaybe<String_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  from?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Uuid_Comparison_Exp>
  lockedUntil?: InputMaybe<Numeric_Comparison_Exp>
  marketplace?: InputMaybe<Marketplace_Bool_Exp>
  poolID?: InputMaybe<Numeric_Comparison_Exp>
  sold?: InputMaybe<Boolean_Comparison_Exp>
  to?: InputMaybe<String_Comparison_Exp>
  tokenID?: InputMaybe<Numeric_Comparison_Exp>
  txBlockNumber?: InputMaybe<Numeric_Comparison_Exp>
  txHash?: InputMaybe<String_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
}

/** Ordering options when selecting data from "logStakingV1". */
export type LogStakingV1_Order_By = {
  amountLocked?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  from?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  lockedUntil?: InputMaybe<Order_By>
  marketplace_aggregate?: InputMaybe<Marketplace_Aggregate_Order_By>
  poolID?: InputMaybe<Order_By>
  sold?: InputMaybe<Order_By>
  to?: InputMaybe<Order_By>
  tokenID?: InputMaybe<Order_By>
  txBlockNumber?: InputMaybe<Order_By>
  txHash?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
}

/** select columns of table "logStakingV1" */
export enum LogStakingV1_Select_Column {
  /** column name */
  AmountLocked = 'amountLocked',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  From = 'from',
  /** column name */
  Id = 'id',
  /** column name */
  LockedUntil = 'lockedUntil',
  /** column name */
  PoolId = 'poolID',
  /** column name */
  Sold = 'sold',
  /** column name */
  To = 'to',
  /** column name */
  TokenId = 'tokenID',
  /** column name */
  TxBlockNumber = 'txBlockNumber',
  /** column name */
  TxHash = 'txHash',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** Streaming cursor of the table "logStakingV1" */
export type LogStakingV1_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: LogStakingV1_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type LogStakingV1_Stream_Cursor_Value_Input = {
  amountLocked?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  from?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['uuid']>
  lockedUntil?: InputMaybe<Scalars['numeric']>
  poolID?: InputMaybe<Scalars['numeric']>
  sold?: InputMaybe<Scalars['Boolean']>
  to?: InputMaybe<Scalars['String']>
  tokenID?: InputMaybe<Scalars['numeric']>
  txBlockNumber?: InputMaybe<Scalars['numeric']>
  txHash?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
}

/** take signature history of a lsd NFT token ID */
export type Marketplace = {
  __typename?: 'marketplace'
  created_at: Scalars['timestamptz']
  deadline?: Maybe<Scalars['numeric']>
  endPrice?: Maybe<Scalars['String']>
  newOwner?: Maybe<Scalars['String']>
  signatureHash?: Maybe<Scalars['String']>
  soldFor?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['String']>
  startPrice?: Maybe<Scalars['String']>
  tokenID: Scalars['numeric']
  tokenIsListed: Scalars['Boolean']
  tokenOption?: Maybe<Scalars['String']>
  tokenOwner: Scalars['String']
  txBlockNumber?: Maybe<Scalars['numeric']>
  txHash?: Maybe<Scalars['String']>
  updated_at: Scalars['timestamptz']
}

/** order by aggregate values of table "marketplace" */
export type Marketplace_Aggregate_Order_By = {
  avg?: InputMaybe<Marketplace_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Marketplace_Max_Order_By>
  min?: InputMaybe<Marketplace_Min_Order_By>
  stddev?: InputMaybe<Marketplace_Stddev_Order_By>
  stddev_pop?: InputMaybe<Marketplace_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Marketplace_Stddev_Samp_Order_By>
  sum?: InputMaybe<Marketplace_Sum_Order_By>
  var_pop?: InputMaybe<Marketplace_Var_Pop_Order_By>
  var_samp?: InputMaybe<Marketplace_Var_Samp_Order_By>
  variance?: InputMaybe<Marketplace_Variance_Order_By>
}

/** order by avg() on columns of table "marketplace" */
export type Marketplace_Avg_Order_By = {
  deadline?: InputMaybe<Order_By>
  tokenID?: InputMaybe<Order_By>
  txBlockNumber?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "marketplace". All fields are combined with a logical 'AND'. */
export type Marketplace_Bool_Exp = {
  _and?: InputMaybe<Array<Marketplace_Bool_Exp>>
  _not?: InputMaybe<Marketplace_Bool_Exp>
  _or?: InputMaybe<Array<Marketplace_Bool_Exp>>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  deadline?: InputMaybe<Numeric_Comparison_Exp>
  endPrice?: InputMaybe<String_Comparison_Exp>
  newOwner?: InputMaybe<String_Comparison_Exp>
  signatureHash?: InputMaybe<String_Comparison_Exp>
  soldFor?: InputMaybe<String_Comparison_Exp>
  start?: InputMaybe<String_Comparison_Exp>
  startPrice?: InputMaybe<String_Comparison_Exp>
  tokenID?: InputMaybe<Numeric_Comparison_Exp>
  tokenIsListed?: InputMaybe<Boolean_Comparison_Exp>
  tokenOption?: InputMaybe<String_Comparison_Exp>
  tokenOwner?: InputMaybe<String_Comparison_Exp>
  txBlockNumber?: InputMaybe<Numeric_Comparison_Exp>
  txHash?: InputMaybe<String_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "marketplace" */
export enum Marketplace_Constraint {
  /** unique or primary key constraint on columns "id" */
  CavemartPkey = 'cavemart_pkey',
}

/** input type for inserting data into table "marketplace" */
export type Marketplace_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>
  deadline?: InputMaybe<Scalars['numeric']>
  endPrice?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['uuid']>
  newOwner?: InputMaybe<Scalars['String']>
  signatureHash?: InputMaybe<Scalars['String']>
  soldFor?: InputMaybe<Scalars['String']>
  start?: InputMaybe<Scalars['String']>
  startPrice?: InputMaybe<Scalars['String']>
  tokenID?: InputMaybe<Scalars['numeric']>
  tokenIsListed?: InputMaybe<Scalars['Boolean']>
  tokenOption?: InputMaybe<Scalars['String']>
  tokenOwner?: InputMaybe<Scalars['String']>
  txBlockNumber?: InputMaybe<Scalars['numeric']>
  txHash?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
}

/** order by max() on columns of table "marketplace" */
export type Marketplace_Max_Order_By = {
  created_at?: InputMaybe<Order_By>
  deadline?: InputMaybe<Order_By>
  endPrice?: InputMaybe<Order_By>
  newOwner?: InputMaybe<Order_By>
  signatureHash?: InputMaybe<Order_By>
  soldFor?: InputMaybe<Order_By>
  start?: InputMaybe<Order_By>
  startPrice?: InputMaybe<Order_By>
  tokenID?: InputMaybe<Order_By>
  tokenOption?: InputMaybe<Order_By>
  tokenOwner?: InputMaybe<Order_By>
  txBlockNumber?: InputMaybe<Order_By>
  txHash?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
}

/** order by min() on columns of table "marketplace" */
export type Marketplace_Min_Order_By = {
  created_at?: InputMaybe<Order_By>
  deadline?: InputMaybe<Order_By>
  endPrice?: InputMaybe<Order_By>
  newOwner?: InputMaybe<Order_By>
  signatureHash?: InputMaybe<Order_By>
  soldFor?: InputMaybe<Order_By>
  start?: InputMaybe<Order_By>
  startPrice?: InputMaybe<Order_By>
  tokenID?: InputMaybe<Order_By>
  tokenOption?: InputMaybe<Order_By>
  tokenOwner?: InputMaybe<Order_By>
  txBlockNumber?: InputMaybe<Order_By>
  txHash?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
}

/** response of any mutation on the table "marketplace" */
export type Marketplace_Mutation_Response = {
  __typename?: 'marketplace_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Marketplace>
}

/** on_conflict condition type for table "marketplace" */
export type Marketplace_On_Conflict = {
  constraint: Marketplace_Constraint
  update_columns?: Array<Marketplace_Update_Column>
  where?: InputMaybe<Marketplace_Bool_Exp>
}

/** Ordering options when selecting data from "marketplace". */
export type Marketplace_Order_By = {
  created_at?: InputMaybe<Order_By>
  deadline?: InputMaybe<Order_By>
  endPrice?: InputMaybe<Order_By>
  newOwner?: InputMaybe<Order_By>
  signatureHash?: InputMaybe<Order_By>
  soldFor?: InputMaybe<Order_By>
  start?: InputMaybe<Order_By>
  startPrice?: InputMaybe<Order_By>
  tokenID?: InputMaybe<Order_By>
  tokenIsListed?: InputMaybe<Order_By>
  tokenOption?: InputMaybe<Order_By>
  tokenOwner?: InputMaybe<Order_By>
  txBlockNumber?: InputMaybe<Order_By>
  txHash?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
}

/** select columns of table "marketplace" */
export enum Marketplace_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Deadline = 'deadline',
  /** column name */
  EndPrice = 'endPrice',
  /** column name */
  NewOwner = 'newOwner',
  /** column name */
  SignatureHash = 'signatureHash',
  /** column name */
  SoldFor = 'soldFor',
  /** column name */
  Start = 'start',
  /** column name */
  StartPrice = 'startPrice',
  /** column name */
  TokenId = 'tokenID',
  /** column name */
  TokenIsListed = 'tokenIsListed',
  /** column name */
  TokenOption = 'tokenOption',
  /** column name */
  TokenOwner = 'tokenOwner',
  /** column name */
  TxBlockNumber = 'txBlockNumber',
  /** column name */
  TxHash = 'txHash',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** order by stddev() on columns of table "marketplace" */
export type Marketplace_Stddev_Order_By = {
  deadline?: InputMaybe<Order_By>
  tokenID?: InputMaybe<Order_By>
  txBlockNumber?: InputMaybe<Order_By>
}

/** order by stddev_pop() on columns of table "marketplace" */
export type Marketplace_Stddev_Pop_Order_By = {
  deadline?: InputMaybe<Order_By>
  tokenID?: InputMaybe<Order_By>
  txBlockNumber?: InputMaybe<Order_By>
}

/** order by stddev_samp() on columns of table "marketplace" */
export type Marketplace_Stddev_Samp_Order_By = {
  deadline?: InputMaybe<Order_By>
  tokenID?: InputMaybe<Order_By>
  txBlockNumber?: InputMaybe<Order_By>
}

/** Streaming cursor of the table "marketplace" */
export type Marketplace_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Marketplace_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Marketplace_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>
  deadline?: InputMaybe<Scalars['numeric']>
  endPrice?: InputMaybe<Scalars['String']>
  newOwner?: InputMaybe<Scalars['String']>
  signatureHash?: InputMaybe<Scalars['String']>
  soldFor?: InputMaybe<Scalars['String']>
  start?: InputMaybe<Scalars['String']>
  startPrice?: InputMaybe<Scalars['String']>
  tokenID?: InputMaybe<Scalars['numeric']>
  tokenIsListed?: InputMaybe<Scalars['Boolean']>
  tokenOption?: InputMaybe<Scalars['String']>
  tokenOwner?: InputMaybe<Scalars['String']>
  txBlockNumber?: InputMaybe<Scalars['numeric']>
  txHash?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
}

/** order by sum() on columns of table "marketplace" */
export type Marketplace_Sum_Order_By = {
  deadline?: InputMaybe<Order_By>
  tokenID?: InputMaybe<Order_By>
  txBlockNumber?: InputMaybe<Order_By>
}

/** placeholder for update columns of table "marketplace" (current role has no relevant permissions) */
export enum Marketplace_Update_Column {
  /** placeholder (do not use) */
  Placeholder = '_PLACEHOLDER',
}

/** order by var_pop() on columns of table "marketplace" */
export type Marketplace_Var_Pop_Order_By = {
  deadline?: InputMaybe<Order_By>
  tokenID?: InputMaybe<Order_By>
  txBlockNumber?: InputMaybe<Order_By>
}

/** order by var_samp() on columns of table "marketplace" */
export type Marketplace_Var_Samp_Order_By = {
  deadline?: InputMaybe<Order_By>
  tokenID?: InputMaybe<Order_By>
  txBlockNumber?: InputMaybe<Order_By>
}

/** order by variance() on columns of table "marketplace" */
export type Marketplace_Variance_Order_By = {
  deadline?: InputMaybe<Order_By>
  tokenID?: InputMaybe<Order_By>
  txBlockNumber?: InputMaybe<Order_By>
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root'
  /** insert data into the table: "marketplace" */
  insert_marketplace?: Maybe<Marketplace_Mutation_Response>
  /** insert a single row into the table: "marketplace" */
  insert_marketplace_one?: Maybe<Marketplace>
}

/** mutation root */
export type Mutation_RootInsert_MarketplaceArgs = {
  objects: Array<Marketplace_Insert_Input>
  on_conflict?: InputMaybe<Marketplace_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Marketplace_OneArgs = {
  object: Marketplace_Insert_Input
  on_conflict?: InputMaybe<Marketplace_On_Conflict>
}

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>
  _gt?: InputMaybe<Scalars['numeric']>
  _gte?: InputMaybe<Scalars['numeric']>
  _in?: InputMaybe<Array<Scalars['numeric']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['numeric']>
  _lte?: InputMaybe<Scalars['numeric']>
  _neq?: InputMaybe<Scalars['numeric']>
  _nin?: InputMaybe<Array<Scalars['numeric']>>
}

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

export type Query_Root = {
  __typename?: 'query_root'
  cnvData?: Maybe<CnvDataOutput>
  /** fetch data from the table: "logACNVRedemption" */
  logACNVRedemption: Array<LogAcnvRedemption>
  /** fetch data from the table: "logAccrualBondsV1_BondSold" */
  logAccrualBondsV1_BondSold: Array<LogAccrualBondsV1_BondSold>
  /** fetch data from the table: "logAccrualBondsV1_BondSold" using primary key columns */
  logAccrualBondsV1_BondSold_by_pk?: Maybe<LogAccrualBondsV1_BondSold>
  /** fetch data from the table: "logAmm" */
  logAmm: Array<LogAmm>
  /** fetch aggregated fields from the table: "logAmm" */
  logAmm_aggregate: LogAmm_Aggregate
  /** fetch data from the table: "logCnvData" */
  logCnvData: Array<LogCnvData>
  /** fetch data from the table: "logCnvData" using primary key columns */
  logCnvData_by_pk?: Maybe<LogCnvData>
  /** fetch data from the table: "logStakingV1" */
  logStakingV1: Array<LogStakingV1>
  /** fetch data from the table: "logStakingV1_Lock" */
  logStakingV1_Lock: Array<LogStakingV1_Lock>
  /** fetch data from the table: "logStakingV1_Lock" using primary key columns */
  logStakingV1_Lock_by_pk?: Maybe<LogStakingV1_Lock>
  /** fetch data from the table: "logStakingV1_PoolRewarded" */
  logStakingV1_PoolRewarded: Array<LogStakingV1_PoolRewarded>
  /** fetch data from the table: "logStakingV1_PoolRewarded" using primary key columns */
  logStakingV1_PoolRewarded_by_pk?: Maybe<LogStakingV1_PoolRewarded>
  /** fetch data from the table: "logStakingV1" using primary key columns */
  logStakingV1_by_pk?: Maybe<LogStakingV1>
  /** fetch data from the table: "marketplace" */
  marketplace: Array<Marketplace>
  /** fetch data from the table: "rebaseStakingV1" */
  rebaseStakingV1: Array<RebaseStakingV1>
  totalVapr?: Maybe<TotalVaprOutput>
  /** fetch data from the table: "treasury" */
  treasury: Array<Treasury>
  /** fetch data from the table: "treasury" using primary key columns */
  treasury_by_pk?: Maybe<Treasury>
}

export type Query_RootLogAcnvRedemptionArgs = {
  distinct_on?: InputMaybe<Array<LogAcnvRedemption_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<LogAcnvRedemption_Order_By>>
  where?: InputMaybe<LogAcnvRedemption_Bool_Exp>
}

export type Query_RootLogAccrualBondsV1_BondSoldArgs = {
  distinct_on?: InputMaybe<Array<LogAccrualBondsV1_BondSold_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<LogAccrualBondsV1_BondSold_Order_By>>
  where?: InputMaybe<LogAccrualBondsV1_BondSold_Bool_Exp>
}

export type Query_RootLogAccrualBondsV1_BondSold_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootLogAmmArgs = {
  distinct_on?: InputMaybe<Array<LogAmm_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<LogAmm_Order_By>>
  where?: InputMaybe<LogAmm_Bool_Exp>
}

export type Query_RootLogAmm_AggregateArgs = {
  distinct_on?: InputMaybe<Array<LogAmm_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<LogAmm_Order_By>>
  where?: InputMaybe<LogAmm_Bool_Exp>
}

export type Query_RootLogCnvDataArgs = {
  distinct_on?: InputMaybe<Array<LogCnvData_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<LogCnvData_Order_By>>
  where?: InputMaybe<LogCnvData_Bool_Exp>
}

export type Query_RootLogCnvData_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootLogStakingV1Args = {
  distinct_on?: InputMaybe<Array<LogStakingV1_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<LogStakingV1_Order_By>>
  where?: InputMaybe<LogStakingV1_Bool_Exp>
}

export type Query_RootLogStakingV1_LockArgs = {
  distinct_on?: InputMaybe<Array<LogStakingV1_Lock_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<LogStakingV1_Lock_Order_By>>
  where?: InputMaybe<LogStakingV1_Lock_Bool_Exp>
}

export type Query_RootLogStakingV1_Lock_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootLogStakingV1_PoolRewardedArgs = {
  distinct_on?: InputMaybe<Array<LogStakingV1_PoolRewarded_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<LogStakingV1_PoolRewarded_Order_By>>
  where?: InputMaybe<LogStakingV1_PoolRewarded_Bool_Exp>
}

export type Query_RootLogStakingV1_PoolRewarded_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootLogStakingV1_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootMarketplaceArgs = {
  distinct_on?: InputMaybe<Array<Marketplace_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Marketplace_Order_By>>
  where?: InputMaybe<Marketplace_Bool_Exp>
}

export type Query_RootRebaseStakingV1Args = {
  distinct_on?: InputMaybe<Array<RebaseStakingV1_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<RebaseStakingV1_Order_By>>
  where?: InputMaybe<RebaseStakingV1_Bool_Exp>
}

export type Query_RootTreasuryArgs = {
  distinct_on?: InputMaybe<Array<Treasury_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Treasury_Order_By>>
  where?: InputMaybe<Treasury_Bool_Exp>
}

export type Query_RootTreasury_By_PkArgs = {
  id: Scalars['uuid']
}

/** run every 8h and scrap stakingV1 Rebase PoolRewarded events */
export type RebaseStakingV1 = {
  __typename?: 'rebaseStakingV1'
  bondVaprPool0?: Maybe<Scalars['numeric']>
  bondVaprPool1?: Maybe<Scalars['numeric']>
  bondVaprPool2?: Maybe<Scalars['numeric']>
  bondVaprPool3?: Maybe<Scalars['numeric']>
  created_at: Scalars['timestamptz']
  indexRebase?: Maybe<Scalars['numeric']>
  txBlockNumber?: Maybe<Scalars['numeric']>
  txHash?: Maybe<Scalars['String']>
}

/** Boolean expression to filter rows from the table "rebaseStakingV1". All fields are combined with a logical 'AND'. */
export type RebaseStakingV1_Bool_Exp = {
  _and?: InputMaybe<Array<RebaseStakingV1_Bool_Exp>>
  _not?: InputMaybe<RebaseStakingV1_Bool_Exp>
  _or?: InputMaybe<Array<RebaseStakingV1_Bool_Exp>>
  bondVaprPool0?: InputMaybe<Numeric_Comparison_Exp>
  bondVaprPool1?: InputMaybe<Numeric_Comparison_Exp>
  bondVaprPool2?: InputMaybe<Numeric_Comparison_Exp>
  bondVaprPool3?: InputMaybe<Numeric_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  indexRebase?: InputMaybe<Numeric_Comparison_Exp>
  txBlockNumber?: InputMaybe<Numeric_Comparison_Exp>
  txHash?: InputMaybe<String_Comparison_Exp>
}

/** Ordering options when selecting data from "rebaseStakingV1". */
export type RebaseStakingV1_Order_By = {
  bondVaprPool0?: InputMaybe<Order_By>
  bondVaprPool1?: InputMaybe<Order_By>
  bondVaprPool2?: InputMaybe<Order_By>
  bondVaprPool3?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  indexRebase?: InputMaybe<Order_By>
  txBlockNumber?: InputMaybe<Order_By>
  txHash?: InputMaybe<Order_By>
}

/** select columns of table "rebaseStakingV1" */
export enum RebaseStakingV1_Select_Column {
  /** column name */
  BondVaprPool0 = 'bondVaprPool0',
  /** column name */
  BondVaprPool1 = 'bondVaprPool1',
  /** column name */
  BondVaprPool2 = 'bondVaprPool2',
  /** column name */
  BondVaprPool3 = 'bondVaprPool3',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  IndexRebase = 'indexRebase',
  /** column name */
  TxBlockNumber = 'txBlockNumber',
  /** column name */
  TxHash = 'txHash',
}

/** Streaming cursor of the table "rebaseStakingV1" */
export type RebaseStakingV1_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: RebaseStakingV1_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type RebaseStakingV1_Stream_Cursor_Value_Input = {
  bondVaprPool0?: InputMaybe<Scalars['numeric']>
  bondVaprPool1?: InputMaybe<Scalars['numeric']>
  bondVaprPool2?: InputMaybe<Scalars['numeric']>
  bondVaprPool3?: InputMaybe<Scalars['numeric']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  indexRebase?: InputMaybe<Scalars['numeric']>
  txBlockNumber?: InputMaybe<Scalars['numeric']>
  txHash?: InputMaybe<Scalars['String']>
}

export type Subscription_Root = {
  __typename?: 'subscription_root'
  /** fetch data from the table: "logACNVRedemption" */
  logACNVRedemption: Array<LogAcnvRedemption>
  /** fetch data from the table in a streaming manner: "logACNVRedemption" */
  logACNVRedemption_stream: Array<LogAcnvRedemption>
  /** fetch data from the table: "logAccrualBondsV1_BondSold" */
  logAccrualBondsV1_BondSold: Array<LogAccrualBondsV1_BondSold>
  /** fetch data from the table: "logAccrualBondsV1_BondSold" using primary key columns */
  logAccrualBondsV1_BondSold_by_pk?: Maybe<LogAccrualBondsV1_BondSold>
  /** fetch data from the table in a streaming manner: "logAccrualBondsV1_BondSold" */
  logAccrualBondsV1_BondSold_stream: Array<LogAccrualBondsV1_BondSold>
  /** fetch data from the table: "logAmm" */
  logAmm: Array<LogAmm>
  /** fetch aggregated fields from the table: "logAmm" */
  logAmm_aggregate: LogAmm_Aggregate
  /** fetch data from the table in a streaming manner: "logAmm" */
  logAmm_stream: Array<LogAmm>
  /** fetch data from the table: "logCnvData" */
  logCnvData: Array<LogCnvData>
  /** fetch data from the table: "logCnvData" using primary key columns */
  logCnvData_by_pk?: Maybe<LogCnvData>
  /** fetch data from the table in a streaming manner: "logCnvData" */
  logCnvData_stream: Array<LogCnvData>
  /** fetch data from the table: "logStakingV1" */
  logStakingV1: Array<LogStakingV1>
  /** fetch data from the table: "logStakingV1_Lock" */
  logStakingV1_Lock: Array<LogStakingV1_Lock>
  /** fetch data from the table: "logStakingV1_Lock" using primary key columns */
  logStakingV1_Lock_by_pk?: Maybe<LogStakingV1_Lock>
  /** fetch data from the table in a streaming manner: "logStakingV1_Lock" */
  logStakingV1_Lock_stream: Array<LogStakingV1_Lock>
  /** fetch data from the table: "logStakingV1_PoolRewarded" */
  logStakingV1_PoolRewarded: Array<LogStakingV1_PoolRewarded>
  /** fetch data from the table: "logStakingV1_PoolRewarded" using primary key columns */
  logStakingV1_PoolRewarded_by_pk?: Maybe<LogStakingV1_PoolRewarded>
  /** fetch data from the table in a streaming manner: "logStakingV1_PoolRewarded" */
  logStakingV1_PoolRewarded_stream: Array<LogStakingV1_PoolRewarded>
  /** fetch data from the table: "logStakingV1" using primary key columns */
  logStakingV1_by_pk?: Maybe<LogStakingV1>
  /** fetch data from the table in a streaming manner: "logStakingV1" */
  logStakingV1_stream: Array<LogStakingV1>
  /** fetch data from the table: "marketplace" */
  marketplace: Array<Marketplace>
  /** fetch data from the table in a streaming manner: "marketplace" */
  marketplace_stream: Array<Marketplace>
  /** fetch data from the table: "rebaseStakingV1" */
  rebaseStakingV1: Array<RebaseStakingV1>
  /** fetch data from the table in a streaming manner: "rebaseStakingV1" */
  rebaseStakingV1_stream: Array<RebaseStakingV1>
  /** fetch data from the table: "treasury" */
  treasury: Array<Treasury>
  /** fetch data from the table: "treasury" using primary key columns */
  treasury_by_pk?: Maybe<Treasury>
  /** fetch data from the table in a streaming manner: "treasury" */
  treasury_stream: Array<Treasury>
}

export type Subscription_RootLogAcnvRedemptionArgs = {
  distinct_on?: InputMaybe<Array<LogAcnvRedemption_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<LogAcnvRedemption_Order_By>>
  where?: InputMaybe<LogAcnvRedemption_Bool_Exp>
}

export type Subscription_RootLogAcnvRedemption_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<InputMaybe<LogAcnvRedemption_Stream_Cursor_Input>>
  where?: InputMaybe<LogAcnvRedemption_Bool_Exp>
}

export type Subscription_RootLogAccrualBondsV1_BondSoldArgs = {
  distinct_on?: InputMaybe<Array<LogAccrualBondsV1_BondSold_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<LogAccrualBondsV1_BondSold_Order_By>>
  where?: InputMaybe<LogAccrualBondsV1_BondSold_Bool_Exp>
}

export type Subscription_RootLogAccrualBondsV1_BondSold_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootLogAccrualBondsV1_BondSold_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<InputMaybe<LogAccrualBondsV1_BondSold_Stream_Cursor_Input>>
  where?: InputMaybe<LogAccrualBondsV1_BondSold_Bool_Exp>
}

export type Subscription_RootLogAmmArgs = {
  distinct_on?: InputMaybe<Array<LogAmm_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<LogAmm_Order_By>>
  where?: InputMaybe<LogAmm_Bool_Exp>
}

export type Subscription_RootLogAmm_AggregateArgs = {
  distinct_on?: InputMaybe<Array<LogAmm_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<LogAmm_Order_By>>
  where?: InputMaybe<LogAmm_Bool_Exp>
}

export type Subscription_RootLogAmm_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<InputMaybe<LogAmm_Stream_Cursor_Input>>
  where?: InputMaybe<LogAmm_Bool_Exp>
}

export type Subscription_RootLogCnvDataArgs = {
  distinct_on?: InputMaybe<Array<LogCnvData_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<LogCnvData_Order_By>>
  where?: InputMaybe<LogCnvData_Bool_Exp>
}

export type Subscription_RootLogCnvData_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootLogCnvData_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<InputMaybe<LogCnvData_Stream_Cursor_Input>>
  where?: InputMaybe<LogCnvData_Bool_Exp>
}

export type Subscription_RootLogStakingV1Args = {
  distinct_on?: InputMaybe<Array<LogStakingV1_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<LogStakingV1_Order_By>>
  where?: InputMaybe<LogStakingV1_Bool_Exp>
}

export type Subscription_RootLogStakingV1_LockArgs = {
  distinct_on?: InputMaybe<Array<LogStakingV1_Lock_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<LogStakingV1_Lock_Order_By>>
  where?: InputMaybe<LogStakingV1_Lock_Bool_Exp>
}

export type Subscription_RootLogStakingV1_Lock_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootLogStakingV1_Lock_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<InputMaybe<LogStakingV1_Lock_Stream_Cursor_Input>>
  where?: InputMaybe<LogStakingV1_Lock_Bool_Exp>
}

export type Subscription_RootLogStakingV1_PoolRewardedArgs = {
  distinct_on?: InputMaybe<Array<LogStakingV1_PoolRewarded_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<LogStakingV1_PoolRewarded_Order_By>>
  where?: InputMaybe<LogStakingV1_PoolRewarded_Bool_Exp>
}

export type Subscription_RootLogStakingV1_PoolRewarded_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootLogStakingV1_PoolRewarded_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<InputMaybe<LogStakingV1_PoolRewarded_Stream_Cursor_Input>>
  where?: InputMaybe<LogStakingV1_PoolRewarded_Bool_Exp>
}

export type Subscription_RootLogStakingV1_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootLogStakingV1_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<InputMaybe<LogStakingV1_Stream_Cursor_Input>>
  where?: InputMaybe<LogStakingV1_Bool_Exp>
}

export type Subscription_RootMarketplaceArgs = {
  distinct_on?: InputMaybe<Array<Marketplace_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Marketplace_Order_By>>
  where?: InputMaybe<Marketplace_Bool_Exp>
}

export type Subscription_RootMarketplace_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<InputMaybe<Marketplace_Stream_Cursor_Input>>
  where?: InputMaybe<Marketplace_Bool_Exp>
}

export type Subscription_RootRebaseStakingV1Args = {
  distinct_on?: InputMaybe<Array<RebaseStakingV1_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<RebaseStakingV1_Order_By>>
  where?: InputMaybe<RebaseStakingV1_Bool_Exp>
}

export type Subscription_RootRebaseStakingV1_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<InputMaybe<RebaseStakingV1_Stream_Cursor_Input>>
  where?: InputMaybe<RebaseStakingV1_Bool_Exp>
}

export type Subscription_RootTreasuryArgs = {
  distinct_on?: InputMaybe<Array<Treasury_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Treasury_Order_By>>
  where?: InputMaybe<Treasury_Bool_Exp>
}

export type Subscription_RootTreasury_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootTreasury_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<InputMaybe<Treasury_Stream_Cursor_Input>>
  where?: InputMaybe<Treasury_Bool_Exp>
}

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>
  _gt?: InputMaybe<Scalars['timestamptz']>
  _gte?: InputMaybe<Scalars['timestamptz']>
  _in?: InputMaybe<Array<Scalars['timestamptz']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['timestamptz']>
  _lte?: InputMaybe<Scalars['timestamptz']>
  _neq?: InputMaybe<Scalars['timestamptz']>
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>
}

export type TotalVaprOutput = {
  __typename?: 'totalVaprOutput'
  pool0TotalBaseVapr: Scalars['Float']
  pool1TotalBaseVapr: Scalars['Float']
  pool2TotalBaseVapr: Scalars['Float']
  pool3TotalBaseVapr: Scalars['Float']
}

/** list of assets where value are updated with cronjob */
export type Treasury = {
  __typename?: 'treasury'
  amount?: Maybe<Scalars['numeric']>
  chainId?: Maybe<Scalars['String']>
  contract: Scalars['String']
  created_at: Scalars['timestamptz']
  id: Scalars['uuid']
  image?: Maybe<Scalars['String']>
  imageP1?: Maybe<Scalars['String']>
  imageP2?: Maybe<Scalars['String']>
  imageP3?: Maybe<Scalars['String']>
  isLP?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  rewards?: Maybe<Scalars['numeric']>
  total?: Maybe<Scalars['numeric']>
  updated_at: Scalars['timestamptz']
  value?: Maybe<Scalars['numeric']>
}

/** Boolean expression to filter rows from the table "treasury". All fields are combined with a logical 'AND'. */
export type Treasury_Bool_Exp = {
  _and?: InputMaybe<Array<Treasury_Bool_Exp>>
  _not?: InputMaybe<Treasury_Bool_Exp>
  _or?: InputMaybe<Array<Treasury_Bool_Exp>>
  amount?: InputMaybe<Numeric_Comparison_Exp>
  chainId?: InputMaybe<String_Comparison_Exp>
  contract?: InputMaybe<String_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  id?: InputMaybe<Uuid_Comparison_Exp>
  image?: InputMaybe<String_Comparison_Exp>
  imageP1?: InputMaybe<String_Comparison_Exp>
  imageP2?: InputMaybe<String_Comparison_Exp>
  imageP3?: InputMaybe<String_Comparison_Exp>
  isLP?: InputMaybe<Boolean_Comparison_Exp>
  name?: InputMaybe<String_Comparison_Exp>
  rewards?: InputMaybe<Numeric_Comparison_Exp>
  total?: InputMaybe<Numeric_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
  value?: InputMaybe<Numeric_Comparison_Exp>
}

/** Ordering options when selecting data from "treasury". */
export type Treasury_Order_By = {
  amount?: InputMaybe<Order_By>
  chainId?: InputMaybe<Order_By>
  contract?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  image?: InputMaybe<Order_By>
  imageP1?: InputMaybe<Order_By>
  imageP2?: InputMaybe<Order_By>
  imageP3?: InputMaybe<Order_By>
  isLP?: InputMaybe<Order_By>
  name?: InputMaybe<Order_By>
  rewards?: InputMaybe<Order_By>
  total?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  value?: InputMaybe<Order_By>
}

/** select columns of table "treasury" */
export enum Treasury_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  Contract = 'contract',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  ImageP1 = 'imageP1',
  /** column name */
  ImageP2 = 'imageP2',
  /** column name */
  ImageP3 = 'imageP3',
  /** column name */
  IsLp = 'isLP',
  /** column name */
  Name = 'name',
  /** column name */
  Rewards = 'rewards',
  /** column name */
  Total = 'total',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value',
}

/** Streaming cursor of the table "treasury" */
export type Treasury_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Treasury_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Treasury_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']>
  chainId?: InputMaybe<Scalars['String']>
  contract?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  id?: InputMaybe<Scalars['uuid']>
  image?: InputMaybe<Scalars['String']>
  imageP1?: InputMaybe<Scalars['String']>
  imageP2?: InputMaybe<Scalars['String']>
  imageP3?: InputMaybe<Scalars['String']>
  isLP?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
  rewards?: InputMaybe<Scalars['numeric']>
  total?: InputMaybe<Scalars['numeric']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  value?: InputMaybe<Scalars['numeric']>
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>
  _gt?: InputMaybe<Scalars['uuid']>
  _gte?: InputMaybe<Scalars['uuid']>
  _in?: InputMaybe<Array<Scalars['uuid']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['uuid']>
  _lte?: InputMaybe<Scalars['uuid']>
  _neq?: InputMaybe<Scalars['uuid']>
  _nin?: InputMaybe<Array<Scalars['uuid']>>
}

export type Get_Last_Base_VaprQueryVariables = Exact<{ [key: string]: never }>

export type Get_Last_Base_VaprQuery = {
  __typename?: 'query_root'
  logStakingV1_PoolRewarded: Array<{
    __typename?: 'logStakingV1_PoolRewarded'
    base_vAPR?: any | null
  }>
}

export type Get_Last_Pools_Total_VaprQueryVariables = Exact<{ [key: string]: never }>

export type Get_Last_Pools_Total_VaprQuery = {
  __typename?: 'query_root'
  totalVapr?: {
    __typename?: 'totalVaprOutput'
    pool0TotalBaseVapr: number
    pool1TotalBaseVapr: number
    pool2TotalBaseVapr: number
    pool3TotalBaseVapr: number
  } | null
}

export type Get_Last_Poolid_VaprQueryVariables = Exact<{
  poolID?: InputMaybe<Scalars['numeric']>
}>

export type Get_Last_Poolid_VaprQuery = {
  __typename?: 'query_root'
  logStakingV1_PoolRewarded: Array<{
    __typename?: 'logStakingV1_PoolRewarded'
    base_vAPR?: any | null
  }>
}

export type Get_All_Total_Pools_VaprQueryVariables = Exact<{ [key: string]: never }>

export type Get_All_Total_Pools_VaprQuery = {
  __typename?: 'query_root'
  logStakingV1_PoolRewarded: Array<{
    __typename?: 'logStakingV1_PoolRewarded'
    base_vAPR?: any | null
    poolID?: any | null
  }>
  rebaseStakingV1: Array<{
    __typename?: 'rebaseStakingV1'
    bondVaprPool0?: any | null
    bondVaprPool1?: any | null
    bondVaprPool2?: any | null
    bondVaprPool3?: any | null
  }>
}

export type Get_Amm_Cnv_PriceQueryVariables = Exact<{ [key: string]: never }>

export type Get_Amm_Cnv_PriceQuery = {
  __typename?: 'query_root'
  cnvData?: {
    __typename?: 'cnvDataOutput'
    data?: { __typename?: 'cnvData'; last?: number | null; ticker?: string | null } | null
  } | null
}

export type Get_Amm_Cnv_InfosQueryVariables = Exact<{ [key: string]: never }>

export type Get_Amm_Cnv_InfosQuery = {
  __typename?: 'query_root'
  cnvData?: {
    __typename?: 'cnvDataOutput'
    data?: {
      __typename?: 'cnvData'
      last?: number | null
      marketCap?: number | null
      totalSupply?: number | null
      circulatingSupply?: number | null
    } | null
  } | null
}

export type Get_Cnv_DataQueryVariables = Exact<{ [key: string]: never }>

export type Get_Cnv_DataQuery = {
  __typename?: 'query_root'
  cnvData?: {
    __typename?: 'cnvDataOutput'
    data?: { __typename?: 'cnvData'; last?: number | null; ticker?: string | null } | null
  } | null
  logCnvData: Array<{ __typename?: 'logCnvData'; last?: any | null; updated_at: any }>
}

export type Get_Stackingv1_Last100_EventsQueryVariables = Exact<{ [key: string]: never }>

export type Get_Stackingv1_Last100_EventsQuery = {
  __typename?: 'query_root'
  logStakingV1: Array<{
    __typename?: 'logStakingV1'
    txBlockNumber?: any | null
    txHash?: string | null
    poolID?: any | null
    tokenID?: any | null
    sold?: boolean | null
    from?: string | null
    to?: string | null
    amountLocked?: string | null
    lockedUntil?: any | null
  }>
}

export type Get_Stackingv1_By_Pool_IdQueryVariables = Exact<{
  poolID?: InputMaybe<Numeric_Comparison_Exp>
}>

export type Get_Stackingv1_By_Pool_IdQuery = {
  __typename?: 'query_root'
  logStakingV1: Array<{
    __typename?: 'logStakingV1'
    txBlockNumber?: any | null
    txHash?: string | null
    poolID?: any | null
    tokenID?: any | null
    sold?: boolean | null
    from?: string | null
    to?: string | null
    amountLocked?: string | null
    lockedUntil?: any | null
  }>
}

export type Get_Stakingv1_Last100_LockQueryVariables = Exact<{ [key: string]: never }>

export type Get_Stakingv1_Last100_LockQuery = {
  __typename?: 'query_root'
  logStakingV1_Lock: Array<{
    __typename?: 'logStakingV1_Lock'
    txHash?: string | null
    txBlockNumber?: any | null
    poolID?: any | null
    timestamp?: any | null
    positionID?: any | null
    to?: string | null
    amount?: string | null
  }>
}

export type Get_Accrualbondv1_Last10_SoldQueryVariables = Exact<{ [key: string]: never }>

export type Get_Accrualbondv1_Last10_SoldQuery = {
  __typename?: 'query_root'
  logAccrualBondsV1_BondSold: Array<{
    __typename?: 'logAccrualBondsV1_BondSold'
    timestamp?: any | null
    inputToken?: string | null
    inputAmount?: string | null
    txHash?: string | null
    method?: string | null
    output?: string | null
  }>
}

export type Get_Bonds_VaprQueryVariables = Exact<{ [key: string]: never }>

export type Get_Bonds_VaprQuery = {
  __typename?: 'query_root'
  rebaseStakingV1: Array<{
    __typename?: 'rebaseStakingV1'
    indexRebase?: any | null
    created_at: any
    txHash?: string | null
    bondVaprPool0?: any | null
    bondVaprPool1?: any | null
    bondVaprPool2?: any | null
    bondVaprPool3?: any | null
  }>
}

export type Get_User_Acnv_RedeemedQueryVariables = Exact<{
  address: Scalars['String']
}>

export type Get_User_Acnv_RedeemedQuery = {
  __typename?: 'query_root'
  logACNVRedemption: Array<{
    __typename?: 'logACNVRedemption'
    address?: string | null
    amount?: any | null
    txHash?: string | null
  }>
}

export type Get_Nft_Lock_PositionQueryVariables = Exact<{
  address: Scalars['String']
}>

export type Get_Nft_Lock_PositionQuery = {
  __typename?: 'query_root'
  logStakingV1_Lock: Array<{
    __typename?: 'logStakingV1_Lock'
    to?: string | null
    created_at: any
    amount?: string | null
    deposit?: string | null
    maturity?: any | null
    poolBalance?: string | null
    poolExcessRatio?: any | null
    poolG?: any | null
    poolID?: any | null
    poolRewardsPerShare?: string | null
    poolSupply?: string | null
    poolTerm?: any | null
    positionID?: any | null
    rewardDebt?: string | null
    shares?: string | null
    timestamp?: any | null
    txBlockNumber?: any | null
    txHash?: string | null
  }>
}

export type Insert_Marketplace_ListingMutationVariables = Exact<{
  signatureHash?: InputMaybe<Scalars['String']>
  start?: InputMaybe<Scalars['String']>
  startPrice?: InputMaybe<Scalars['String']>
  endPrice?: InputMaybe<Scalars['String']>
  tokenID: Scalars['numeric']
  tokenOwner: Scalars['String']
  deadline?: InputMaybe<Scalars['numeric']>
  tokenIsListed?: InputMaybe<Scalars['Boolean']>
  newOwner?: InputMaybe<Scalars['String']>
  soldFor?: InputMaybe<Scalars['String']>
  txHash?: InputMaybe<Scalars['String']>
  tokenOption?: InputMaybe<Scalars['String']>
}>

export type Insert_Marketplace_ListingMutation = {
  __typename?: 'mutation_root'
  insert_marketplace_one?: {
    __typename?: 'marketplace'
    tokenID: any
    tokenIsListed: boolean
  } | null
}

export type Get_TreasuryQueryVariables = Exact<{ [key: string]: never }>

export type Get_TreasuryQuery = {
  __typename?: 'query_root'
  treasury: Array<{
    __typename?: 'treasury'
    updated_at: any
    contract: string
    chainId?: string | null
    name?: string | null
    amount?: any | null
    value?: any | null
    rewards?: any | null
    total?: any | null
    image?: string | null
    isLP?: boolean | null
    imageP1?: string | null
    imageP2?: string | null
    imageP3?: string | null
  }>
}

export const Get_Last_Base_VaprDocument = `
    query GET_LAST_BASE_VAPR {
  logStakingV1_PoolRewarded(where: {balance: {_gt: "0"}}) {
    base_vAPR
  }
}
    `
export const useGet_Last_Base_VaprQuery = <TData = Get_Last_Base_VaprQuery, TError = unknown>(
  variables?: Get_Last_Base_VaprQueryVariables,
  options?: UseQueryOptions<Get_Last_Base_VaprQuery, TError, TData>,
) =>
  useQuery<Get_Last_Base_VaprQuery, TError, TData>(
    variables === undefined ? ['GET_LAST_BASE_VAPR'] : ['GET_LAST_BASE_VAPR', variables],
    fetcher<Get_Last_Base_VaprQuery, Get_Last_Base_VaprQueryVariables>(
      Get_Last_Base_VaprDocument,
      variables,
    ),
    options,
  )
export const Get_Last_Pools_Total_VaprDocument = `
    query GET_LAST_POOLS_TOTAL_VAPR {
  totalVapr {
    pool0TotalBaseVapr
    pool1TotalBaseVapr
    pool2TotalBaseVapr
    pool3TotalBaseVapr
  }
}
    `
export const useGet_Last_Pools_Total_VaprQuery = <
  TData = Get_Last_Pools_Total_VaprQuery,
  TError = unknown,
>(
  variables?: Get_Last_Pools_Total_VaprQueryVariables,
  options?: UseQueryOptions<Get_Last_Pools_Total_VaprQuery, TError, TData>,
) =>
  useQuery<Get_Last_Pools_Total_VaprQuery, TError, TData>(
    variables === undefined
      ? ['GET_LAST_POOLS_TOTAL_VAPR']
      : ['GET_LAST_POOLS_TOTAL_VAPR', variables],
    fetcher<Get_Last_Pools_Total_VaprQuery, Get_Last_Pools_Total_VaprQueryVariables>(
      Get_Last_Pools_Total_VaprDocument,
      variables,
    ),
    options,
  )
export const Get_Last_Poolid_VaprDocument = `
    query GET_LAST_POOLID_VAPR($poolID: numeric) {
  logStakingV1_PoolRewarded(
    where: {poolID: {_eq: $poolID}}
    order_by: {txBlockNumber: desc}
    limit: 1
  ) {
    base_vAPR
  }
}
    `
export const useGet_Last_Poolid_VaprQuery = <TData = Get_Last_Poolid_VaprQuery, TError = unknown>(
  variables?: Get_Last_Poolid_VaprQueryVariables,
  options?: UseQueryOptions<Get_Last_Poolid_VaprQuery, TError, TData>,
) =>
  useQuery<Get_Last_Poolid_VaprQuery, TError, TData>(
    variables === undefined ? ['GET_LAST_POOLID_VAPR'] : ['GET_LAST_POOLID_VAPR', variables],
    fetcher<Get_Last_Poolid_VaprQuery, Get_Last_Poolid_VaprQueryVariables>(
      Get_Last_Poolid_VaprDocument,
      variables,
    ),
    options,
  )
export const Get_All_Total_Pools_VaprDocument = `
    query GET_ALL_TOTAL_POOLS_VAPR {
  logStakingV1_PoolRewarded(
    limit: 4
    order_by: {txBlockNumber: desc}
    where: {base_vAPR: {_gte: "0"}}
  ) {
    base_vAPR
    poolID
  }
  rebaseStakingV1(
    where: {bondVaprPool0: {_gt: "0"}, bondVaprPool1: {_gt: "0"}, bondVaprPool2: {_gt: "0"}, bondVaprPool3: {_gt: "0"}}
    limit: 1
    order_by: {txBlockNumber: desc}
  ) {
    bondVaprPool0
    bondVaprPool1
    bondVaprPool2
    bondVaprPool3
  }
}
    `
export const useGet_All_Total_Pools_VaprQuery = <
  TData = Get_All_Total_Pools_VaprQuery,
  TError = unknown,
>(
  variables?: Get_All_Total_Pools_VaprQueryVariables,
  options?: UseQueryOptions<Get_All_Total_Pools_VaprQuery, TError, TData>,
) =>
  useQuery<Get_All_Total_Pools_VaprQuery, TError, TData>(
    variables === undefined
      ? ['GET_ALL_TOTAL_POOLS_VAPR']
      : ['GET_ALL_TOTAL_POOLS_VAPR', variables],
    fetcher<Get_All_Total_Pools_VaprQuery, Get_All_Total_Pools_VaprQueryVariables>(
      Get_All_Total_Pools_VaprDocument,
      variables,
    ),
    options,
  )
export const Get_Amm_Cnv_PriceDocument = `
    query GET_AMM_CNV_PRICE {
  cnvData {
    data {
      last
      ticker
    }
  }
}
    `
export const useGet_Amm_Cnv_PriceQuery = <TData = Get_Amm_Cnv_PriceQuery, TError = unknown>(
  variables?: Get_Amm_Cnv_PriceQueryVariables,
  options?: UseQueryOptions<Get_Amm_Cnv_PriceQuery, TError, TData>,
) =>
  useQuery<Get_Amm_Cnv_PriceQuery, TError, TData>(
    variables === undefined ? ['GET_AMM_CNV_PRICE'] : ['GET_AMM_CNV_PRICE', variables],
    fetcher<Get_Amm_Cnv_PriceQuery, Get_Amm_Cnv_PriceQueryVariables>(
      Get_Amm_Cnv_PriceDocument,
      variables,
    ),
    options,
  )
export const Get_Amm_Cnv_InfosDocument = `
    query GET_AMM_CNV_INFOS {
  cnvData {
    data {
      last
      marketCap
      totalSupply
      circulatingSupply
    }
  }
}
    `
export const useGet_Amm_Cnv_InfosQuery = <TData = Get_Amm_Cnv_InfosQuery, TError = unknown>(
  variables?: Get_Amm_Cnv_InfosQueryVariables,
  options?: UseQueryOptions<Get_Amm_Cnv_InfosQuery, TError, TData>,
) =>
  useQuery<Get_Amm_Cnv_InfosQuery, TError, TData>(
    variables === undefined ? ['GET_AMM_CNV_INFOS'] : ['GET_AMM_CNV_INFOS', variables],
    fetcher<Get_Amm_Cnv_InfosQuery, Get_Amm_Cnv_InfosQueryVariables>(
      Get_Amm_Cnv_InfosDocument,
      variables,
    ),
    options,
  )
export const Get_Cnv_DataDocument = `
    query GET_CNV_DATA {
  cnvData {
    data {
      last
      ticker
    }
  }
  logCnvData(limit: 7, order_by: {created_at: desc}) {
    last
    updated_at
  }
}
    `
export const useGet_Cnv_DataQuery = <TData = Get_Cnv_DataQuery, TError = unknown>(
  variables?: Get_Cnv_DataQueryVariables,
  options?: UseQueryOptions<Get_Cnv_DataQuery, TError, TData>,
) =>
  useQuery<Get_Cnv_DataQuery, TError, TData>(
    variables === undefined ? ['GET_CNV_DATA'] : ['GET_CNV_DATA', variables],
    fetcher<Get_Cnv_DataQuery, Get_Cnv_DataQueryVariables>(Get_Cnv_DataDocument, variables),
    options,
  )
export const Get_Stackingv1_Last100_EventsDocument = `
    query GET_STACKINGV1_LAST100_EVENTS {
  logStakingV1(order_by: {txBlockNumber: desc}, limit: 100) {
    txBlockNumber
    txHash
    poolID
    tokenID
    sold
    from
    to
    amountLocked
    lockedUntil
  }
}
    `
export const useGet_Stackingv1_Last100_EventsQuery = <
  TData = Get_Stackingv1_Last100_EventsQuery,
  TError = unknown,
>(
  variables?: Get_Stackingv1_Last100_EventsQueryVariables,
  options?: UseQueryOptions<Get_Stackingv1_Last100_EventsQuery, TError, TData>,
) =>
  useQuery<Get_Stackingv1_Last100_EventsQuery, TError, TData>(
    variables === undefined
      ? ['GET_STACKINGV1_LAST100_EVENTS']
      : ['GET_STACKINGV1_LAST100_EVENTS', variables],
    fetcher<Get_Stackingv1_Last100_EventsQuery, Get_Stackingv1_Last100_EventsQueryVariables>(
      Get_Stackingv1_Last100_EventsDocument,
      variables,
    ),
    options,
  )
export const Get_Stackingv1_By_Pool_IdDocument = `
    query GET_STACKINGV1_BY_POOL_ID($poolID: numeric_comparison_exp) {
  logStakingV1(
    order_by: {txBlockNumber: desc}
    where: {poolID: $poolID}
    limit: 10
  ) {
    txBlockNumber
    txHash
    poolID
    tokenID
    sold
    from
    to
    amountLocked
    lockedUntil
  }
}
    `
export const useGet_Stackingv1_By_Pool_IdQuery = <
  TData = Get_Stackingv1_By_Pool_IdQuery,
  TError = unknown,
>(
  variables?: Get_Stackingv1_By_Pool_IdQueryVariables,
  options?: UseQueryOptions<Get_Stackingv1_By_Pool_IdQuery, TError, TData>,
) =>
  useQuery<Get_Stackingv1_By_Pool_IdQuery, TError, TData>(
    variables === undefined
      ? ['GET_STACKINGV1_BY_POOL_ID']
      : ['GET_STACKINGV1_BY_POOL_ID', variables],
    fetcher<Get_Stackingv1_By_Pool_IdQuery, Get_Stackingv1_By_Pool_IdQueryVariables>(
      Get_Stackingv1_By_Pool_IdDocument,
      variables,
    ),
    options,
  )
export const Get_Stakingv1_Last100_LockDocument = `
    query GET_STAKINGV1_LAST100_LOCK {
  logStakingV1_Lock(
    order_by: {timestamp: desc}
    limit: 100
    where: {txHash: {_neq: "null"}}
  ) {
    txHash
    txBlockNumber
    poolID
    timestamp
    positionID
    to
    amount
  }
}
    `
export const useGet_Stakingv1_Last100_LockQuery = <
  TData = Get_Stakingv1_Last100_LockQuery,
  TError = unknown,
>(
  variables?: Get_Stakingv1_Last100_LockQueryVariables,
  options?: UseQueryOptions<Get_Stakingv1_Last100_LockQuery, TError, TData>,
) =>
  useQuery<Get_Stakingv1_Last100_LockQuery, TError, TData>(
    variables === undefined
      ? ['GET_STAKINGV1_LAST100_LOCK']
      : ['GET_STAKINGV1_LAST100_LOCK', variables],
    fetcher<Get_Stakingv1_Last100_LockQuery, Get_Stakingv1_Last100_LockQueryVariables>(
      Get_Stakingv1_Last100_LockDocument,
      variables,
    ),
    options,
  )
export const Get_Accrualbondv1_Last10_SoldDocument = `
    query GET_ACCRUALBONDV1_LAST10_SOLD {
  logAccrualBondsV1_BondSold(
    order_by: {txBlockNumber: desc}
    limit: 10
    where: {output: {_neq: "null"}}
  ) {
    timestamp
    inputToken
    inputAmount
    txHash
    method
    output
  }
}
    `
export const useGet_Accrualbondv1_Last10_SoldQuery = <
  TData = Get_Accrualbondv1_Last10_SoldQuery,
  TError = unknown,
>(
  variables?: Get_Accrualbondv1_Last10_SoldQueryVariables,
  options?: UseQueryOptions<Get_Accrualbondv1_Last10_SoldQuery, TError, TData>,
) =>
  useQuery<Get_Accrualbondv1_Last10_SoldQuery, TError, TData>(
    variables === undefined
      ? ['GET_ACCRUALBONDV1_LAST10_SOLD']
      : ['GET_ACCRUALBONDV1_LAST10_SOLD', variables],
    fetcher<Get_Accrualbondv1_Last10_SoldQuery, Get_Accrualbondv1_Last10_SoldQueryVariables>(
      Get_Accrualbondv1_Last10_SoldDocument,
      variables,
    ),
    options,
  )
export const Get_Bonds_VaprDocument = `
    query GET_BONDS_VAPR {
  rebaseStakingV1(
    order_by: {txBlockNumber: desc}
    limit: 1
    where: {txHash: {_is_null: false}}
  ) {
    indexRebase
    created_at
    txHash
    bondVaprPool0
    bondVaprPool1
    bondVaprPool2
    bondVaprPool3
  }
}
    `
export const useGet_Bonds_VaprQuery = <TData = Get_Bonds_VaprQuery, TError = unknown>(
  variables?: Get_Bonds_VaprQueryVariables,
  options?: UseQueryOptions<Get_Bonds_VaprQuery, TError, TData>,
) =>
  useQuery<Get_Bonds_VaprQuery, TError, TData>(
    variables === undefined ? ['GET_BONDS_VAPR'] : ['GET_BONDS_VAPR', variables],
    fetcher<Get_Bonds_VaprQuery, Get_Bonds_VaprQueryVariables>(Get_Bonds_VaprDocument, variables),
    options,
  )
export const Get_User_Acnv_RedeemedDocument = `
    query GET_USER_ACNV_REDEEMED($address: String!) {
  logACNVRedemption(where: {address: {_eq: $address}, amount: {_gt: "0"}}) {
    address
    amount
    txHash
  }
}
    `
export const useGet_User_Acnv_RedeemedQuery = <
  TData = Get_User_Acnv_RedeemedQuery,
  TError = unknown,
>(
  variables: Get_User_Acnv_RedeemedQueryVariables,
  options?: UseQueryOptions<Get_User_Acnv_RedeemedQuery, TError, TData>,
) =>
  useQuery<Get_User_Acnv_RedeemedQuery, TError, TData>(
    ['GET_USER_ACNV_REDEEMED', variables],
    fetcher<Get_User_Acnv_RedeemedQuery, Get_User_Acnv_RedeemedQueryVariables>(
      Get_User_Acnv_RedeemedDocument,
      variables,
    ),
    options,
  )
export const Get_Nft_Lock_PositionDocument = `
    query GET_NFT_LOCK_POSITION($address: String!) {
  logStakingV1_Lock(order_by: {created_at: desc}, where: {to: {_eq: $address}}) {
    to
    created_at
    amount
    deposit
    maturity
    poolBalance
    poolExcessRatio
    poolG
    poolID
    poolRewardsPerShare
    poolSupply
    poolTerm
    positionID
    rewardDebt
    shares
    timestamp
    txBlockNumber
    txHash
  }
}
    `
export const useGet_Nft_Lock_PositionQuery = <TData = Get_Nft_Lock_PositionQuery, TError = unknown>(
  variables: Get_Nft_Lock_PositionQueryVariables,
  options?: UseQueryOptions<Get_Nft_Lock_PositionQuery, TError, TData>,
) =>
  useQuery<Get_Nft_Lock_PositionQuery, TError, TData>(
    ['GET_NFT_LOCK_POSITION', variables],
    fetcher<Get_Nft_Lock_PositionQuery, Get_Nft_Lock_PositionQueryVariables>(
      Get_Nft_Lock_PositionDocument,
      variables,
    ),
    options,
  )
export const Insert_Marketplace_ListingDocument = `
    mutation INSERT_MARKETPLACE_LISTING($signatureHash: String, $start: String, $startPrice: String, $endPrice: String, $tokenID: numeric!, $tokenOwner: String!, $deadline: numeric, $tokenIsListed: Boolean, $newOwner: String, $soldFor: String, $txHash: String, $tokenOption: String) {
  insert_marketplace_one(
    object: {signatureHash: $signatureHash, start: $start, startPrice: $startPrice, endPrice: $endPrice, tokenID: $tokenID, tokenIsListed: $tokenIsListed, tokenOwner: $tokenOwner, deadline: $deadline, newOwner: $newOwner, soldFor: $soldFor, txHash: $txHash, tokenOption: $tokenOption}
  ) {
    tokenID
    tokenIsListed
  }
}
    `
export const useInsert_Marketplace_ListingMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Insert_Marketplace_ListingMutation,
    TError,
    Insert_Marketplace_ListingMutationVariables,
    TContext
  >,
) =>
  useMutation<
    Insert_Marketplace_ListingMutation,
    TError,
    Insert_Marketplace_ListingMutationVariables,
    TContext
  >(
    ['INSERT_MARKETPLACE_LISTING'],
    (variables?: Insert_Marketplace_ListingMutationVariables) =>
      fetcher<Insert_Marketplace_ListingMutation, Insert_Marketplace_ListingMutationVariables>(
        Insert_Marketplace_ListingDocument,
        variables,
      )(),
    options,
  )
export const Get_TreasuryDocument = `
    query GET_TREASURY {
  treasury {
    updated_at
    contract
    chainId
    name
    amount
    value
    rewards
    total
    image
    isLP
    imageP1
    imageP2
    imageP3
  }
}
    `
export const useGet_TreasuryQuery = <TData = Get_TreasuryQuery, TError = unknown>(
  variables?: Get_TreasuryQueryVariables,
  options?: UseQueryOptions<Get_TreasuryQuery, TError, TData>,
) =>
  useQuery<Get_TreasuryQuery, TError, TData>(
    variables === undefined ? ['GET_TREASURY'] : ['GET_TREASURY', variables],
    fetcher<Get_TreasuryQuery, Get_TreasuryQueryVariables>(Get_TreasuryDocument, variables),
    options,
  )

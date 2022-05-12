import { RQ_HASURA_ENDPOINT, RQ_HASURA_PARAMS } from 'lib/hasura.rq'
import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(RQ_HASURA_ENDPOINT as string, {
    method: "POST",
    ...(RQ_HASURA_PARAMS),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  numeric: any;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

export type CnvData = {
  __typename?: 'cnvData';
  baseVolume?: Maybe<Scalars['String']>;
  blockchain?: Maybe<Scalars['String']>;
  circulatingSupply?: Maybe<Scalars['Float']>;
  high24hr?: Maybe<Scalars['String']>;
  highestBid?: Maybe<Scalars['String']>;
  isFrozen?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Float']>;
  low24hr?: Maybe<Scalars['String']>;
  lowestAsk?: Maybe<Scalars['String']>;
  marketCap?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  percentChange?: Maybe<Scalars['String']>;
  quoteVolume?: Maybe<Scalars['String']>;
  removedTokens?: Maybe<Scalars['Float']>;
  ticker?: Maybe<Scalars['String']>;
  totalSupply?: Maybe<Scalars['Float']>;
};

export type CnvDataOutput = {
  __typename?: 'cnvDataOutput';
  code?: Maybe<Scalars['Int']>;
  data?: Maybe<CnvData>;
  msg?: Maybe<Scalars['String']>;
};

/** get BondSold events from AccrualBondsV1 */
export type LogAccrualBondsV1_BondSold = {
  __typename?: 'logAccrualBondsV1_BondSold';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  inputAmount?: Maybe<Scalars['String']>;
  inputToken?: Maybe<Scalars['String']>;
  method?: Maybe<Scalars['String']>;
  output?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['numeric']>;
  to?: Maybe<Scalars['String']>;
  txBlockNumber?: Maybe<Scalars['numeric']>;
  txHash?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};

/** Boolean expression to filter rows from the table "logAccrualBondsV1_BondSold". All fields are combined with a logical 'AND'. */
export type LogAccrualBondsV1_BondSold_Bool_Exp = {
  _and?: InputMaybe<Array<LogAccrualBondsV1_BondSold_Bool_Exp>>;
  _not?: InputMaybe<LogAccrualBondsV1_BondSold_Bool_Exp>;
  _or?: InputMaybe<Array<LogAccrualBondsV1_BondSold_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  inputAmount?: InputMaybe<String_Comparison_Exp>;
  inputToken?: InputMaybe<String_Comparison_Exp>;
  method?: InputMaybe<String_Comparison_Exp>;
  output?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Numeric_Comparison_Exp>;
  to?: InputMaybe<String_Comparison_Exp>;
  txBlockNumber?: InputMaybe<Numeric_Comparison_Exp>;
  txHash?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** Ordering options when selecting data from "logAccrualBondsV1_BondSold". */
export type LogAccrualBondsV1_BondSold_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  inputAmount?: InputMaybe<Order_By>;
  inputToken?: InputMaybe<Order_By>;
  method?: InputMaybe<Order_By>;
  output?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  txBlockNumber?: InputMaybe<Order_By>;
  txHash?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

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
  UpdatedAt = 'updated_at'
}

/** get daily cnv metrics */
export type LogCnvData = {
  __typename?: 'logCnvData';
  chainID: Scalars['String'];
  circulatingSupply?: Maybe<Scalars['numeric']>;
  contract: Scalars['String'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  last?: Maybe<Scalars['numeric']>;
  marketCap?: Maybe<Scalars['numeric']>;
  removedTokens?: Maybe<Scalars['numeric']>;
  ticker: Scalars['String'];
  totalSupply?: Maybe<Scalars['numeric']>;
  updated_at: Scalars['timestamptz'];
};

/** Boolean expression to filter rows from the table "logCnvData". All fields are combined with a logical 'AND'. */
export type LogCnvData_Bool_Exp = {
  _and?: InputMaybe<Array<LogCnvData_Bool_Exp>>;
  _not?: InputMaybe<LogCnvData_Bool_Exp>;
  _or?: InputMaybe<Array<LogCnvData_Bool_Exp>>;
  chainID?: InputMaybe<String_Comparison_Exp>;
  circulatingSupply?: InputMaybe<Numeric_Comparison_Exp>;
  contract?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  last?: InputMaybe<Numeric_Comparison_Exp>;
  marketCap?: InputMaybe<Numeric_Comparison_Exp>;
  removedTokens?: InputMaybe<Numeric_Comparison_Exp>;
  ticker?: InputMaybe<String_Comparison_Exp>;
  totalSupply?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** Ordering options when selecting data from "logCnvData". */
export type LogCnvData_Order_By = {
  chainID?: InputMaybe<Order_By>;
  circulatingSupply?: InputMaybe<Order_By>;
  contract?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last?: InputMaybe<Order_By>;
  marketCap?: InputMaybe<Order_By>;
  removedTokens?: InputMaybe<Order_By>;
  ticker?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

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
  UpdatedAt = 'updated_at'
}

/** get Transfer events for Staking V1 */
export type LogStakingV1 = {
  __typename?: 'logStakingV1';
  amountLocked?: Maybe<Scalars['numeric']>;
  created_at: Scalars['timestamptz'];
  from?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  lockedUntil?: Maybe<Scalars['numeric']>;
  poolID?: Maybe<Scalars['numeric']>;
  sold?: Maybe<Scalars['Boolean']>;
  to?: Maybe<Scalars['String']>;
  tokenID?: Maybe<Scalars['numeric']>;
  txBlockNumber?: Maybe<Scalars['numeric']>;
  txHash?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};

/** get Lock events from Staking V1 */
export type LogStakingV1_Lock = {
  __typename?: 'logStakingV1_Lock';
  amount?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  deposit?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  maturity?: Maybe<Scalars['numeric']>;
  poolBalance?: Maybe<Scalars['String']>;
  poolExcessRatio?: Maybe<Scalars['numeric']>;
  poolG?: Maybe<Scalars['numeric']>;
  poolID?: Maybe<Scalars['numeric']>;
  poolRewardsPerShare?: Maybe<Scalars['String']>;
  poolSupply?: Maybe<Scalars['String']>;
  poolTerm?: Maybe<Scalars['numeric']>;
  positionID?: Maybe<Scalars['numeric']>;
  rewardDebt?: Maybe<Scalars['String']>;
  shares?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['numeric']>;
  to?: Maybe<Scalars['String']>;
  txBlockNumber?: Maybe<Scalars['numeric']>;
  txHash?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};

/** Boolean expression to filter rows from the table "logStakingV1_Lock". All fields are combined with a logical 'AND'. */
export type LogStakingV1_Lock_Bool_Exp = {
  _and?: InputMaybe<Array<LogStakingV1_Lock_Bool_Exp>>;
  _not?: InputMaybe<LogStakingV1_Lock_Bool_Exp>;
  _or?: InputMaybe<Array<LogStakingV1_Lock_Bool_Exp>>;
  amount?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deposit?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  maturity?: InputMaybe<Numeric_Comparison_Exp>;
  poolBalance?: InputMaybe<String_Comparison_Exp>;
  poolExcessRatio?: InputMaybe<Numeric_Comparison_Exp>;
  poolG?: InputMaybe<Numeric_Comparison_Exp>;
  poolID?: InputMaybe<Numeric_Comparison_Exp>;
  poolRewardsPerShare?: InputMaybe<String_Comparison_Exp>;
  poolSupply?: InputMaybe<String_Comparison_Exp>;
  poolTerm?: InputMaybe<Numeric_Comparison_Exp>;
  positionID?: InputMaybe<Numeric_Comparison_Exp>;
  rewardDebt?: InputMaybe<String_Comparison_Exp>;
  shares?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Numeric_Comparison_Exp>;
  to?: InputMaybe<String_Comparison_Exp>;
  txBlockNumber?: InputMaybe<Numeric_Comparison_Exp>;
  txHash?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** Ordering options when selecting data from "logStakingV1_Lock". */
export type LogStakingV1_Lock_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deposit?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maturity?: InputMaybe<Order_By>;
  poolBalance?: InputMaybe<Order_By>;
  poolExcessRatio?: InputMaybe<Order_By>;
  poolG?: InputMaybe<Order_By>;
  poolID?: InputMaybe<Order_By>;
  poolRewardsPerShare?: InputMaybe<Order_By>;
  poolSupply?: InputMaybe<Order_By>;
  poolTerm?: InputMaybe<Order_By>;
  positionID?: InputMaybe<Order_By>;
  rewardDebt?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  txBlockNumber?: InputMaybe<Order_By>;
  txHash?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

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
  UpdatedAt = 'updated_at'
}

/** get PoolRewarded events from staking V1  */
export type LogStakingV1_PoolRewarded = {
  __typename?: 'logStakingV1_PoolRewarded';
  balance?: Maybe<Scalars['String']>;
  baseObligation?: Maybe<Scalars['String']>;
  base_vAPR?: Maybe<Scalars['numeric']>;
  created_at: Scalars['timestamptz'];
  excessObligation?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  poolID?: Maybe<Scalars['numeric']>;
  to?: Maybe<Scalars['String']>;
  txBlockNumber?: Maybe<Scalars['numeric']>;
  txHash?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};

/** Boolean expression to filter rows from the table "logStakingV1_PoolRewarded". All fields are combined with a logical 'AND'. */
export type LogStakingV1_PoolRewarded_Bool_Exp = {
  _and?: InputMaybe<Array<LogStakingV1_PoolRewarded_Bool_Exp>>;
  _not?: InputMaybe<LogStakingV1_PoolRewarded_Bool_Exp>;
  _or?: InputMaybe<Array<LogStakingV1_PoolRewarded_Bool_Exp>>;
  balance?: InputMaybe<String_Comparison_Exp>;
  baseObligation?: InputMaybe<String_Comparison_Exp>;
  base_vAPR?: InputMaybe<Numeric_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  excessObligation?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  poolID?: InputMaybe<Numeric_Comparison_Exp>;
  to?: InputMaybe<String_Comparison_Exp>;
  txBlockNumber?: InputMaybe<Numeric_Comparison_Exp>;
  txHash?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** Ordering options when selecting data from "logStakingV1_PoolRewarded". */
export type LogStakingV1_PoolRewarded_Order_By = {
  balance?: InputMaybe<Order_By>;
  baseObligation?: InputMaybe<Order_By>;
  base_vAPR?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  excessObligation?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  poolID?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  txBlockNumber?: InputMaybe<Order_By>;
  txHash?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

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
  UpdatedAt = 'updated_at'
}

/** Boolean expression to filter rows from the table "logStakingV1". All fields are combined with a logical 'AND'. */
export type LogStakingV1_Bool_Exp = {
  _and?: InputMaybe<Array<LogStakingV1_Bool_Exp>>;
  _not?: InputMaybe<LogStakingV1_Bool_Exp>;
  _or?: InputMaybe<Array<LogStakingV1_Bool_Exp>>;
  amountLocked?: InputMaybe<Numeric_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  from?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  lockedUntil?: InputMaybe<Numeric_Comparison_Exp>;
  poolID?: InputMaybe<Numeric_Comparison_Exp>;
  sold?: InputMaybe<Boolean_Comparison_Exp>;
  to?: InputMaybe<String_Comparison_Exp>;
  tokenID?: InputMaybe<Numeric_Comparison_Exp>;
  txBlockNumber?: InputMaybe<Numeric_Comparison_Exp>;
  txHash?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** Ordering options when selecting data from "logStakingV1". */
export type LogStakingV1_Order_By = {
  amountLocked?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lockedUntil?: InputMaybe<Order_By>;
  poolID?: InputMaybe<Order_By>;
  sold?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  tokenID?: InputMaybe<Order_By>;
  txBlockNumber?: InputMaybe<Order_By>;
  txHash?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

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
  UpdatedAt = 'updated_at'
}

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

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
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  cnvData?: Maybe<CnvDataOutput>;
  /** fetch data from the table: "logAccrualBondsV1_BondSold" */
  logAccrualBondsV1_BondSold: Array<LogAccrualBondsV1_BondSold>;
  /** fetch data from the table: "logAccrualBondsV1_BondSold" using primary key columns */
  logAccrualBondsV1_BondSold_by_pk?: Maybe<LogAccrualBondsV1_BondSold>;
  /** fetch data from the table: "logCnvData" */
  logCnvData: Array<LogCnvData>;
  /** fetch data from the table: "logCnvData" using primary key columns */
  logCnvData_by_pk?: Maybe<LogCnvData>;
  /** fetch data from the table: "logStakingV1" */
  logStakingV1: Array<LogStakingV1>;
  /** fetch data from the table: "logStakingV1_Lock" */
  logStakingV1_Lock: Array<LogStakingV1_Lock>;
  /** fetch data from the table: "logStakingV1_Lock" using primary key columns */
  logStakingV1_Lock_by_pk?: Maybe<LogStakingV1_Lock>;
  /** fetch data from the table: "logStakingV1_PoolRewarded" */
  logStakingV1_PoolRewarded: Array<LogStakingV1_PoolRewarded>;
  /** fetch data from the table: "logStakingV1_PoolRewarded" using primary key columns */
  logStakingV1_PoolRewarded_by_pk?: Maybe<LogStakingV1_PoolRewarded>;
  /** fetch data from the table: "logStakingV1" using primary key columns */
  logStakingV1_by_pk?: Maybe<LogStakingV1>;
  /** fetch data from the table: "treasury" */
  treasury: Array<Treasury>;
  /** fetch data from the table: "treasury" using primary key columns */
  treasury_by_pk?: Maybe<Treasury>;
};


export type Query_RootLogAccrualBondsV1_BondSoldArgs = {
  distinct_on?: InputMaybe<Array<LogAccrualBondsV1_BondSold_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<LogAccrualBondsV1_BondSold_Order_By>>;
  where?: InputMaybe<LogAccrualBondsV1_BondSold_Bool_Exp>;
};


export type Query_RootLogAccrualBondsV1_BondSold_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootLogCnvDataArgs = {
  distinct_on?: InputMaybe<Array<LogCnvData_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<LogCnvData_Order_By>>;
  where?: InputMaybe<LogCnvData_Bool_Exp>;
};


export type Query_RootLogCnvData_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootLogStakingV1Args = {
  distinct_on?: InputMaybe<Array<LogStakingV1_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<LogStakingV1_Order_By>>;
  where?: InputMaybe<LogStakingV1_Bool_Exp>;
};


export type Query_RootLogStakingV1_LockArgs = {
  distinct_on?: InputMaybe<Array<LogStakingV1_Lock_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<LogStakingV1_Lock_Order_By>>;
  where?: InputMaybe<LogStakingV1_Lock_Bool_Exp>;
};


export type Query_RootLogStakingV1_Lock_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootLogStakingV1_PoolRewardedArgs = {
  distinct_on?: InputMaybe<Array<LogStakingV1_PoolRewarded_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<LogStakingV1_PoolRewarded_Order_By>>;
  where?: InputMaybe<LogStakingV1_PoolRewarded_Bool_Exp>;
};


export type Query_RootLogStakingV1_PoolRewarded_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootLogStakingV1_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootTreasuryArgs = {
  distinct_on?: InputMaybe<Array<Treasury_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Treasury_Order_By>>;
  where?: InputMaybe<Treasury_Bool_Exp>;
};


export type Query_RootTreasury_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "logAccrualBondsV1_BondSold" */
  logAccrualBondsV1_BondSold: Array<LogAccrualBondsV1_BondSold>;
  /** fetch data from the table: "logAccrualBondsV1_BondSold" using primary key columns */
  logAccrualBondsV1_BondSold_by_pk?: Maybe<LogAccrualBondsV1_BondSold>;
  /** fetch data from the table: "logCnvData" */
  logCnvData: Array<LogCnvData>;
  /** fetch data from the table: "logCnvData" using primary key columns */
  logCnvData_by_pk?: Maybe<LogCnvData>;
  /** fetch data from the table: "logStakingV1" */
  logStakingV1: Array<LogStakingV1>;
  /** fetch data from the table: "logStakingV1_Lock" */
  logStakingV1_Lock: Array<LogStakingV1_Lock>;
  /** fetch data from the table: "logStakingV1_Lock" using primary key columns */
  logStakingV1_Lock_by_pk?: Maybe<LogStakingV1_Lock>;
  /** fetch data from the table: "logStakingV1_PoolRewarded" */
  logStakingV1_PoolRewarded: Array<LogStakingV1_PoolRewarded>;
  /** fetch data from the table: "logStakingV1_PoolRewarded" using primary key columns */
  logStakingV1_PoolRewarded_by_pk?: Maybe<LogStakingV1_PoolRewarded>;
  /** fetch data from the table: "logStakingV1" using primary key columns */
  logStakingV1_by_pk?: Maybe<LogStakingV1>;
  /** fetch data from the table: "treasury" */
  treasury: Array<Treasury>;
  /** fetch data from the table: "treasury" using primary key columns */
  treasury_by_pk?: Maybe<Treasury>;
};


export type Subscription_RootLogAccrualBondsV1_BondSoldArgs = {
  distinct_on?: InputMaybe<Array<LogAccrualBondsV1_BondSold_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<LogAccrualBondsV1_BondSold_Order_By>>;
  where?: InputMaybe<LogAccrualBondsV1_BondSold_Bool_Exp>;
};


export type Subscription_RootLogAccrualBondsV1_BondSold_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootLogCnvDataArgs = {
  distinct_on?: InputMaybe<Array<LogCnvData_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<LogCnvData_Order_By>>;
  where?: InputMaybe<LogCnvData_Bool_Exp>;
};


export type Subscription_RootLogCnvData_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootLogStakingV1Args = {
  distinct_on?: InputMaybe<Array<LogStakingV1_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<LogStakingV1_Order_By>>;
  where?: InputMaybe<LogStakingV1_Bool_Exp>;
};


export type Subscription_RootLogStakingV1_LockArgs = {
  distinct_on?: InputMaybe<Array<LogStakingV1_Lock_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<LogStakingV1_Lock_Order_By>>;
  where?: InputMaybe<LogStakingV1_Lock_Bool_Exp>;
};


export type Subscription_RootLogStakingV1_Lock_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootLogStakingV1_PoolRewardedArgs = {
  distinct_on?: InputMaybe<Array<LogStakingV1_PoolRewarded_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<LogStakingV1_PoolRewarded_Order_By>>;
  where?: InputMaybe<LogStakingV1_PoolRewarded_Bool_Exp>;
};


export type Subscription_RootLogStakingV1_PoolRewarded_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootLogStakingV1_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootTreasuryArgs = {
  distinct_on?: InputMaybe<Array<Treasury_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Treasury_Order_By>>;
  where?: InputMaybe<Treasury_Bool_Exp>;
};


export type Subscription_RootTreasury_By_PkArgs = {
  id: Scalars['uuid'];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** list of assets where value are updated with cronjob */
export type Treasury = {
  __typename?: 'treasury';
  amount?: Maybe<Scalars['numeric']>;
  chainId?: Maybe<Scalars['String']>;
  contract: Scalars['String'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  rewards?: Maybe<Scalars['numeric']>;
  total?: Maybe<Scalars['numeric']>;
  updated_at: Scalars['timestamptz'];
  value?: Maybe<Scalars['numeric']>;
};

/** Boolean expression to filter rows from the table "treasury". All fields are combined with a logical 'AND'. */
export type Treasury_Bool_Exp = {
  _and?: InputMaybe<Array<Treasury_Bool_Exp>>;
  _not?: InputMaybe<Treasury_Bool_Exp>;
  _or?: InputMaybe<Array<Treasury_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  chainId?: InputMaybe<String_Comparison_Exp>;
  contract?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  rewards?: InputMaybe<Numeric_Comparison_Exp>;
  total?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** Ordering options when selecting data from "treasury". */
export type Treasury_Order_By = {
  amount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  contract?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  rewards?: InputMaybe<Order_By>;
  total?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

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
  Name = 'name',
  /** column name */
  Rewards = 'rewards',
  /** column name */
  Total = 'total',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type Get_Last_Base_VaprQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_Last_Base_VaprQuery = { __typename?: 'query_root', logStakingV1_PoolRewarded: Array<{ __typename?: 'logStakingV1_PoolRewarded', base_vAPR?: any | null }> };

export type Get_Last_Poolid_VaprQueryVariables = Exact<{
  poolID?: InputMaybe<Scalars['numeric']>;
}>;


export type Get_Last_Poolid_VaprQuery = { __typename?: 'query_root', logStakingV1_PoolRewarded: Array<{ __typename?: 'logStakingV1_PoolRewarded', base_vAPR?: any | null }> };

export type Get_Amm_Cnv_PriceQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_Amm_Cnv_PriceQuery = { __typename?: 'query_root', cnvData?: { __typename?: 'cnvDataOutput', data?: { __typename?: 'cnvData', last?: number | null, ticker?: string | null } | null } | null };

export type Get_Amm_Cnv_InfosQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_Amm_Cnv_InfosQuery = { __typename?: 'query_root', cnvData?: { __typename?: 'cnvDataOutput', data?: { __typename?: 'cnvData', last?: number | null, marketCap?: number | null, totalSupply?: number | null, circulatingSupply?: number | null } | null } | null };

export type Get_Stackingv1_Last100_EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_Stackingv1_Last100_EventsQuery = { __typename?: 'query_root', logStakingV1: Array<{ __typename?: 'logStakingV1', txBlockNumber?: any | null, txHash?: string | null, poolID?: any | null, tokenID?: any | null, sold?: boolean | null, from?: string | null, to?: string | null, amountLocked?: any | null, lockedUntil?: any | null }> };

export type Get_Stackingv1_By_Pool_IdQueryVariables = Exact<{
  poolID?: InputMaybe<Numeric_Comparison_Exp>;
}>;


export type Get_Stackingv1_By_Pool_IdQuery = { __typename?: 'query_root', logStakingV1: Array<{ __typename?: 'logStakingV1', txBlockNumber?: any | null, txHash?: string | null, poolID?: any | null, tokenID?: any | null, sold?: boolean | null, from?: string | null, to?: string | null, amountLocked?: any | null, lockedUntil?: any | null }> };

export type Get_Stakingv1_Last100_LockQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_Stakingv1_Last100_LockQuery = { __typename?: 'query_root', logStakingV1_Lock: Array<{ __typename?: 'logStakingV1_Lock', txHash?: string | null, txBlockNumber?: any | null, poolID?: any | null, positionID?: any | null, to?: string | null, amount?: string | null }> };

export type Get_Accrualbondv1_Last10_SoldQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_Accrualbondv1_Last10_SoldQuery = { __typename?: 'query_root', logAccrualBondsV1_BondSold: Array<{ __typename?: 'logAccrualBondsV1_BondSold', timestamp?: any | null, inputToken?: string | null, inputAmount?: string | null, method?: string | null, output?: string | null }> };

export type Get_TreasuryQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_TreasuryQuery = { __typename?: 'query_root', treasury: Array<{ __typename?: 'treasury', updated_at: any, contract: string, chainId?: string | null, name: string, amount?: any | null, value?: any | null, total?: any | null }> };


export const Get_Last_Base_VaprDocument = `
    query GET_LAST_BASE_VAPR {
  logStakingV1_PoolRewarded {
    base_vAPR
  }
}
    `;
export const useGet_Last_Base_VaprQuery = <
      TData = Get_Last_Base_VaprQuery,
      TError = unknown
    >(
      variables?: Get_Last_Base_VaprQueryVariables,
      options?: UseQueryOptions<Get_Last_Base_VaprQuery, TError, TData>
    ) =>
    useQuery<Get_Last_Base_VaprQuery, TError, TData>(
      variables === undefined ? ['GET_LAST_BASE_VAPR'] : ['GET_LAST_BASE_VAPR', variables],
      fetcher<Get_Last_Base_VaprQuery, Get_Last_Base_VaprQueryVariables>(Get_Last_Base_VaprDocument, variables),
      options
    );
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
    `;
export const useGet_Last_Poolid_VaprQuery = <
      TData = Get_Last_Poolid_VaprQuery,
      TError = unknown
    >(
      variables?: Get_Last_Poolid_VaprQueryVariables,
      options?: UseQueryOptions<Get_Last_Poolid_VaprQuery, TError, TData>
    ) =>
    useQuery<Get_Last_Poolid_VaprQuery, TError, TData>(
      variables === undefined ? ['GET_LAST_POOLID_VAPR'] : ['GET_LAST_POOLID_VAPR', variables],
      fetcher<Get_Last_Poolid_VaprQuery, Get_Last_Poolid_VaprQueryVariables>(Get_Last_Poolid_VaprDocument, variables),
      options
    );
export const Get_Amm_Cnv_PriceDocument = `
    query GET_AMM_CNV_PRICE {
  cnvData {
    data {
      last
      ticker
    }
  }
}
    `;
export const useGet_Amm_Cnv_PriceQuery = <
      TData = Get_Amm_Cnv_PriceQuery,
      TError = unknown
    >(
      variables?: Get_Amm_Cnv_PriceQueryVariables,
      options?: UseQueryOptions<Get_Amm_Cnv_PriceQuery, TError, TData>
    ) =>
    useQuery<Get_Amm_Cnv_PriceQuery, TError, TData>(
      variables === undefined ? ['GET_AMM_CNV_PRICE'] : ['GET_AMM_CNV_PRICE', variables],
      fetcher<Get_Amm_Cnv_PriceQuery, Get_Amm_Cnv_PriceQueryVariables>(Get_Amm_Cnv_PriceDocument, variables),
      options
    );
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
    `;
export const useGet_Amm_Cnv_InfosQuery = <
      TData = Get_Amm_Cnv_InfosQuery,
      TError = unknown
    >(
      variables?: Get_Amm_Cnv_InfosQueryVariables,
      options?: UseQueryOptions<Get_Amm_Cnv_InfosQuery, TError, TData>
    ) =>
    useQuery<Get_Amm_Cnv_InfosQuery, TError, TData>(
      variables === undefined ? ['GET_AMM_CNV_INFOS'] : ['GET_AMM_CNV_INFOS', variables],
      fetcher<Get_Amm_Cnv_InfosQuery, Get_Amm_Cnv_InfosQueryVariables>(Get_Amm_Cnv_InfosDocument, variables),
      options
    );
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
    `;
export const useGet_Stackingv1_Last100_EventsQuery = <
      TData = Get_Stackingv1_Last100_EventsQuery,
      TError = unknown
    >(
      variables?: Get_Stackingv1_Last100_EventsQueryVariables,
      options?: UseQueryOptions<Get_Stackingv1_Last100_EventsQuery, TError, TData>
    ) =>
    useQuery<Get_Stackingv1_Last100_EventsQuery, TError, TData>(
      variables === undefined ? ['GET_STACKINGV1_LAST100_EVENTS'] : ['GET_STACKINGV1_LAST100_EVENTS', variables],
      fetcher<Get_Stackingv1_Last100_EventsQuery, Get_Stackingv1_Last100_EventsQueryVariables>(Get_Stackingv1_Last100_EventsDocument, variables),
      options
    );
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
    `;
export const useGet_Stackingv1_By_Pool_IdQuery = <
      TData = Get_Stackingv1_By_Pool_IdQuery,
      TError = unknown
    >(
      variables?: Get_Stackingv1_By_Pool_IdQueryVariables,
      options?: UseQueryOptions<Get_Stackingv1_By_Pool_IdQuery, TError, TData>
    ) =>
    useQuery<Get_Stackingv1_By_Pool_IdQuery, TError, TData>(
      variables === undefined ? ['GET_STACKINGV1_BY_POOL_ID'] : ['GET_STACKINGV1_BY_POOL_ID', variables],
      fetcher<Get_Stackingv1_By_Pool_IdQuery, Get_Stackingv1_By_Pool_IdQueryVariables>(Get_Stackingv1_By_Pool_IdDocument, variables),
      options
    );
export const Get_Stakingv1_Last100_LockDocument = `
    query GET_STAKINGV1_LAST100_LOCK {
  logStakingV1_Lock {
    txHash
    txBlockNumber
    poolID
    positionID
    to
    amount
  }
}
    `;
export const useGet_Stakingv1_Last100_LockQuery = <
      TData = Get_Stakingv1_Last100_LockQuery,
      TError = unknown
    >(
      variables?: Get_Stakingv1_Last100_LockQueryVariables,
      options?: UseQueryOptions<Get_Stakingv1_Last100_LockQuery, TError, TData>
    ) =>
    useQuery<Get_Stakingv1_Last100_LockQuery, TError, TData>(
      variables === undefined ? ['GET_STAKINGV1_LAST100_LOCK'] : ['GET_STAKINGV1_LAST100_LOCK', variables],
      fetcher<Get_Stakingv1_Last100_LockQuery, Get_Stakingv1_Last100_LockQueryVariables>(Get_Stakingv1_Last100_LockDocument, variables),
      options
    );
export const Get_Accrualbondv1_Last10_SoldDocument = `
    query GET_ACCRUALBONDV1_LAST10_SOLD {
  logAccrualBondsV1_BondSold(order_by: {txBlockNumber: desc}, limit: 10) {
    timestamp
    inputToken
    inputAmount
    method
    output
  }
}
    `;
export const useGet_Accrualbondv1_Last10_SoldQuery = <
      TData = Get_Accrualbondv1_Last10_SoldQuery,
      TError = unknown
    >(
      variables?: Get_Accrualbondv1_Last10_SoldQueryVariables,
      options?: UseQueryOptions<Get_Accrualbondv1_Last10_SoldQuery, TError, TData>
    ) =>
    useQuery<Get_Accrualbondv1_Last10_SoldQuery, TError, TData>(
      variables === undefined ? ['GET_ACCRUALBONDV1_LAST10_SOLD'] : ['GET_ACCRUALBONDV1_LAST10_SOLD', variables],
      fetcher<Get_Accrualbondv1_Last10_SoldQuery, Get_Accrualbondv1_Last10_SoldQueryVariables>(Get_Accrualbondv1_Last10_SoldDocument, variables),
      options
    );
export const Get_TreasuryDocument = `
    query GET_TREASURY {
  treasury {
    updated_at
    contract
    chainId
    name
    amount
    value
    total
  }
}
    `;
export const useGet_TreasuryQuery = <
      TData = Get_TreasuryQuery,
      TError = unknown
    >(
      variables?: Get_TreasuryQueryVariables,
      options?: UseQueryOptions<Get_TreasuryQuery, TError, TData>
    ) =>
    useQuery<Get_TreasuryQuery, TError, TData>(
      variables === undefined ? ['GET_TREASURY'] : ['GET_TREASURY', variables],
      fetcher<Get_TreasuryQuery, Get_TreasuryQueryVariables>(Get_TreasuryDocument, variables),
      options
    );
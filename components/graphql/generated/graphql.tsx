import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
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

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root'
  /** delete data from the table: "test" */
  delete_test?: Maybe<Test_Mutation_Response>
  /** delete single row from the table: "test" */
  delete_test_by_pk?: Maybe<Test>
  /** insert data into the table: "test" */
  insert_test?: Maybe<Test_Mutation_Response>
  /** insert a single row into the table: "test" */
  insert_test_one?: Maybe<Test>
  /** update data of the table: "test" */
  update_test?: Maybe<Test_Mutation_Response>
  /** update single row of the table: "test" */
  update_test_by_pk?: Maybe<Test>
}

/** mutation root */
export type Mutation_RootDelete_TestArgs = {
  where: Test_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Test_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootInsert_TestArgs = {
  objects: Array<Test_Insert_Input>
  on_conflict?: InputMaybe<Test_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Test_OneArgs = {
  object: Test_Insert_Input
  on_conflict?: InputMaybe<Test_On_Conflict>
}

/** mutation root */
export type Mutation_RootUpdate_TestArgs = {
  _inc?: InputMaybe<Test_Inc_Input>
  _set?: InputMaybe<Test_Set_Input>
  where: Test_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Test_By_PkArgs = {
  _inc?: InputMaybe<Test_Inc_Input>
  _set?: InputMaybe<Test_Set_Input>
  pk_columns: Test_Pk_Columns_Input
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
  /** fetch data from the table: "test" */
  test: Array<Test>
  /** fetch aggregated fields from the table: "test" */
  test_aggregate: Test_Aggregate
  /** fetch data from the table: "test" using primary key columns */
  test_by_pk?: Maybe<Test>
}

export type Query_RootTestArgs = {
  distinct_on?: InputMaybe<Array<Test_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Test_Order_By>>
  where?: InputMaybe<Test_Bool_Exp>
}

export type Query_RootTest_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Test_Order_By>>
  where?: InputMaybe<Test_Bool_Exp>
}

export type Query_RootTest_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_Root = {
  __typename?: 'subscription_root'
  /** fetch data from the table: "test" */
  test: Array<Test>
  /** fetch aggregated fields from the table: "test" */
  test_aggregate: Test_Aggregate
  /** fetch data from the table: "test" using primary key columns */
  test_by_pk?: Maybe<Test>
}

export type Subscription_RootTestArgs = {
  distinct_on?: InputMaybe<Array<Test_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Test_Order_By>>
  where?: InputMaybe<Test_Bool_Exp>
}

export type Subscription_RootTest_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Test_Order_By>>
  where?: InputMaybe<Test_Bool_Exp>
}

export type Subscription_RootTest_By_PkArgs = {
  id: Scalars['uuid']
}

/**
 * test data
 *
 *
 * columns and relationships of "test"
 *
 */
export type Test = {
  __typename?: 'test'
  cnvAPY: Scalars['numeric']
  cnvIndex: Scalars['numeric']
  cnvPrice: Scalars['numeric']
  created_at: Scalars['timestamptz']
  growthCNV24h: Scalars['numeric']
  growthCNV30d: Scalars['numeric']
  id: Scalars['uuid']
  updated_at: Scalars['timestamptz']
}

/** aggregated selection of "test" */
export type Test_Aggregate = {
  __typename?: 'test_aggregate'
  aggregate?: Maybe<Test_Aggregate_Fields>
  nodes: Array<Test>
}

/** aggregate fields of "test" */
export type Test_Aggregate_Fields = {
  __typename?: 'test_aggregate_fields'
  avg?: Maybe<Test_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Test_Max_Fields>
  min?: Maybe<Test_Min_Fields>
  stddev?: Maybe<Test_Stddev_Fields>
  stddev_pop?: Maybe<Test_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Test_Stddev_Samp_Fields>
  sum?: Maybe<Test_Sum_Fields>
  var_pop?: Maybe<Test_Var_Pop_Fields>
  var_samp?: Maybe<Test_Var_Samp_Fields>
  variance?: Maybe<Test_Variance_Fields>
}

/** aggregate fields of "test" */
export type Test_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Test_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Test_Avg_Fields = {
  __typename?: 'test_avg_fields'
  cnvAPY?: Maybe<Scalars['Float']>
  cnvIndex?: Maybe<Scalars['Float']>
  cnvPrice?: Maybe<Scalars['Float']>
  growthCNV24h?: Maybe<Scalars['Float']>
  growthCNV30d?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "test". All fields are combined with a logical 'AND'. */
export type Test_Bool_Exp = {
  _and?: InputMaybe<Array<Test_Bool_Exp>>
  _not?: InputMaybe<Test_Bool_Exp>
  _or?: InputMaybe<Array<Test_Bool_Exp>>
  cnvAPY?: InputMaybe<Numeric_Comparison_Exp>
  cnvIndex?: InputMaybe<Numeric_Comparison_Exp>
  cnvPrice?: InputMaybe<Numeric_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  growthCNV24h?: InputMaybe<Numeric_Comparison_Exp>
  growthCNV30d?: InputMaybe<Numeric_Comparison_Exp>
  id?: InputMaybe<Uuid_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "test" */
export enum Test_Constraint {
  /** unique or primary key constraint */
  TestPkey = 'test_pkey',
}

/** input type for incrementing numeric columns in table "test" */
export type Test_Inc_Input = {
  cnvAPY?: InputMaybe<Scalars['numeric']>
  cnvIndex?: InputMaybe<Scalars['numeric']>
  cnvPrice?: InputMaybe<Scalars['numeric']>
  growthCNV24h?: InputMaybe<Scalars['numeric']>
  growthCNV30d?: InputMaybe<Scalars['numeric']>
}

/** input type for inserting data into table "test" */
export type Test_Insert_Input = {
  cnvAPY?: InputMaybe<Scalars['numeric']>
  cnvIndex?: InputMaybe<Scalars['numeric']>
  cnvPrice?: InputMaybe<Scalars['numeric']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  growthCNV24h?: InputMaybe<Scalars['numeric']>
  growthCNV30d?: InputMaybe<Scalars['numeric']>
  id?: InputMaybe<Scalars['uuid']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Test_Max_Fields = {
  __typename?: 'test_max_fields'
  cnvAPY?: Maybe<Scalars['numeric']>
  cnvIndex?: Maybe<Scalars['numeric']>
  cnvPrice?: Maybe<Scalars['numeric']>
  created_at?: Maybe<Scalars['timestamptz']>
  growthCNV24h?: Maybe<Scalars['numeric']>
  growthCNV30d?: Maybe<Scalars['numeric']>
  id?: Maybe<Scalars['uuid']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** aggregate min on columns */
export type Test_Min_Fields = {
  __typename?: 'test_min_fields'
  cnvAPY?: Maybe<Scalars['numeric']>
  cnvIndex?: Maybe<Scalars['numeric']>
  cnvPrice?: Maybe<Scalars['numeric']>
  created_at?: Maybe<Scalars['timestamptz']>
  growthCNV24h?: Maybe<Scalars['numeric']>
  growthCNV30d?: Maybe<Scalars['numeric']>
  id?: Maybe<Scalars['uuid']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** response of any mutation on the table "test" */
export type Test_Mutation_Response = {
  __typename?: 'test_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Test>
}

/** on conflict condition type for table "test" */
export type Test_On_Conflict = {
  constraint: Test_Constraint
  update_columns?: Array<Test_Update_Column>
  where?: InputMaybe<Test_Bool_Exp>
}

/** Ordering options when selecting data from "test". */
export type Test_Order_By = {
  cnvAPY?: InputMaybe<Order_By>
  cnvIndex?: InputMaybe<Order_By>
  cnvPrice?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  growthCNV24h?: InputMaybe<Order_By>
  growthCNV30d?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
}

/** primary key columns input for table: test */
export type Test_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "test" */
export enum Test_Select_Column {
  /** column name */
  CnvApy = 'cnvAPY',
  /** column name */
  CnvIndex = 'cnvIndex',
  /** column name */
  CnvPrice = 'cnvPrice',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GrowthCnv24h = 'growthCNV24h',
  /** column name */
  GrowthCnv30d = 'growthCNV30d',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "test" */
export type Test_Set_Input = {
  cnvAPY?: InputMaybe<Scalars['numeric']>
  cnvIndex?: InputMaybe<Scalars['numeric']>
  cnvPrice?: InputMaybe<Scalars['numeric']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  growthCNV24h?: InputMaybe<Scalars['numeric']>
  growthCNV30d?: InputMaybe<Scalars['numeric']>
  id?: InputMaybe<Scalars['uuid']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
}

/** aggregate stddev on columns */
export type Test_Stddev_Fields = {
  __typename?: 'test_stddev_fields'
  cnvAPY?: Maybe<Scalars['Float']>
  cnvIndex?: Maybe<Scalars['Float']>
  cnvPrice?: Maybe<Scalars['Float']>
  growthCNV24h?: Maybe<Scalars['Float']>
  growthCNV30d?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Test_Stddev_Pop_Fields = {
  __typename?: 'test_stddev_pop_fields'
  cnvAPY?: Maybe<Scalars['Float']>
  cnvIndex?: Maybe<Scalars['Float']>
  cnvPrice?: Maybe<Scalars['Float']>
  growthCNV24h?: Maybe<Scalars['Float']>
  growthCNV30d?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Test_Stddev_Samp_Fields = {
  __typename?: 'test_stddev_samp_fields'
  cnvAPY?: Maybe<Scalars['Float']>
  cnvIndex?: Maybe<Scalars['Float']>
  cnvPrice?: Maybe<Scalars['Float']>
  growthCNV24h?: Maybe<Scalars['Float']>
  growthCNV30d?: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Test_Sum_Fields = {
  __typename?: 'test_sum_fields'
  cnvAPY?: Maybe<Scalars['numeric']>
  cnvIndex?: Maybe<Scalars['numeric']>
  cnvPrice?: Maybe<Scalars['numeric']>
  growthCNV24h?: Maybe<Scalars['numeric']>
  growthCNV30d?: Maybe<Scalars['numeric']>
}

/** update columns of table "test" */
export enum Test_Update_Column {
  /** column name */
  CnvApy = 'cnvAPY',
  /** column name */
  CnvIndex = 'cnvIndex',
  /** column name */
  CnvPrice = 'cnvPrice',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GrowthCnv24h = 'growthCNV24h',
  /** column name */
  GrowthCnv30d = 'growthCNV30d',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** aggregate var_pop on columns */
export type Test_Var_Pop_Fields = {
  __typename?: 'test_var_pop_fields'
  cnvAPY?: Maybe<Scalars['Float']>
  cnvIndex?: Maybe<Scalars['Float']>
  cnvPrice?: Maybe<Scalars['Float']>
  growthCNV24h?: Maybe<Scalars['Float']>
  growthCNV30d?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Test_Var_Samp_Fields = {
  __typename?: 'test_var_samp_fields'
  cnvAPY?: Maybe<Scalars['Float']>
  cnvIndex?: Maybe<Scalars['Float']>
  cnvPrice?: Maybe<Scalars['Float']>
  growthCNV24h?: Maybe<Scalars['Float']>
  growthCNV30d?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Test_Variance_Fields = {
  __typename?: 'test_variance_fields'
  cnvAPY?: Maybe<Scalars['Float']>
  cnvIndex?: Maybe<Scalars['Float']>
  cnvPrice?: Maybe<Scalars['Float']>
  growthCNV24h?: Maybe<Scalars['Float']>
  growthCNV30d?: Maybe<Scalars['Float']>
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

export type QueryTestQueryVariables = Exact<{ [key: string]: never }>

export type QueryTestQuery = {
  __typename?: 'query_root'
  test: Array<{
    __typename?: 'test'
    cnvAPY: any
    cnvIndex: any
    cnvPrice: any
    growthCNV24h: any
    growthCNV30d: any
  }>
}

export const QueryTestDocument = gql`
  query QueryTest {
    test {
      cnvAPY
      cnvIndex
      cnvPrice
      growthCNV24h
      growthCNV30d
    }
  }
`

/**
 * __useQueryTestQuery__
 *
 * To run a query within a React component, call `useQueryTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryTestQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryTestQuery(
  baseOptions?: Apollo.QueryHookOptions<QueryTestQuery, QueryTestQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<QueryTestQuery, QueryTestQueryVariables>(QueryTestDocument, options)
}
export function useQueryTestLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<QueryTestQuery, QueryTestQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<QueryTestQuery, QueryTestQueryVariables>(QueryTestDocument, options)
}
export type QueryTestQueryHookResult = ReturnType<typeof useQueryTestQuery>
export type QueryTestLazyQueryHookResult = ReturnType<typeof useQueryTestLazyQuery>
export type QueryTestQueryResult = Apollo.QueryResult<QueryTestQuery, QueryTestQueryVariables>

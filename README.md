# 🥄 Concave Frontend

This is the worlds best kept secret frontend monorepo

## Resources

Reading the following tools docs will help you navigate and develop in this repo

- [Next.js](https://nextjs.org/docs/basic-features)
- [wagmi](https://wagmi-xyz.vercel.app/)
- [Chakra UI](https://chakra-ui.com/)

## About

We have two main workspaces: `apps` and `libs`

### apps

- `cave`: main concave app, bond, swap etc
- `marketplace`: NFT Marketplace app

bootstraping a new concave app? put it in `/apps`

### libs

- `@concave/ui`: has all chakra-ui components + more, you should add shared more abstracted components here, let use case specifics for each app components folder
- `@concave/icon`: has all chakra-ui icons + more

create more shared libs as you feel necessary in `/libs`

# Setting up Development

Prerequisites: [Node](https://nodejs.org/en/download/), [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

> clone/fork:

```bash
git clone https://github.com/ConcaveFi/concave-frontend.git
cd concave-frontend
cp -i apps/cave/.env.example apps/cave/.env

# Install dependencies
yarn

# Start and watch
yarn dev:cave
```

running dev this way will build and watch dependencies, this means you can edit `@concave/ui` working on `apps/cave` and it will just work

# Graphql Concave-api

> Schema crafted with Hasura on frontend using Codegen + React-Query

## Schema on Hasura

The graphql schema got different sources (see on concave-api)

- POSTGRES ex: creating a table on postgres, Hasura will crafted for you the graphql
- LAMBDA ex: create a lambda bind this one in Hasura Action to be a part of the schema

## Import the Queries/Mutations into the frontend

- Create your Query/Mutation on Hasura
- Close concave-fontend (not running locally)
- Copie them into the appropriate file inside `apps/cave/graphql` as a `.gql` file
- Then enter in your terminal

```sh
cd app/cave
yarn gen
```

> You don't need to "gen" at build time, but only when a new Query is in
> This will generate or update 2 files inside `apps/cave/graphql/generated`
> This is specific for React-Query (see config `codegen.yml`) with his own fetcher for Hasura
> You can now import generated Hooks, Query or Mutation from `graphql/generated/graphql`

## Summary for graphql

- Craft you query on hasura
- Import the query inside `apps/cave/graphql` as a `.gql` file or inside an other one
- Do `yarn gen` from `app/cave`

Example for a react-query hook on frontend

```js
import {useGet_Stackingv1_Last100_EventsQuery} from 'graphql/generated/graphql'

...

const { status, data, error, isFetching } = useGet_Stackingv1_Last100_EventsQuery()
console.log('react query', status, data, error, isFetching)
```

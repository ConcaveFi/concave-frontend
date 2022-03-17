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

> dev with hasura on localhost with docker-compose

Please change `lib/hasura/admin.ts`

```js
const HasuraUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8080/v1/graphql'
    : (process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string)
// const HasuraUrl = (process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string)
```

> clone/fork:

```bash
git clone https://github.com/ConcaveFi/concave-frontend.git
cd concave-frontend

# create and config env.local file following env.example on the app you wanna run
# if you're on the vercel team, you can also run `vercel env pull` on the desired app folder

# Install dependencies
yarn

# Start development server
yarn dev:<app_name> # eg. yarn dev:cave
```

running dev this way will build and watch dependencies, this means you can edit `@concave/ui` working on `apps/cave` and it will just work

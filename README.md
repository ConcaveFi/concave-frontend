# 🥄 Concave Frontend

This is the worlds best kept secret frontend monorepo

## Resources

Reading the following tools docs will help you navigate and develop in this repo

- [Next.js](https://nextjs.org/docs/basic-features)
- [wagmi](https://wagmi-xyz.vercel.app/)
- [Chakra UI](https://chakra-ui.com/)

## Turbo Monorepo

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

```bash
git clone https://github.com/ConcaveFi/concave-frontend.git

# copy and config env.example (see teams members for apis keys)
cd concave-frontend
cp -i apps/cave/.env.example apps/cave/.env

# Install dependencies
yarn

# Start and watch
yarn dev:cave
```

import { motion } from 'framer-motion'

const goinUp = {
  hidden: { opacity: 0, y: '-50vh' },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '50vh' },
}

const goinDown = {
  hidden: { opacity: 0, y: '50vh' },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '-50vh' },
}

const pagesIndex = [
  '/treasury',
  '/smart-bonding',
  '/liquid-staking',
  '/positions',
  '/marketplace',
  '/gemswap',
  '/addliquidity',
  '/pools',
]

const getVariant = (prevPath, nextPath) => {
  return pagesIndex.indexOf(prevPath) < pagesIndex.indexOf(nextPath) ? goinUp : goinDown
}

export const withPageTransition = (Page) => {
  const PageTransition = ({ prevPath, path, ...pageProps }) => (
    <motion.main
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={getVariant(prevPath, path)}
      transition={{ type: 'linear', duration: 0.15 }}
      style={{ display: 'flex', flex: 1 }}
    >
      <Page {...pageProps} />
    </motion.main>
  )

  return PageTransition
}

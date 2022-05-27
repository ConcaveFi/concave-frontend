import { motion } from 'framer-motion'

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

/*
  this is not working right, but it's a start
*/
const getVariant = (prevPath, nextPath) => {
  const isGoingUp = pagesIndex.indexOf(prevPath) > pagesIndex.indexOf(nextPath)

  return {
    hidden: { opacity: 0, y: isGoingUp ? '25vh' : '-25vh' },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: isGoingUp ? '-25vh' : '25vh' },
  }
}

export const withPageTransition = (Page) => {
  const PageTransition = ({ prevPath, path, ...pageProps }) => (
    <motion.main
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={getVariant(prevPath, path)}
      transition={{ type: 'linear', duration: 0.1 }}
      style={{ display: 'flex', flex: 1 }}
    >
      <Page {...pageProps} />
    </motion.main>
  )

  PageTransition.Meta = Page.Meta
  PageTransition.Layout = Page.Layout

  return PageTransition
}

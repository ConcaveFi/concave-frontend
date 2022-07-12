import { motion } from 'framer-motion'

/*
  this is not working right, but it's a start
*/
const getVariant = () => {
  return {
    hidden: { opacity: 0, y: '25vh' },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '-25vh' },
  }
}

export const withPageTransition = (Page) => {
  const PageTransition = (pageProps) => (
    <motion.main
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={getVariant()}
      transition={{ type: 'linear', duration: 0.1 }}
      style={{ display: 'flex', flex: 1, width: '100%' }}
    >
      <Page {...pageProps} />
    </motion.main>
  )

  PageTransition.Meta = Page.Meta
  PageTransition.Layout = Page.Layout

  return PageTransition
}

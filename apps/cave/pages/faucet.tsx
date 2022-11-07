import { useBreakpointValue } from '@concave/ui'
import { withPageTransition } from 'components/PageTransition'
import { LockedCNVChart } from 'components/Transparency/Charts/LockedCNVChart'

const Faucet = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  let style
  if (isMobile) {
    style = {
      textChartFontSize: '7xl',
      lockedCnv: {
        width: 'full',
      },
      lsdCnv: {
        width: 'full',
      },
    }
  } else {
    style = {
      textChartFontSize: '7xl',
      lockedCnv: {
        width: '60%',
      },
      lsdCnv: {
        width: '50%',
      },
    }
  }

  return (
    <>
      <LockedCNVChart width={style.lockedCnv.width} fontSize={style.textChartFontSize} />
    </>
  )
}

export default withPageTransition(Faucet)

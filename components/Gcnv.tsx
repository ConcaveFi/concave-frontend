import React from 'react'
import Link from 'next/link'
import { Button, HStack } from '@chakra-ui/react'
import { LockIcon, RepeatIcon, StarIcon } from '@chakra-ui/icons'

export const NavBar = ({ active }) => {
  return (
    <HStack>
      <Link href="/swap" passHref scroll={false}>
        <Button>
          <RepeatIcon />
        </Button>
      </Link>
      <Link href="/bond" passHref scroll={false}>
        <Button>
          <LockIcon />
        </Button>
      </Link>
      <Link href="/zap" passHref scroll={false}>
        <Button>
          <StarIcon />
        </Button>
      </Link>
    </HStack>
  )
}

// function Gcnv({ tab }) {
//   // const [tab, setTab] = useState("swap");
//   return (
//     <Container maxW="container.lg">
//       <Flex direction="column" gap={12}>
//         {tab == 'swap' && (
//           <GcnvTitle
//             title="Swap gCNV"
//             description="Get your gCNV that will grow internal CNV number your gCNV that will grow number or
//                         smth idk lol Get your gCNV that will grow internal CNV number or smth idk lol"
//           />
//         )}
//         {tab == 'discounted' && (
//           <GcnvTitle
//             title="Discounted gCNV"
//             description="Get your gCNV that will grow internal CNV number your gCNV that will grow number or
//                         smth idk lol Get your gCNV that will grow internal CNV number or smth idk lol"
//           />
//         )}
//         {tab == 'zap' && (
//           <GcnvTitle
//             title="Zap gCNV"
//             description="Get your gCNV that will grow internal CNV number your gCNV that will grow number or
//                         smth idk lol Get your gCNV that will grow internal CNV number or smth idk lol"
//           />
//         )}

//         {tab == 'swap' && (
//           <Flex gap={6} flexWrap="wrap" justify="center">
//             <SwapCard />
//             <SwapInfoCard />
//           </Flex>
//         )}
//         {tab == 'discounted' && (
//           <Flex gap={6} flexWrap="wrap" justify="center">
//             <BondCard />
//             <BondInfoCard />
//           </Flex>
//         )}
//         {tab == 'zap' && (
//           <Flex gap={6} flexWrap="wrap" justify="center">
//             <ZapCard />
//             <ZapInfoCard />
//           </Flex>
//         )}
//       </Flex>
//     </Container>
//   )
// }

// export default Gcnv

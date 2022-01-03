import { Button, Container, Flex, HStack} from '@chakra-ui/react'
import React, { useState } from 'react'
import ZapInfoCard from 'components/ZapInfoCard'
import SwapInfoCard from 'components/SwapInfoCard'
import SwapCard from 'components/SwapCard'
import ZapCard from 'components/ZapCard'
import BondCard from './BondCard'
import BondInfoCard from './BondInfoCard'
import GcnvTitle from './GcnvTitle'
import { LockIcon, RepeatIcon, StarIcon } from '@chakra-ui/icons'

function Gcnv() {
    const [tab, setTab] = useState("swap");
    return (
        <Container maxW="container.lg">
            <Flex direction="column" gap={12}>
                {tab == "swap" &&
                    <GcnvTitle
                        title="Swap gCNV"
                        description="Get your gCNV that will grow internal CNV number your gCNV that will grow number or
                        smth idk lol Get your gCNV that will grow internal CNV number or smth idk lol"
                    />
                }
                {tab == "discounted" &&
                    <GcnvTitle
                        title="Discounted gCNV"
                        description="Get your gCNV that will grow internal CNV number your gCNV that will grow number or
                        smth idk lol Get your gCNV that will grow internal CNV number or smth idk lol"
                    />
                }
                {tab == "zap" &&
                    <GcnvTitle
                        title="Zap gCNV"
                        description="Get your gCNV that will grow internal CNV number your gCNV that will grow number or
                        smth idk lol Get your gCNV that will grow internal CNV number or smth idk lol"
                    />
                }

                <HStack w={484} alignItems="center" justifyContent="center" >
                    <Button onClick={() => setTab("swap")}><RepeatIcon /></Button>
                    <Button onClick={() => setTab("discounted")}><LockIcon /></Button>
                    <Button onClick={() => setTab("zap")}><StarIcon /></Button>
                </HStack>

                {tab == "swap" &&
                    <Flex gap={6} flexWrap="wrap" justify="center">
                        <SwapCard />
                        <SwapInfoCard />
                    </Flex>
                }
                {tab == "discounted" &&
                    <Flex gap={6} flexWrap="wrap" justify="center">
                        <BondCard />
                        <BondInfoCard />
                    </Flex>
                }
                {tab == "zap" &&
                    <Flex gap={6} flexWrap="wrap" justify="center">
                        <ZapCard />
                        <ZapInfoCard />
                    </Flex>
                }
            </Flex>
        </Container>
    )
}

export default Gcnv

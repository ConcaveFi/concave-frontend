import { Card, Flex } from "@concave/ui";
import { useAuth } from "contexts/AuthContext";

export default function BondBuyCard() {
    const { user, isConnected } = useAuth()
 return (
     
<Flex>
<Card
variant="secondary"
w="430px"
maxW="430px"
borderWidth={3}
px={5}
py={20}
shadow="Glow Inner"
gap={10}
align="center"
>


    </Card>
</Flex>
)
}


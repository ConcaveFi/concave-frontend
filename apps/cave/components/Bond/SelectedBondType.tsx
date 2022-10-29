import { Card, Text } from '@concave/ui'

export const SelectedBondType = ({ bondType }) => {
  return (
    <Card
      variant="primary"
      colorScheme="brighter"
      shadow="Magic Big"
      direction="row"
      mt={-20}
      py={1}
      fontWeight="bold"
      fontSize="sm"
      borderTopRadius="0"
      justify="center"
      gap={1}
      w="250px"
    >
      <Text>Selected</Text>
      <Text mx={1}>|</Text>
      <Text color="text.low">Bond type:</Text>
      <Text>{bondType}</Text>
    </Card>
  )
}

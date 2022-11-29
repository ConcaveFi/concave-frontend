import { Card, Text } from '@concave/ui'

export const SelectedBondType = ({ bondType }) => {
  return (
    <Card
      variant="primary"
      colorScheme="brighter"
      shadow="Magic Big"
      direction="row"
      h={'35px'}
      align="center"
      fontWeight="bold"
      fontSize="sm"
      borderTopRadius="0"
      justify="center"
      gap={1}
      w="65%"
    >
      <Text>Selected</Text>
      <Text mx={1}>|</Text>
      <Text color="text.low">Bond type:</Text>
      <Text>{bondType}</Text>
    </Card>
  )
}

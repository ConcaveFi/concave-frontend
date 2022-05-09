import { Button, Card, Flex, Text, Image } from '@concave/ui'

interface DividendsCardProps {
  onChange: () => void
}

export default function DividendsCard({ onChange }: DividendsCardProps) {
  return (
    <Card
      width={'900px'}
      height="179px"
      bg={'#111e'}
      shadow={'0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 20px rgba(87, 124, 255, 0.3)'}
      direction="row"
    ></Card>
  )
}

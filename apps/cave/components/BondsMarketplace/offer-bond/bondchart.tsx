import { Button, Card, Flex, Heading, Text } from '@concave/ui'
import { ButtonLink } from 'components/ButtonLink'
import React from 'react'
import { MdOutlineDashboard } from 'react-icons/md'
import { ResponsiveBar } from '@nivo/bar'

export function BondChartSimulation() {
  const test = [
    {
      day: '1',
      degress: 30,
    },
    {
      day: '2',
      degress: 25,
    },
    {
      day: '3',
      degress: 20,
    },
    {
      day: '4',
      degress: 15,
    },
    {
      day: '5',
      degress: 10,
    },
    {
      day: '6',
      degress: 5,
    },
    {
      day: '7',
      degress: 4,
    },
    {
      day: '8',
      degress: 5,
    },
    {
      day: '9',
      degress: 10,
    },
    {
      day: '10',
      degress: 15,
    },
    {
      day: '11',
      degress: 20,
    },
    {
      day: '12',
      degress: 25,
    },
    {
      day: '13',
      degress: 30,
    },
  ]
  return (
    <Card
      p={5}
      gap={2}
      variant="primary"
      h="fit-content"
      shadow="Block Up"
      w="100%"
      maxW="430px"
      height="332px"
    >
      <ResponsiveBar
        data={test}
        keys={['degress']}
        indexBy="day"
        margin={{ top: 75, right: 130, bottom: 50, left: 60 }}
        padding={0.4}
        valueScale={{ type: 'linear' }}
        colors="#4DBEE1"
        animate={true}
        enableLabel={false}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          tickSize: 1,
          tickPadding: 1,
          tickRotation: 0,
          legend: 'degrees',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
      />
    </Card>
  )
}

import { Flex } from '@concave/ui'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const COLORS = ['#D49F60', '#4E7DB5']

export function SnapshotLineChart({ data, dataKeys }: { data: any[]; dataKeys: string[] }) {
  return (
    <Flex w={{ base: '100%', lg: '75%' }} height={{ base: '60%', lg: '80%' }}>
      <ResponsiveContainer width={'95%'} height={'100%'}>
        <LineChart data={data} margin={{ top: 40, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((currentKey, i) => (
            <Line
              dot={false}
              key={currentKey}
              type="monotone"
              dataKey={currentKey}
              stroke={COLORS[i]}
              strokeWidth={4}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Flex>
  )
}

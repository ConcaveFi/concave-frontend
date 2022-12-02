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
    <Flex w={'75%'} height={'100%'}>
      <ResponsiveContainer width={'90%'} height={350}>
        <LineChart data={data} margin={{ top: 55, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((key, i) => (
            <Line dot={false} type="monotone" dataKey={key} stroke={COLORS[i]} strokeWidth={4} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Flex>
  )
}

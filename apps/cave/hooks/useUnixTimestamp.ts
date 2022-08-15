import { useState } from 'react'

export const useUnixTimestamp = ({
  min,
  max,
  onChange,
  ...props
}: {
  min?: Date
  max?: Date
  date: Date
  onChange?: (date: Date) => void
}) => {
  const [date, setDate] = useState(props.date)
  const handleDate = (value: Date) => {
    if (!value) return
    if (min && value.getTime() < min.getTime()) return
    if (max && value.getTime() > max.getTime() && max.getTime() > Date.now()) return
    setDate(value)
    onChange(value)
  }
  const inputDateProps = {
    onChange: ({ target }: ButtonEventType) => {
      handleDate(target.valueAsDate)
    },
    min: min?.toISOString().substring(0, 10),
    value: date.toISOString().substring(0, 10),
  }
  return {
    unix: date.getTime(),
    dateStr: date.toISOString().substring(0, 10),
    inputDateProps,
  }
}

type ButtonEventType = {
  target: {
    valueAsDate: Date
  }
}

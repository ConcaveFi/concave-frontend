import { ChevronLeftIcon, ChevronRightIcon } from '@concave/icons'
import { Flex, FlexProps, gradientBorder, Text } from '@concave/ui'
import { FC, useEffect, useState } from 'react'

type VaultActivityBarProps = {
  paginationCount: number
  currentActive: number
  onChangePag: (newActive) => void
  size?: 'sm' | 'md' | 'lg'
}
export const VaultActivityBar: FC<VaultActivityBarProps & FlexProps> = ({
  paginationCount,
  currentActive,
  onChangePag,
  ...props
}) => {
  const size = {
    sm: 1,
    md: 1.5,
    lg: 2,
  }[props.size || 'sm']
  const arrowProps = { color: 'text.small', boxSize: `${40 * size}px`, cursor: 'pointer' }

  const [lastMovement, setLastMovement] = useState<'forward' | 'backward' | 'none'>('none')
  const [initialCut, setInitialCut] = useState(0)
  useEffect(() => {
    if (currentActive % 5 === 0 && lastMovement === 'forward') {
      setInitialCut(currentActive)
    }
    if (currentActive % 5 === 4 && lastMovement === 'backward') {
      setInitialCut(currentActive - 4)
    }
  }, [currentActive])

  const changePag = (index: number) => {
    if (index < 0 || index >= paginationCount) return
    if (index > currentActive) setLastMovement('forward')
    else if (index < currentActive) setLastMovement('backward')
    else setLastMovement('none')
    onChangePag(index)
  }

  const pages = new Array(paginationCount)
    .fill(0)
    .map((v, index) => (
      <Bar
        size={size}
        key={index}
        onClick={() => changePag(index)}
        isSelected={currentActive === index}
      />
    ))
    .splice(initialCut, 5)

  return (
    <Flex align={'center'} {...props}>
      <Text userSelect={'none'} fontWeight={'bold'} color="text.small">
        {currentActive + 1}
      </Text>
      <ChevronLeftIcon {...arrowProps} onClick={() => changePag(currentActive - 1)} />
      {pages}
      <ChevronRightIcon {...arrowProps} onClick={() => changePag(currentActive + 1)} />
      <Text userSelect={'none'} fontWeight={'bold'} color="text.small">
        {paginationCount}
      </Text>
    </Flex>
  )
}

type BarProps = { size?: number; isSelected?: boolean; onClick: VoidFunction }
const Bar: FC<BarProps> = ({ size, onClick, isSelected }) => (
  <Flex
    w={`${33 * size}px`}
    h={`${13}px`}
    sx={{ ...gradientBorder({ variant: 'secondary' }) }}
    bg={isSelected && 'stroke.accent'}
    cursor="pointer"
    onClick={onClick}
    rounded="2xl"
    mx={1}
  />
)

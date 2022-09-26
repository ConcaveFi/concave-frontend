export const getRoiWarnColor = (amount: number) => {
  if (amount < 0) return 'red.300'
  else if (amount >= 0 && amount < 45) return 'none'
  else return 'green.300'
}

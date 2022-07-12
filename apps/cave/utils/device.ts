export const isTouchDevice = () =>
  window?.matchMedia('(pointer: coarse)').matches ||
  'ontouchstart' in window ||
  navigator?.maxTouchPoints > 0

import { ShapeSettingsType } from '../types'

export const SVG = ({
  shapeSettings,
  children,
}: {
  shapeSettings: ShapeSettingsType
  children?: JSX.Element
}) => {
  return (
    <svg
      style={{ margin: 'auto', overflow: 'visible' }}
      height={shapeSettings.height}
      width={shapeSettings.width}
      viewBox={shapeSettings.viewBox}
      fill="none"
    >
      {children ? children : <path d={shapeSettings.path} fill={shapeSettings.fill} />}
    </svg>
  )
}

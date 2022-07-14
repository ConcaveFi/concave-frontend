import { ShapeSettingsType } from '../types'

export const SVG = ({ shapeSettings }: { shapeSettings: ShapeSettingsType }) => {
  return (
    <svg
      style={{ margin: 'auto', overflow: 'visible' }}
      height={shapeSettings.height}
      width={shapeSettings.width}
      viewBox={shapeSettings.viewBox}
      fill="none"
    >
      <path d={shapeSettings.path} fill={shapeSettings.fill} />
    </svg>
  )
}

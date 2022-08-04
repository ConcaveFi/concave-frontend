import { EdgeColors, edgeStyle, labelStyle } from './edgeStyles'
import { WrappedEdgeLabel } from './WrappedEdgeLabel'

export const bondingEdges = [
  {
    id: 'Concave Treasury-CNV',
    source: 'Concave Treasury',
    target: 'CNV',
    sourceHandle: 'topSource',
    targetHandle: 'bottomTarget',
    label: (
      <WrappedEdgeLabel
        maxLineLength={22}
        id={'Concave Treasury-CNV'}
        label="Concave Treasury admins token contracts"
        labelStyle={labelStyle}
      />
    ),
    labelStyle: {
      ...labelStyle,
      transform: 'translate(60px,0)',
    },
    animated: true,
  },
  {
    id: 'Concave Treasury-Proxy Admin',
    source: 'Concave Treasury',
    target: 'Proxy Admin',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    label: 'Upgrade call',
    animated: true,
  },
  {
    id: 'Concave Treasury-Policy Multisig',
    source: 'Concave Treasury',
    target: 'Policy Multisig',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    label: 'CNV mint allowance',
    animated: true,
  },
  {
    id: 'Policy Multisig-AccrualBondsV1 (Proxy)',
    source: 'Policy Multisig',
    target: 'AccrualBondsV1 (Proxy)',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    label: 'Bond management',
    animated: true,
  },
  {
    id: 'Proxy Admin-AccrualBondsV1 (Proxy)',
    source: 'Proxy Admin',
    target: 'AccrualBondsV1 (Proxy)',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    animated: true,
  },
  {
    id: 'AccrualBondsV1 (Proxy)-Proxy Admin',
    source: 'AccrualBondsV1 (Proxy)',
    target: 'Proxy Admin',
    sourceHandle: 'topSource',
    targetHandle: 'bottomTarget',
    animated: true,
  },
  {
    id: 'AccrualBondsV1 (Proxy)-user',
    source: 'AccrualBondsV1 (Proxy)',
    target: 'user',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    label: (
      <WrappedEdgeLabel
        maxLineLength={12}
        id={'AccrualBondsV1 (Proxy)-user'}
        label={'Emits CNV vested over 5 days'}
        labelStyle={labelStyle}
      />
    ),
    labelStyle: {
      transform: 'translate(40px, 0px)',
    },
    style: { ...edgeStyle, stroke: EdgeColors.CornflowerBlue },
    animated: true,
  },
  {
    id: 'AccrualBondsV1 (Proxy)-AccrualBondsV1 (Impl)',
    source: 'AccrualBondsV1 (Proxy)',
    target: 'AccrualBondsV1 (Impl)',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    animated: true,
  },
  {
    id: 'AccrualBondsV1 (Impl)-AccrualBondsV1 (Proxy)',
    source: 'AccrualBondsV1 (Impl)',
    target: 'AccrualBondsV1 (Proxy)',
    sourceHandle: 'topSource',
    targetHandle: 'bottomTarget',
    label: (
      <WrappedEdgeLabel
        id={'AccrualBondsV1 (Impl)-AccrualBondsV1 (Proxy)'}
        label={'Proxy delegates calls to implementation'}
        labelStyle={labelStyle}
      />
    ),
    labelStyle: {
      transform: 'translate(45px, 0px)',
    },
    animated: true,
  },
  {
    id: 'AccrualBondsV1 (Impl)-ValueShuttle',
    source: 'AccrualBondsV1 (Impl)',
    target: 'ValueShuttle',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    label: 'Value into shuttle',
    animated: true,
  },
  {
    id: 'user-ValueShuttle',
    source: 'user',
    target: 'ValueShuttle',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    label: 'Staked CNV',
    style: { ...edgeStyle, stroke: EdgeColors.CornflowerBlue },
    animated: true,
  },
  {
    id: 'ValueShuttle-Concave Treasury',
    source: 'ValueShuttle',
    target: 'Concave Treasury',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    label: 'Bonded DAI',
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
    animated: true,
  },
  {
    id: 'ValueShuttle-CO-OP Treasury',
    source: 'ValueShuttle',
    target: 'CO-OP Treasury',
    sourceHandle: 'leftSource',
    targetHandle: 'bottomTarget',
    label: 'Redploy bonded DAI',
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
    animated: true,
  },
]

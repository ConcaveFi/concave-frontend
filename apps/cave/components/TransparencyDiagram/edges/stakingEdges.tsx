import { EdgeColors, edgeStyle, labelStyle } from '../styles'
import { WrappedEdgeLabel } from './WrappedEdgeLabel'

export const stakingEdges = [
  {
    id: 'Concave Treasury-CNV',
    source: 'Concave Treasury',
    target: 'CNV',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    label: (
      <WrappedEdgeLabel
        maxLineLength={12}
        id={'Concave Treasury-CNV'}
        label="Concave Treasury admins token contracts"
      />
    ),
    labelStyle: {
      ...labelStyle,
      transform: 'translate(60px,-20px)',
    },
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
    animated: true,
  },
  {
    id: 'Concave Treasury-Proxy Admin',
    source: 'Concave Treasury',
    target: 'Proxy Admin',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    label: 'Upgrade call',
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
    animated: true,
  },
  {
    id: 'Concave Treasury-StakingV1 (Proxy)',
    source: 'Concave Treasury',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
    animated: true,
  },
  {
    id: 'Policy Multisig-StakingV1 (Proxy)',
    source: 'Policy Multisig',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
    animated: true,
  },
  {
    id: 'Proxy Admin-StakingV1 (Proxy)',
    source: 'Proxy Admin',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    label: 'Serves as registry',
    style: { ...edgeStyle, stroke: EdgeColors.Teal },
    animated: true,
  },
  {
    id: 'StakingV1 (Proxy)-Proxy Admin',
    source: 'StakingV1 (Proxy)',
    target: 'Proxy Admin',
    sourceHandle: 'topSource',
    targetHandle: 'bottomTarget',
    style: { ...edgeStyle, stroke: EdgeColors.Teal },
    animated: true,
  },
  {
    id: 'StakingV1 (Proxy)-lsdCNV',
    source: 'StakingV1 (Proxy)',
    target: 'lsdCNV',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    label: (
      <WrappedEdgeLabel
        maxLineLength={15}
        id={'StakingV1 (Proxy)-lsdCNV'}
        label={'Staked CNV creates a position'}
      />
    ),
    labelStyle: {
      transform: 'translate(55px, 0px)',
    },
    style: { ...edgeStyle, stroke: EdgeColors.Teal },
    animated: true,
  },
  {
    id: 'StakingV1 (Proxy)-CO-OP Treasury',
    source: 'StakingV1 (Proxy)',
    target: 'CO-OP Treasury',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    label: (
      <WrappedEdgeLabel
        id={'StakingV1 (Proxy)-CO-OP Treasury'}
        label={'Minted CNV to treasury 60% instead of 3.6%'}
      />
    ),
    labelStyle: {
      transform: 'translate(80px, -20px)',
    },
    style: { ...edgeStyle, stroke: EdgeColors.Teal },
    animated: true,
  },
  {
    id: 'StakingV1 (Proxy)-StakingV1 (Impl)',
    source: 'StakingV1 (Proxy)',
    target: 'StakingV1 (Impl)',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    style: { ...edgeStyle, stroke: EdgeColors.Teal },
    animated: true,
  },
  {
    id: 'StakingV1 (Impl)-StakingV1 (Proxy)',
    source: 'StakingV1 (Impl)',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'topSource',
    targetHandle: 'bottomTarget',
    label: (
      <WrappedEdgeLabel
        id={'StakingV1 (Impl)-StakingV1 (Proxy)'}
        label={'Proxy delegates calls to implementation'}
      />
    ),
    labelStyle: {
      transform: 'translate(85px, 30px)',
    },
    style: { ...edgeStyle, stroke: EdgeColors.Teal },
    animated: true,
  },
  {
    id: 'ValueShuttle-StakingV1 (Proxy)',
    source: 'ValueShuttle',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    label: 'Staked CNV',
    style: { ...edgeStyle, stroke: EdgeColors.Green },
    animated: true,
  },
  {
    id: 'lsdCNV-user',
    source: 'lsdCNV',
    target: 'user',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    label: 'lsdCNV',
    style: { ...edgeStyle, stroke: EdgeColors.CornflowerBlue },
    animated: true,
  },
  {
    id: 'user-ValueShuttle',
    source: 'user',
    target: 'ValueShuttle',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    label: 'Staked CNV',
    style: { ...edgeStyle, stroke: EdgeColors.CornflowerBlue },
    animated: true,
  },
]

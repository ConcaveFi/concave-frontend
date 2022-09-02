import { EdgeColors, edgeStyle, labelStyle } from '../styles'
import { WrappedEdgeLabel } from './WrappedEdgeLabel'

export const generalEdges = [
  {
    id: 'aCNV-CNV',
    source: 'aCNV',
    target: 'CNV',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    label: 'Mints',
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.CornflowerBlue },
  },
  {
    id: 'pCNV-CNV',
    source: 'pCNV',
    target: 'CNV',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    label: 'Mints',
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.CornflowerBlue },
  },
  {
    id: 'Concave Treasury-bbtCNV',
    source: 'Concave Treasury',
    target: 'bbtCNV',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    label: (
      <WrappedEdgeLabel
        maxLineLength={22}
        id={'Concave Treasury-bbtCNV'}
        label="Concave Treasury admins token contracts"
      />
    ),
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
    labelStyle: {
      transform: 'translate(90px, 10px)',
      ...labelStyle,
    },
  },
  {
    id: 'Concave Treasury-CNV',
    source: 'Concave Treasury',
    target: 'CNV',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    label: (
      <WrappedEdgeLabel
        maxLineLength={22}
        id={'Concave Treasury-CNV'}
        label="Concave Treasury admins token contracts"
      />
    ),
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
    labelStyle: {
      transform: 'translate(90px, -10px)',
      ...labelStyle,
    },
  },

  {
    id: 'Concave Treasury-AccrualBondsV1 (Proxy)',
    source: 'Concave Treasury',
    target: 'AccrualBondsV1 (Proxy)',
    sourceHandle: 'topSource',
    targetHandle: 'bottomTarget',
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
  },
  {
    id: 'CO-OP Treasury-AccrualBondsV1 (Proxy)',
    source: 'CO-OP Treasury',
    target: 'AccrualBondsV1 (Proxy)',
    sourceHandle: 'topSource',
    targetHandle: 'bottomTarget',
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
  },
  {
    id: 'Policy Multisig-AccrualBondsV1 (Proxy)',
    source: 'Policy Multisig',
    target: 'AccrualBondsV1 (Proxy)',
    sourceHandle: 'topSource',
    targetHandle: 'bottomTarget',
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
  },
  {
    id: 'Concave Treasury-StakingV1 (Proxy)',
    source: 'Concave Treasury',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
  },
  {
    id: 'CO-OP Treasury-StakingV1 (Proxy)',
    source: 'CO-OP Treasury',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
  },
  {
    id: 'Policy Multisig-StakingV1 (Proxy)',
    source: 'Policy Multisig',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
  },

  {
    id: 'Proxy Admin-AccrualBondsV1 (Proxy)',
    source: 'Proxy Admin',
    target: 'AccrualBondsV1 (Proxy)',
    sourceHandle: 'topSource',
    targetHandle: 'bottomTarget',
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.Teal },
  },
  {
    id: 'AccrualBondsV1 (Proxy)-Proxy Admin',
    source: 'AccrualBondsV1 (Proxy)',
    target: 'Proxy Admin',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.Teal },
  },

  {
    id: 'Proxy Admin-StakingV1 (Proxy)',
    source: 'Proxy Admin',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.Teal },
  },

  {
    id: 'AccrualBondsV1 (Proxy)-AccrualBondsV1 (Impl)',
    source: 'AccrualBondsV1 (Proxy)',
    target: 'AccrualBondsV1 (Impl)',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.Purple },
  },

  {
    id: 'AccrualBondsV1 (Impl)-ValueShuttle',
    source: 'AccrualBondsV1 (Impl)',
    target: 'ValueShuttle',
    sourceHandle: 'rightSource',
    targetHandle: 'topTarget',
    label: 'Value goes into shuttle',
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.Purple },
  },

  {
    id: 'StakingV1 (Proxy)-StakingV1 (Impl)',
    source: 'StakingV1 (Proxy)',
    target: 'StakingV1 (Impl)',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    label: (
      <WrappedEdgeLabel
        id={'StakingV1 (Proxy)-StakingV1 (Impl)'}
        label={'Proxy delegates calls to implementation'}
      />
    ),
    labelStyle: {
      transform: 'translate(90px, 0px)',
    },
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.Teal },
  },

  {
    id: 'StakingV1 (Proxy)-CO-OP Treasury',
    source: 'StakingV1 (Proxy)',
    target: 'CO-OP Treasury',
    sourceHandle: 'topSource',
    targetHandle: 'bottomTarget',
    label: 'CNV minted from Staking',
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
  },

  {
    id: 'ValueShuttle-StakingV1 (Impl)',
    source: 'ValueShuttle',
    target: 'StakingV1 (Impl)',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.Green },
  },
  {
    id: 'ValueShuttle-Concave Treasury',
    source: 'ValueShuttle',
    target: 'Concave Treasury',
    sourceHandle: 'leftSource',
    targetHandle: 'bottomTarget',
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.Green },
  },

  {
    id: 'lsdCNV-StakingV1 (Proxy)',
    source: 'lsdCNV',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.CornflowerBlue },
  },
  {
    id: 'StakingV1 (Proxy)-lsdCNV',
    source: 'StakingV1 (Proxy)',
    target: 'lsdCNV',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    animated: true,
    style: { ...edgeStyle, stroke: EdgeColors.CornflowerBlue },
  },
]

import { EdgeColors, edgeStyle, labelStyle } from '../styles'
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
      />
    ),
    labelStyle: {
      ...labelStyle,
      transform: 'translate(90px,0)',
    },
    style: { ...edgeStyle, stroke: EdgeColors.CornflowerBlue },
    animated: true,
  },
  {
    id: 'Concave Treasury-Proxy Admin',
    source: 'Concave Treasury',
    target: 'Proxy Admin',
    sourceHandle: 'leftSource',
    targetHandle: 'bottomTarget',
    label: 'Upgrade call',
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
    animated: true,
  },
  {
    id: 'Concave Treasury-Policy Multisig',
    source: 'Concave Treasury',
    target: 'Policy Multisig',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    label: 'CNV mint allowance',
    labelStyle: {
      ...labelStyle,
      transform: 'translate(-10px,0)',
    },
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
    animated: true,
  },
  {
    id: 'Concave Treasury-AccrualBondsV1 (Proxy)',
    source: 'Concave Treasury',
    target: 'AccrualBondsV1 (Proxy)',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    label: 'Bond management',
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
    animated: true,
  },
  {
    id: 'Policy Multisig-AccrualBondsV1 (Proxy)',
    source: 'Policy Multisig',
    target: 'AccrualBondsV1 (Proxy)',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    label: 'Bond management',
    style: { ...edgeStyle, stroke: EdgeColors.Orange },
    animated: true,
  },
  {
    id: 'Proxy Admin-AccrualBondsV1 (Proxy)',
    source: 'Proxy Admin',
    target: 'AccrualBondsV1 (Proxy)',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    style: { ...edgeStyle, stroke: EdgeColors.Teal },
    animated: true,
  },
  {
    id: 'AccrualBondsV1 (Proxy)-Proxy Admin',
    source: 'AccrualBondsV1 (Proxy)',
    target: 'Proxy Admin',
    sourceHandle: 'topSource',
    targetHandle: 'bottomTarget',
    style: { ...edgeStyle, stroke: EdgeColors.Teal },
    animated: true,
  },
  {
    id: 'AccrualBondsV1 (Proxy)-user',
    source: 'AccrualBondsV1 (Proxy)',
    target: 'user',
    sourceHandle: 'topSource',
    targetHandle: 'bottomTarget',
    style: { ...edgeStyle, stroke: EdgeColors.CornflowerBlue },
    animated: true,
  },
  {
    id: 'user-AccrualBondsV1 (Proxy)',
    source: 'user',
    target: 'AccrualBondsV1 (Proxy)',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    label: (
      <WrappedEdgeLabel
        maxLineLength={18}
        id={'AccrualBondsV1 (Proxy)-user'}
        label={'User bonds, receives CNV vested over 5 days'}
      />
    ),
    labelStyle: {
      transform: 'translate(70px, -50px)',
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
    style: { ...edgeStyle, stroke: EdgeColors.Purple },
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
      />
    ),
    labelStyle: {
      transform: 'translate(90px, 0px)',
    },
    style: { ...edgeStyle, stroke: EdgeColors.Purple },
    animated: true,
  },
  {
    id: 'AccrualBondsV1 (Proxy)-ValueShuttle',
    source: 'AccrualBondsV1 (Proxy)',
    target: 'ValueShuttle',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    label: (
      <WrappedEdgeLabel
        maxLineLength={10}
        id={'AccrualBondsV1 (Proxy)-ValueShuttle'}
        label="Value into shuttle"
      />
    ),
    labelStyle: { transform: 'translate(27px,-12px)' },
    style: { ...edgeStyle, stroke: EdgeColors.Purple },
    animated: true,
  },
  {
    id: 'ValueShuttle-CO-OP Treasury',
    source: 'ValueShuttle',
    target: 'CO-OP Treasury',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    label: (
      <WrappedEdgeLabel
        maxLineLength={10}
        id={'ValueShuttle-CO-OP Treasury'}
        label={'Shuttle bonded DAI'}
      />
    ),
    labelStyle: { transform: 'translate(46px,0)' },
    style: { ...edgeStyle, stroke: EdgeColors.Green },
    animated: true,
  },
]

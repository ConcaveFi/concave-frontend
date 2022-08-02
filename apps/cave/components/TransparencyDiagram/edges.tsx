import { WrappedEdgeLabel } from './WrappedEdgeLabel'

export const labelStyle = {
  fill: 'white',
  stroke: 'black',
  strokeWidth: '3',
  paintOrder: 'stroke',
  fontSize: '0.75rem',
}

export const edgeStyle = {
  strokeWidth: 2.25,
}

export const edges = [
  {
    id: 'aCNV-CNV',
    source: 'aCNV',
    target: 'CNV',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    label: 'Mints',
    animated: true,
  },
  {
    id: 'pCNV-CNV',
    source: 'pCNV',
    target: 'CNV',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    label: 'Mints',
    animated: true,
  },
  {
    id: 'Concave Treasury-bbtCNV',
    source: 'Concave Treasury',
    target: 'bbtCNV',
    sourceHandle: 'topSource',
    targetHandle: 'bottomTarget',
    label: (
      <WrappedEdgeLabel
        maxLineLength={22}
        id={'Concave Treasury-bbtCNV'}
        label="Concave Treasury admins token contracts"
        labelStyle={labelStyle}
      />
    ),
    animated: true,
    labelStyle: {
      transform: 'translate(45px, -10px)',
      ...labelStyle,
    },
  },
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
    animated: true,
    labelStyle: {
      transform: 'translate(90px, -10px)',
      ...labelStyle,
    },
  },

  {
    id: 'Concave Treasury-AccrualBondsV1 (Proxy)',
    source: 'Concave Treasury',
    target: 'AccrualBondsV1 (Proxy)',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    label: '',
    animated: true,
    style: { ...edgeStyle, stroke: 'orange' },
  },
  {
    id: 'CO-OP Treasury-AccrualBondsV1 (Proxy)',
    source: 'CO-OP Treasury',
    target: 'AccrualBondsV1 (Proxy)',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    label: '',
    animated: true,
    style: { ...edgeStyle, stroke: 'orange' },
  },
  {
    id: 'Policy Multisig-AccrualBondsV1 (Proxy)',
    source: 'Policy Multisig',
    target: 'AccrualBondsV1 (Proxy)',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    label: '',
    animated: true,
    style: { ...edgeStyle, stroke: 'orange' },
  },
  {
    id: 'Concave Treasury-StakingV1 (Proxy)',
    source: 'Concave Treasury',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    label: '',
    animated: true,
    style: { ...edgeStyle, stroke: 'orange' },
  },
  {
    id: 'CO-OP Treasury-StakingV1 (Proxy)',
    source: 'CO-OP Treasury',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    label: '',
    animated: true,
    style: { ...edgeStyle, stroke: 'orange' },
  },
  {
    id: 'Policy Multisig-StakingV1 (Proxy)',
    source: 'Policy Multisig',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    label: '',
    animated: true,
    style: { ...edgeStyle, stroke: 'orange' },
  },

  {
    id: 'Proxy Admin-AccrualBondsV1 (Proxy)',
    source: 'Proxy Admin',
    target: 'AccrualBondsV1 (Proxy)',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    label: '',
    animated: true,
  },
  {
    id: 'AccrualBondsV1 (Proxy)-Proxy Admin',
    source: 'AccrualBondsV1 (Proxy)',
    target: 'Proxy Admin',
    sourceHandle: 'topSource',
    targetHandle: 'bottomTarget',
    label: '',
    animated: true,
  },

  {
    id: 'Proxy Admin-StakingV1 (Proxy)',
    source: 'Proxy Admin',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    label: '',
    animated: true,
  },

  {
    id: 'AccrualBondsV1 (Proxy)-AccrualBondsV1 (Impl)',
    source: 'AccrualBondsV1 (Proxy)',
    target: 'AccrualBondsV1 (Impl)',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    style: { ...edgeStyle, stroke: '#079D7C' },
    animated: true,
  },

  {
    id: 'AccrualBondsV1 (Impl)-ValueShuttle',
    source: 'AccrualBondsV1 (Impl)',
    target: 'ValueShuttle',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    label: 'Value goes into shuttle',
    style: { ...edgeStyle, stroke: '#079D7C' },
    animated: true,
  },

  {
    id: 'StakingV1 (Proxy)-StakingV1 (Impl)',
    source: 'StakingV1 (Proxy)',
    target: 'StakingV1 (Impl)',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    label: (
      <WrappedEdgeLabel
        id={'Concave Treasury-CNV'}
        label={'Proxy delegates calls to implementation'}
        labelStyle={labelStyle}
      />
    ),
    labelStyle: {
      transform: 'translate(-39.5px, 20px)',
    },
    style: { ...edgeStyle, stroke: 'cornflowerblue' },
    animated: true,
  },

  {
    id: 'StakingV1 (Proxy)-CO-OP Treasury',
    source: 'StakingV1 (Proxy)',
    target: 'CO-OP Treasury',
    sourceHandle: 'bottomSource',
    targetHandle: 'rightTarget',
    label: 'CNV minted from Staking',
    labelStyle: {
      transform: 'translate(70px, 0px)',
      ...labelStyle,
    },
    style: { ...edgeStyle, stroke: 'cornflowerblue' },
    animated: true,
  },

  {
    id: 'ValueShuttle-StakingV1 (Impl)',
    source: 'ValueShuttle',
    target: 'StakingV1 (Impl)',
    sourceHandle: 'rightSource',
    targetHandle: 'bottomTarget',
    label: '',
    style: { ...edgeStyle, stroke: 'cornflowerblue' },
    animated: true,
  },
  {
    id: 'ValueShuttle-Concave Treasury',
    source: 'ValueShuttle',
    target: 'Concave Treasury',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    label: '',
    animated: true,
  },

  {
    id: 'lsdCNV-StakingV1 (Proxy)',
    source: 'lsdCNV',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    label: '',
    animated: true,
  },
  {
    id: 'StakingV1 (Proxy)-lsdCNV',
    source: 'StakingV1 (Proxy)',
    target: 'lsdCNV',
    sourceHandle: 'topSource',
    targetHandle: 'bottomTarget',
    label: '',
    animated: true,
  },
]

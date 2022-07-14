import { WrappedEdgeLabel } from './CustomEdges/WrappedEdgeLabel'

const labelStyle = {
  fill: 'white',
  stroke: 'black',
  strokeWidth: '3',
  paintOrder: 'stroke',
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
  },
  {
    id: 'CO-OP Treasury-AccrualBondsV1 (Proxy)',
    source: 'CO-OP Treasury',
    target: 'AccrualBondsV1 (Proxy)',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    label: '',
    animated: true,
  },
  {
    id: 'Policy Multisig-AccrualBondsV1 (Proxy)',
    source: 'Policy Multisig',
    target: 'AccrualBondsV1 (Proxy)',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    label: '',
    animated: true,
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
    animated: true,
  },

  {
    id: 'AccrualBondsV1 (Impl)-ValueShuttle',
    source: 'AccrualBondsV1 (Impl)',
    target: 'ValueShuttle',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    label: 'Value goes into shuttle',
    animated: true,
  },

  {
    id: 'StakingV1 (Proxy)-StakingV1 (Impl)',
    source: 'StakingV1 (Proxy)',
    target: 'StakingV1 (Impl)',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    label: 'Proxy delegates calls to implementation',
    labelStyle: {
      transform: 'translate(-100px, 10px)',
      ...labelStyle,
    },
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
      transform: 'translate(-120px, 2.5px)',
      ...labelStyle,
    },
    animated: true,
  },

  {
    id: 'ValueShuttle-StakingV1 (Impl)',
    source: 'ValueShuttle',
    target: 'StakingV1 (Impl)',
    sourceHandle: 'rightSource',
    targetHandle: 'bottomTarget',
    label: '',
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

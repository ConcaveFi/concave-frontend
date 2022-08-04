import { labelStyle } from './edgeStyles'
import { WrappedEdgeLabel } from './WrappedEdgeLabel'

export const stakingEdges = [
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
    id: 'Concave Treasury-StakingV1 (Proxy)',
    source: 'Concave Treasury',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    animated: true,
  },
  {
    id: 'Policy Multisig-StakingV1 (Proxy)',
    source: 'Policy Multisig',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    animated: true,
  },
  {
    id: 'Proxy Admin-StakingV1 (Proxy)',
    source: 'Proxy Admin',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    label: 'Serves as registry',
    animated: true,
  },
  {
    id: 'StakingV1 (Proxy)-Proxy Admin',
    source: 'StakingV1 (Proxy)',
    target: 'Proxy Admin',
    sourceHandle: 'topSource',
    targetHandle: 'bottomTarget',
    animated: true,
  },
  {
    id: 'StakingV1 (Proxy)-lsdCNV',
    source: 'StakingV1 (Proxy)',
    target: 'lsdCNV',
    sourceHandle: 'rightSource',
    targetHandle: 'leftTarget',
    label: (
      <WrappedEdgeLabel
        id={'StakingV1 (Proxy)-lsdCNV'}
        label={'Staked CNV creates a position'}
        labelStyle={labelStyle}
      />
    ),
    labelStyle: {
      transform: 'translate(55px, 0px)',
    },
    animated: true,
  },
  {
    id: 'StakingV1 (Proxy)-CO-OP Treasury',
    source: 'StakingV1 (Proxy)',
    target: 'CO-OP Treasury',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    label: (
      <WrappedEdgeLabel
        id={'StakingV1 (Proxy)-CO-OP Treasury'}
        label={'Minted CNV to treasury 60% instead of 3.6%'}
        labelStyle={labelStyle}
      />
    ),
    labelStyle: {
      transform: 'translate(65px, 10px)',
    },
    animated: true,
  },
  {
    id: 'StakingV1 (Proxy)-StakingV1 (Impl)',
    source: 'StakingV1 (Proxy)',
    target: 'StakingV1 (Impl)',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
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
        labelStyle={labelStyle}
      />
    ),
    labelStyle: {
      transform: 'translate(65px, 0px)',
    },
    animated: true,
  },
  {
    id: 'ValueShuttle-StakingV1 (Proxy)',
    source: 'ValueShuttle',
    target: 'StakingV1 (Proxy)',
    sourceHandle: 'rightSource',
    targetHandle: 'bottomTarget',
    label: 'Staked CNV',
    animated: true,
  },
  {
    id: 'lsdCNV-user',
    source: 'lsdCNV',
    target: 'user',
    sourceHandle: 'bottomSource',
    targetHandle: 'topTarget',
    label: 'lsdCNV',
    animated: true,
  },
  {
    id: 'user-ValueShuttle',
    source: 'user',
    target: 'ValueShuttle',
    sourceHandle: 'leftSource',
    targetHandle: 'rightTarget',
    label: 'Staked CNV',
    animated: true,
  },
]

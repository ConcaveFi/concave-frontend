import { Icon } from '@chakra-ui/icons'
import { IconProps } from '@chakra-ui/react'

export const XmrIcon = (props: IconProps) => (
  <Icon width="31" height="30" fill="none" viewBox="0 0  30 31" {...props}>
    <path
      d="M27.545 18.75h-4V8.986c0-.278-.343-.418-.543-.221l-7.73 7.592-7.729-7.591c-.2-.197-.543-.058-.543.22v9.764H3.053c.273.88.646 1.714 1.098 2.5h5.076c.176 0 .318-.14.318-.313v-6.669l5.502 5.404a.322.322 0 0 0 .45 0L21 14.268v6.67c0 .172.142.312.318.312h5.13c.452-.786.824-1.62 1.097-2.5Z"
      fill="url(#a)"
    />
    <path
      d="M21.318 21.25a.315.315 0 0 1-.318-.313v-6.669l-5.502 5.404a.322.322 0 0 1-.45 0l-5.503-5.404v6.67a.315.315 0 0 1-.318.312H4.15A12.834 12.834 0 0 0 15.3 27.652c4.785 0 8.95-2.583 11.148-6.402h-5.129Z"
      fill="url(#b)"
    />
    <path
      d="M7 18.75V8.986c0-.278.343-.418.543-.221l7.73 7.592 7.729-7.591c.2-.197.543-.058.543.22v9.764h4a12.35 12.35 0 0 0 .559-3.674C28.104 8.131 22.37 2.5 15.299 2.5S2.494 8.131 2.494 15.076c0 1.279.197 2.511.559 3.674H7Z"
      fill="url(#c)"
    />
    <defs>
      <linearGradient
        id="b"
        x1="9.901"
        y1="14.658"
        x2="23.173"
        y2="31.328"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#889097" />
        <stop offset="1" stopColor="#64717C" />
      </linearGradient>
      <linearGradient
        id="c"
        x1="8.681"
        y1="3.688"
        x2="19.199"
        y2="21.885"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FC7D5B" />
        <stop offset=".06" stopColor="#F8734F" />
        <stop offset=".18" stopColor="#F3653D" />
        <stop offset=".326" stopColor="#F05B31" />
        <stop offset=".523" stopColor="#EE552A" />
        <stop offset="1" stopColor="#ED5328" />
      </linearGradient>
      <radialGradient
        id="a"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(12.6662 0 0 12.44 15.258 15.201)"
      >
        <stop stopColor="#fff" />
        <stop offset=".679" stopColor="#F2F2F2" />
        <stop offset="1" stopColor="#CCC" />
      </radialGradient>
    </defs>
  </Icon>
)

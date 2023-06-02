import { Icon, IconProps } from '@chakra-ui/icons'

export function WithdrawIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 30 30" {...props}>
      <svg
        width="23"
        height="24"
        viewBox="0 0 23 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.7384 0.989258C13.5396 0.992363 13.3503 1.07423 13.2118 1.21686C13.0734 1.3595 12.9973 1.55125 13.0001 1.75V3.75C12.9987 3.84938 13.0171 3.94806 13.0541 4.04028C13.0912 4.13251 13.1462 4.21645 13.216 4.28723C13.2858 4.358 13.3689 4.41421 13.4606 4.45257C13.5523 4.49093 13.6507 4.51068 13.7501 4.51068C13.8495 4.51068 13.9479 4.49093 14.0396 4.45257C14.1313 4.41421 14.2144 4.358 14.2842 4.28723C14.354 4.21645 14.409 4.13251 14.4461 4.04028C14.4831 3.94806 14.5015 3.84938 14.5001 3.75V1.75C14.5015 1.64962 14.4828 1.54997 14.445 1.45695C14.4072 1.36394 14.3512 1.27946 14.2801 1.20852C14.2091 1.13757 14.1246 1.08161 14.0315 1.04395C13.9384 1.00629 13.8388 0.987689 13.7384 0.989258ZM10.7384 1.98926C10.5396 1.99236 10.3503 2.07422 10.2118 2.21686C10.0734 2.3595 9.99725 2.55125 10.0001 2.75V4.75C9.9987 4.84938 10.0171 4.94806 10.0541 5.04028C10.0912 5.13251 10.1462 5.21645 10.216 5.28723C10.2858 5.358 10.3689 5.41421 10.4606 5.45257C10.5523 5.49093 10.6507 5.51068 10.7501 5.51068C10.8495 5.51068 10.9479 5.49093 11.0396 5.45257C11.1313 5.41421 11.2144 5.358 11.2842 5.28723C11.354 5.21645 11.409 5.13251 11.4461 5.04028C11.4831 4.94806 11.5015 4.84938 11.5001 4.75V2.75C11.5015 2.64962 11.4828 2.54997 11.445 2.45695C11.4073 2.36394 11.3512 2.27946 11.2801 2.20852C11.2091 2.13757 11.1246 2.08161 11.0315 2.04395C10.9384 2.00629 10.8388 1.98769 10.7384 1.98926ZM16.7384 1.98926C16.5396 1.99236 16.3503 2.07422 16.2118 2.21686C16.0734 2.3595 15.9973 2.55125 16.0001 2.75V4.75C15.9987 4.84938 16.0171 4.94806 16.0541 5.04028C16.0912 5.13251 16.1462 5.21645 16.216 5.28723C16.2858 5.358 16.3689 5.41421 16.4606 5.45257C16.5523 5.49093 16.6507 5.51068 16.7501 5.51068C16.8495 5.51068 16.9479 5.49093 17.0396 5.45257C17.1313 5.41421 17.2144 5.358 17.2842 5.28723C17.354 5.21645 17.409 5.13251 17.4461 5.04028C17.4831 4.94806 17.5015 4.84938 17.5001 4.75V2.75C17.5015 2.64962 17.4828 2.54997 17.445 2.45695C17.4072 2.36394 17.3512 2.27946 17.2801 2.20852C17.2091 2.13757 17.1246 2.08161 17.0315 2.04395C16.9384 2.00629 16.8388 1.98769 16.7384 1.98926ZM13.7501 5.5C12.7555 5.5 11.8017 5.89509 11.0985 6.59835C10.3952 7.30161 10.0001 8.25544 10.0001 9.25C10.0001 10.2446 10.3952 11.1984 11.0985 11.9016C11.8017 12.6049 12.7555 13 13.7501 13C14.7447 13 15.6985 12.6049 16.4018 11.9016C17.105 11.1984 17.5001 10.2446 17.5001 9.25C17.5001 8.25544 17.105 7.30161 16.4018 6.59835C15.6985 5.89509 14.7447 5.5 13.7501 5.5ZM21.1837 12.5029C20.6707 12.5029 20.1073 12.8399 18.9103 13.4609C17.9188 13.9759 17.0025 14.4653 16.42 14.8223C16.4705 15.0413 16.5001 15.2689 16.5001 15.5029C16.5001 17.1574 15.1541 18.5029 13.5001 18.5029H9.7501C9.3361 18.5029 9.0001 18.1674 9.0001 17.7529C9.0001 17.3384 9.3361 17.0029 9.7501 17.0029H13.5001C14.3271 17.0029 15.0001 16.3299 15.0001 15.5029C15.0001 15.0544 14.7985 14.6554 14.4855 14.3799C14.13 14.1449 13.7076 14.0029 13.2501 14.0029H11.0538H10.7501C10.7356 14.0029 10.7216 13.999 10.7071 13.998C9.38913 13.9775 8.7568 13.8412 8.2003 13.7187C7.6943 13.6072 7.21569 13.5029 6.41319 13.5029C2.74719 13.5029 0.654484 18.0028 0.567484 18.1943C0.454484 18.4423 0.485086 18.7312 0.646586 18.9502L4.14659 23.6973C4.28909 23.8908 4.51315 24 4.74815 24C4.79565 24 4.84323 23.9953 4.89073 23.9863C5.17373 23.9323 5.40219 23.7189 5.47569 23.4404C5.51519 23.2929 5.8976 22.0029 7.2501 22.0029C8.2261 22.0029 9.23552 22.1285 10.212 22.25C11.2065 22.3745 12.2356 22.5029 13.2501 22.5029C14.6316 22.5029 15.6261 21.4434 18.5001 18.5029C22.1511 14.7674 22.5001 14.4407 22.5001 13.7002C22.5001 13.0592 21.9377 12.5029 21.1837 12.5029Z"
          fill="white"
        />
      </svg>
    </Icon>
  )
}

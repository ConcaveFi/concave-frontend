import { Global } from '@emotion/react'

const concaveFontsSrc = 'https://concave-assets.vercel.app/fonts' // 'https://concave.lol/assets/fonts'

const makeFontFaces = (familyName: string, weights: number[]) =>
  weights
    .map(
      (weight) => `
@font-face {
  font-family: '${familyName}';
  font-style: normal;
  font-weight: ${weight};
  font-display: swap;
  src: url('${concaveFontsSrc}/${familyName}-${weight}.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F,
    U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
`,
    )
    .join('')

export const ConcaveFonts = () => (
  <Global
    styles={`
         ${makeFontFaces('ProductSans', [900, 700, 500, 400])}
    ${makeFontFaces('SharpSans', [800, 700, 600, 500])}
  `}
  />
)

export const ThemeFontsPreload = () => (
  <>
    <link
      rel="preload"
      href={`${concaveFontsSrc}/ProductSans-500.woff2`}
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      href={`${concaveFontsSrc}/SharpSans-800.woff2`}
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
  </>
)

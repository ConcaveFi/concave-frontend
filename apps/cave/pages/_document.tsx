import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ThemeFontsPreload, ColorModeScript } from '@concave/ui'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <ThemeFontsPreload />
        </Head>
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

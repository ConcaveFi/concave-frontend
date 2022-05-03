import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ThemeFontsPreload, ColorModeScript } from '@concave/ui'
import { GA_TRACKING_ID } from 'lib/env.conf'

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
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {/* consider using https://usefathom.com/ to replace Google  */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </body>
      </Html>
    )
  }
}

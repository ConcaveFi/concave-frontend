import { ColorModeScript, ThemeFontsPreload } from '@concave/ui'
import { GA_TRACKING_ID } from 'lib/env.conf'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

const TrackingScripts = () => (
  <>
    {/* Global Site Tag (gtag.js) - Google Analytics */}
    {/* consider using https://usefathom.com/ to replace Google  */}
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      strategy="worker"
    />
    <Script id="gtag" strategy="lazyOnload">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `}
    </Script>
  </>
)

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <ThemeFontsPreload />
          <TrackingScripts />
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

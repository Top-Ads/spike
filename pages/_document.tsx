import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles'
import { CDN } from '../public/environment'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new StyledComponentSheets()
    const materialUiSheets = new MaterialUiServerStyleSheets()

    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              materialUiSheets.collect(<App {...props} />),
        ),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
        <Html lang="it">
            <Head>
              <link rel="preconnect" href={`${CDN}`}/>
              <link rel="dns-prefetch" href={`${CDN}`}/>
             {/*  <link rel="apple-touch-icon" sizes="192x192" href={`${CDN}/png/touch_icon_iphone`}/>
              <link rel="apple-touch-icon" sizes="152x152" href={`${CDN}/png/touch_icon_ipad`}/>
              <link rel="apple-touch-startup-image" sizes="640x1136" href="/apple-spash_640.png"/> 
              <meta name="apple-mobile-web-app-status-bar-style" content="#e2b96d"/>*/}
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
}
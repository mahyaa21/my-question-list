import Document, {Head, Html, Main, NextScript} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="پلتفرم طراحی و پیاده سازی workflow"
          />
          <link rel="stylesheet" href="/static/fontiran.css" />
          <link rel="stylesheet" href="/static/css/main.css" />
          <link rel="apple-touch-icon" href="/static/images/icon_40pt@3x.png" />
          <meta name="apple-mobile-web-app-title" content="baseProject" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link
            rel="icon"
            href="/static/images/favicon.png"
            type="image/gif"
            sizes="16x16"
          />
        </Head>
        <body className="rtlLayout">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

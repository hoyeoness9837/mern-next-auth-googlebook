import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name='author' content='Hoyeon Kim' />
        <meta name='keywords' content='Google, Book, Search, React, Next' />
        <meta
          name='description'
          content='MERN stack application with Next. Seaching books via google book api and save for personal usage.'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

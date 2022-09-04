import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { RecoilRoot } from "recoil";
import Layout from "../components/layout/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>vdeantoni.com</title>
        <meta
          name="description"
          content="Web site about the software engineer Vinicius De Antoni"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-KRMQTNKF3C"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'G-KRMQTNKF3C');
        `}
      </Script>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </>
  );
}

export default MyApp;

import { GetStaticProps } from "next";
import Head from "next/head";
import Script from "next/script";

interface PageProps {
  clarityTrackingId: string;
}

const ExampleAMPPage = ({ clarityTrackingId }: PageProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Example AMP Page</title>
        <link rel="canonical" href="https://yourdomain.com/example" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YQ8C006ZEC"
        ></script>
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "nr9uu90bjk");`,
          }}
        />
      </Head>
      <main>
        <h1>Welcome to the Example AMP Page</h1>
        <p>This page is tracked by Microsoft Clarity.</p>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Fetch the Clarity tracking ID from your API
  const response = await fetch("https://amp-supabase.vercel.app/api/clarity");
  const data = await response.json();

  return {
    props: {
      clarityTrackingId: data.trackingId,
    },
  };
};

export default ExampleAMPPage;

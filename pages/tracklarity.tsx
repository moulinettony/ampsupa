import { GetStaticProps } from 'next';
import Head from 'next/head';

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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YQ8C006ZEC"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YQ8C006ZEC');
            `,
          }}
        />

        <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "nr9uu90bjk");
              `,
            }}
          />

        <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
        <script
          type="application/json"
          id="analytics-config"
        >
          {JSON.stringify({
            "requests": {
              "pageview": `https://www.clarity.ms/collect?tid=${clarityTrackingId}&type=pageview`
            },
            "triggers": {
              "trackPageview": {
                "on": "visible",
                "request": "pageview"
              }
            }
          })}
        </script>
        <style amp-custom>{`
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          h1 {
            color: #333;
          }
        `}</style>
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
  const response = await fetch('https://amp-supabase.vercel.app/api/clarity');
  const data = await response.json();
  
  return {
    props: {
      clarityTrackingId: data.trackingId,
    },
  };
};

export default ExampleAMPPage;

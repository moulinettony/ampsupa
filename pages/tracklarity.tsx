import Head from "next/head";
import Script from "next/script";

const ExampleAMPPage = () => {
  return (
    <>
      <Head>
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

export default ExampleAMPPage;

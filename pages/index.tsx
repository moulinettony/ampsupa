import { useEffect, useState } from "react";
import { format } from "date-fns";
import Head from "next/head";
import Script from "next/script";
import styles from "./index.module.css";
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
interface DataItem {
  id: number;
  name: string;
  created_at: string;
  email: string;
}

const ApiDataPage = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-P92H83LH9B";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", "G-P92H83LH9B");
    };
  }, []);

  useEffect(() => {
    // Append the GTM script to the head
    const script = document.createElement("script");
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-WWPWHMDG');
    `;
    document.head.appendChild(script);

    // Append the noscript part inside the body
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WWPWHMDG"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.appendChild(noscript);
  }, []);

  useEffect(() => {
    // Append the Microsoft Clarity script to the head
    const script = document.createElement("script");
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "nr9uu90bjk");
    `;
    document.head.appendChild(script);
  }, []);

  /* useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log("Fetched data:", jsonData); // Inspect the fetched data
        if (jsonData && Array.isArray(jsonData.items)) {
          setData(jsonData.items);
        } else {
          console.error("Fetched data is not an array:", jsonData);
          throw new Error("Response is not an array");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }*/

  return (
    <>
      <Head>
        <title>Clarity Test</title>
      </Head>
      <div className={styles.container}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WWPWHMDG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <h1 className={styles.title}>Welcome</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
            </tr>
          </thead>
          {/*<tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  {format(new Date(item.created_at), "dd MMMM yyyy, HH:mm")}
                </td>
              </tr>
            ))}
          </tbody>*/}
        </table>
      </div>
    </>
  );
};

export default ApiDataPage;

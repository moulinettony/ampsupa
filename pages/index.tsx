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
      gtag('js', new Date());
      gtag('config', 'G-P92H83LH9B');
    };
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
        {/* Inline script for configuring Clarity */}
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
      <div className={styles.container}>
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

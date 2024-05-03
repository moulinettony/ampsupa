import { useEffect, useState } from 'react';
import styles from './index.module.css';

const ApiDataPage = () => {
    const [data, setData] = useState<any[]>([]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/data'); 
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>API Data</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApiDataPage;

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import styles from './index.module.css';

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
        const fetchData = async () => {
            try {
                const response = await fetch('/api/data');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonData = await response.json();
                console.log('Fetched data:', jsonData); // Inspect the fetched data
                if (jsonData && Array.isArray(jsonData.items)) {
                    setData(jsonData.items);
                } else {
                    console.error('Fetched data is not an array:', jsonData);
                    throw new Error('Response is not an array');
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
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>API Data</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{format(new Date(item.created_at), 'dd MMMM yyyy, HH:mm')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApiDataPage;

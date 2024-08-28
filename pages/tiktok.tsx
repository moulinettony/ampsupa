// components/TikTokVideos.tsx
import React, { useEffect, useState } from 'react';

interface Video {
    id: string;
    title: string;
    video_description: string;
    duration: number;
    cover_image_url: string;
    embed_link: string;
}

const Home: React.FC = () => {
    const accessToken = 'your_actual_access_token_here'; // Replace with your actual access token
    const openId = 'your_actual_open_id_here'; // Replace with the actual open ID of the TikTok user

    const [videos, setVideos] = useState<Video[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(`/api/tiktok/user-posts?accessToken=${accessToken}&openId=${openId}`);
                const data = await response.json();

                if (!response.ok) {
                    setError(data.error?.message || 'Failed to fetch videos');
                    return;
                }

                setVideos(data);
            } catch (err) {
                setError('An unexpected error occurred');
            }
        };

        if (accessToken && openId) {
            console.log('Access Token:', accessToken); // Log the token for debugging
            console.log('Open ID:', openId); // Log the Open ID for debugging
            fetchVideos();
        } else {
            setError('Access token and open_id are required');
        }
    }, [accessToken, openId]);

    return (
        <div>
            <h1>Display TikTok User Posts</h1>
            {error && <p>{error}</p>}
            <div>
                {videos.length > 0 ? (
                    videos.map((video) => (
                        <div key={video.id}>
                            <h3>{video.title}</h3>
                            <p>{video.video_description}</p>
                            <img src={video.cover_image_url} alt={video.title} />
                            <a href={video.embed_link} target="_blank" rel="noopener noreferrer">Watch Video</a>
                        </div>
                    ))
                ) : (
                    <p>No videos available</p>
                )}
            </div>
        </div>
    );
};

export default Home;
// pages/api/tiktok/videos.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

interface Video {
    id: string;
    title: string;
    video_description: string;
    duration: number;
    cover_image_url: string;
    embed_link: string;
}

interface VideosResponse {
    data: {
        videos: Video[];
    };
    error?: {
        code: string;
        message: string;
        log_id: string;
    };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { accessToken, openId } = req.query;

    if (!accessToken || !openId) {
        return res.status(400).json({ error: 'Access token and open_id are required' });
    }

    try {
        const response = await fetch(`https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,duration,cover_image_url,embed_link`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                max_count: 6, // Limit the number of videos to 6
                open_id: openId,
            }),
        });

        const responseData = (await response.json()) as VideosResponse; // Cast response to VideosResponse

        // Log the full response for debugging
        console.log('TikTok API response:', responseData);

        if (!response.ok || !responseData.data) {
            console.error('Error fetching videos:', responseData);
            return res.status(response.status).json({ error: responseData.error || 'Failed to fetch videos' });
        }

        // Return the user's TikTok videos
        res.status(200).json(responseData.data.videos);
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
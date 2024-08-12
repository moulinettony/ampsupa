// pages/api/insta2.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const INSTAGRAM_API_URL = `https://graph.instagram.com`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN_2;
  const userId = process.env.INSTAGRAM_USER_ID_2;
  const fields = 'id,caption,media_type,media_url,thumbnail_url,timestamp,permalink';
  const limit = 6;

  try {
    const response = await fetch(
      `${INSTAGRAM_API_URL}/${userId}/media?fields=${fields}&access_token=${accessToken}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error(`Instagram API responded with status ${response.status}`);
    }
    const data = await response.json();

    // Transform the data
    const transformedData = {
      items: data.data,
    };

    res.setHeader('Access-Control-Allow-Origin', 'https://taptam.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    res.status(200).json(transformedData);
  } catch (error: any) {
    console.error('Error fetching Instagram posts:', error.message);
    res.status(500).json({ error: 'Failed to fetch Instagram posts' });
  }
}

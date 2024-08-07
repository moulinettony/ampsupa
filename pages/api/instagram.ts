// pages/api/instagram.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const INSTAGRAM_API_URL = `https://graph.instagram.com`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
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
    res.status(200).json(data);
  } catch (error:any) {
    console.error('Error fetching Instagram posts:', error.message);
    res.status(500).json({ error: 'Failed to fetch Instagram posts' });
  }
}

// pages/api/getUserId.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN_2;

  try {
    const response = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user ID');
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user ID' });
  }
}

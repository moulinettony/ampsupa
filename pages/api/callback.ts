// pages/api/callback.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

interface TokenResponse {
    data: {
        access_token: string;
        open_id: string;
    };
    error?: {
        code: string;
        message: string;
        log_id: string;
    };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const CLIENT_KEY = 'sbawa1u6ctdfg8nl6h';
    const CLIENT_SECRET = 'Ezu8j2TYwZj4PUJ9nkoorHv3g4GrtHXo';
    const REDIRECT_URI = 'https://amp-supabase.vercel.app/api/callback';

    // Extract the authorization code from the query parameters
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: 'Authorization code is missing' });
    }

    try {
        // Exchange the authorization code for an access token and open ID
        const response = await fetch('https://www.tiktok.com/v2/oauth/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_key: CLIENT_KEY,
                client_secret: CLIENT_SECRET,
                code: code as string, // Use the code from the query parameter
                grant_type: 'authorization_code',
                redirect_uri: REDIRECT_URI,
            }).toString(),
        });

        const data = (await response.json()) as TokenResponse; // Type assertion

        if (data.error) {
            return res.status(400).json({ error: data.error.message });
        }

        const accessToken = data.data.access_token;
        const openId = data.data.open_id;

        // Optionally, store these tokens in a secure location
        // For this example, we'll just return them in the response
        res.status(200).json({ accessToken, openId });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching token' });
    }
}

const CLIENT_KEY = 'sbawa1u6ctdfg8nl6h';
const REDIRECT_URI = 'https://amp-supabase.vercel.app/api/callback';

const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${CLIENT_KEY}&response_type=code&scope=user.info.basic,video.list&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
console.log(authUrl);
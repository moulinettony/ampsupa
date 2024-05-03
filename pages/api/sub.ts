export default function handler(req:any, res:any) {

    res.setHeader('Access-Control-Allow-Origin', 'https://rolling.mydopweb.com');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
      }
      
    const { name, email } = req.body;
  
    const redirectUrl = `https://www.dopweb.com/?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
  
    res.setHeader('AMP-Redirect-To', redirectUrl);
    res.setHeader('Access-Control-Expose-Headers', 'AMP-Redirect-To');
    res.status(200).json({ message: "Redirecting..." });
  }
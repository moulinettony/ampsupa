import { NextApiRequest, NextApiResponse } from 'next';

interface ClarityResponse {
  trackingId: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ClarityResponse>
) {
  res.status(200).json({ trackingId: 'nr9uu90bjk' });
}
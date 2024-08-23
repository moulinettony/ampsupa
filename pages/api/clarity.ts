// /pages/api/clarity.ts
import { NextApiRequest, NextApiResponse } from 'next';

interface ClarityData {
  projectId: string;
  trackingUrl: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ClarityData>) {
  const data: ClarityData = {
    projectId: "nr9uu90bjk",
    trackingUrl: `https://www.clarity.ms/tag/nr9uu90bjk`,
  };

  res.status(200).json(data);
}
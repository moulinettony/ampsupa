// pages/api/clarity.ts

import type { NextApiRequest, NextApiResponse } from 'next';

type ClarityData = {
  projectId: string;
  trackingUrl: string;
};

type ResponseData = {
  items: ClarityData[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const data: ClarityData = {
    projectId: 'nr9uu90bjk',
    trackingUrl: 'https://www.clarity.ms/tag/nr9uu90bjk',
  };

  res.status(200).json({ items: [data] });
}

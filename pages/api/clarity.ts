// pages/api/clarity.ts

import type { NextApiRequest, NextApiResponse } from "next";

type ClarityData = {
  projectId: string;
  trackingUrl: string;
};

type ResponseData = {
  items: ClarityData[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Add the CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://rolling.mydopweb.com");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight (OPTIONS) request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const data: ClarityData = {
    projectId: "nr9uu90bjk",
    trackingUrl: "https://www.clarity.ms/tag/nr9uu90bjk",
  };

  res.status(200).json({ items: [data] });
}

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cid, iid } = req.query; // get id from URL
  console.log("CID", cid);
  console.log("IID", iid);
  try {
    const response = await axios.get(
      `${process.env.NEXT_BACKEND_URL}/insight-category/${cid}/insight/${iid}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Server error",
    });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tid,pid } = req.query;
  console.log("profileid in api", {tid,pid});

  try {
    const response = await axios.get(
      `${process.env.NEXT_BACKEND_URL}/profile/${tid}/project/${pid}`,
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

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  try {
    const response = await axios.post(
      `${process.env.NEXT_BACKEND_URL}/profile/${id}/education/`,
      req.body,
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

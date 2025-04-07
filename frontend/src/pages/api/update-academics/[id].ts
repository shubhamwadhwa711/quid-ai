import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {id } = req.query;
  try {
    const response = await axios.patch(
      `${process.env.NEXT_BACKEND_URL}/education/${id}/`,
      req.body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("[ERROR academics] : ",error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Server error",
    });
  }
}

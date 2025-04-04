import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("CREATE SKILL");
    const response = await axios.post(
      `${process.env.NEXT_BACKEND_URL}/skill/`,
        req.body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data);

    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Server error",
    });
  }
}

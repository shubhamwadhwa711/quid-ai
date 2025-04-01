import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("TOP TALENTS");
    const response = await axios.get(
      `${process.env.NEXT_BACKEND_URL}/top-profile/`,
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

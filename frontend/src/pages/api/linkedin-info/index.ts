import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  console.log("Session:", session);

  const accessToken = session?.provider?.tokens?.access_token;

  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized: No access token" });
  }

  try {
    const response = await axios.get("https://api.linkedin.com/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const LinkedInUserInfo = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.status(200).json({ ...response.data, ...LinkedInUserInfo.data });
  } catch (error: any) {
    console.error(
      "LinkedIn API Error:",
      error?.response?.data || error.message
    );
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Server error",
    });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    console.log("req.query", req.query);
  
    try {
      const response = await axios.get(
        `${process.env.NEXT_BACKEND_URL}/profile-related`,
        {
          params: req.query,
          paramsSerializer: (params) => {
            return new URLSearchParams(
              Object.entries(params).reduce((acc, [key, value]) => {
                const newKey = key.endsWith("[]") ? key.slice(0, -2) : key; // 🔹 Remove "[]"
                if (Array.isArray(value)) {
                  value.forEach((v) => acc.append(newKey, v)); // 🔹 Convert array to repeated params
                } else {
                  acc.append(newKey, value as string);
                }
                return acc;
              }, new URLSearchParams())
            ).toString();
          },
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
  
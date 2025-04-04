import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
   console.log("req.query", req.query);
    try {
      const response = await axios.get(
        `${process.env.NEXT_BACKEND_URL}/country`,
        {
          params: req.query,
          paramsSerializer: (params) => {
            const searchParams = new URLSearchParams();
            
            Object.entries(params).forEach(([key, value]) => {
              if (key === "search") {
                console.log("value", value);
                // Ensure search param is a string, not an array
                searchParams.append(key, Array.isArray(value) ? value[0] : value as string);
              } else if (Array.isArray(value)) {
                value.forEach((v) => searchParams.append(key, v)); // 🔹 Append each array item separately
              } else {
                searchParams.append(key, value as string);
              }
            });
          
            return searchParams.toString();
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
  
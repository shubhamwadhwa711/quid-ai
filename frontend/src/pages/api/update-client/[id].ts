import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import axios from "axios";
import fs from "fs"; // Needed for file handling

// Disable default body parsing in Next.js
export const config = {
  api: {
    bodyParser: false, // ✅ Important for handling multipart/form-data
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const {id} = req.query;
  console.log("req.query", req.query);
  
  // Use formidable to parse incoming form data
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form data:", err);
      return res.status(500).json({ error: "Error parsing form data" });
    }

    console.log("Fields:", fields);
    console.log("Files:", files);

    try {
      const formData = new FormData();

      // Append text fields
      for (const key in fields) {
        const value = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
        if (value !== undefined) {
          formData.append(key, value as string);
        }
      }

      // Append files if any
      for (const key in files) {
        const fileEntry = files[key];
        const file = Array.isArray(fileEntry) ? fileEntry[0] : fileEntry;
        if (file) {
          const fileStream = fs.createReadStream(file.filepath);
          const filename = file.originalFilename || undefined;
          formData.append(key, fileStream as any, filename);
        }
      }

      // Send the processed form data to the backend
      const response = await axios.patch(
        `${process.env.NEXT_BACKEND_URL}/profile/${id}/feature-client/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      res.status(200).json(response.data);
    } catch (error: any) {
      console.error("Axios error:", error);
      res.status(error.response?.status || 500).json({
        error: error.response?.data || "Server error",
      });
    }
  });
}

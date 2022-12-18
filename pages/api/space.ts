import { UPLOADED_IMAGES_PATH } from "./../../config/constants";
import formidable from "formidable";
import { NextApiHandler, NextApiRequest } from "next";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest,
  saveLocally = true
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), UPLOADED_IMAGES_PATH);
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler: NextApiHandler = async (req, res) => {
  try {
    await fs.readdir(path.join(process.cwd(), UPLOADED_IMAGES_PATH));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd(), UPLOADED_IMAGES_PATH));
  }

  const data = await readFile(req);
  res.json({ done: "ok", data });
};

export default handler;

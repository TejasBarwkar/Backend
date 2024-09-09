import path from "path";
import fs from "fs";

const STORAGE_DESTINATION = "images";

export const saveImageToDisk = (
  file: Express.Multer.File,
  filename: string
) => {
  const ext = path.extname(file.originalname);
  const filepath = `${STORAGE_DESTINATION}/${filename.toLowerCase()}${ext}`;

  fs.writeFileSync(filepath, file.buffer);

  return filepath;
};

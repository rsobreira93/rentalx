import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

export default {
  upload(folder: string) {
    return multer({
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;
          return callback(null, fileName);
        },
      }),
      fileFilter: (request, file, callback) => {
        const allowedMimes = [
          "image/jpeg",
          "image/pjpeg",
          "image/png",
          "image/gif",
        ];

        if (allowedMimes.includes(file.mimetype)) {
          return callback(null, true);
        }

        return callback(new Error("Invalid file type."));
      },
    });
  },
};

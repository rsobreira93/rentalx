import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImage = container.resolve(UploadCarImageUseCase);

    const fileNames = images.map((image) => image.filename);

    await uploadCarImage.execute({
      car_id: id,
      images_name: fileNames,
    });

    return response.status(201).json({ message: "images sent with success" });
  }
}

export { UploadCarImageController };

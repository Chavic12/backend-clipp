import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
@Injectable()
export class CloudinaryService {
  async deleteImage(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve();
      });
    });
  }
  async uploadImage(
    file: Express.Multer.File, id: number
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const imageName = `beneficioImage${id}`;
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream({ public_id: imageName }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
}
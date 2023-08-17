import { v2, ConfigOptions } from 'cloudinary'; // Asegúrate de importar ConfigOptions
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): ConfigOptions => { // Cambia el tipo de retorno a ConfigOptions
    return v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINAY_API_SECRET,
    });
  },
};

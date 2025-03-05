import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.config';

const cloud = env.cloud;

cloudinary.config({
  cloud_name: cloud.name, // Замени на свое имя облака
  api_key: cloud.key, // Замени на свой API-ключ
  api_secret: cloud.secret, // Замени на свой секретный ключ
});

export default cloudinary;

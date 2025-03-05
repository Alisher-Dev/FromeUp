import { config } from 'dotenv';
config();

export const env = {
  port: process.env.PORT,
  cloud: {
    name: process.env.CLOUD_NAME,
    key: process.env.CLOUD_KEY,
    secret: process.env.CLOUD_SECRET,
  },
  jwt: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    accessExpire: process.env.ACCESS_TOKEN_EXPIRE,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshExpire: process.env.REFRESH_TOKEN_EXPIRE,
  },
};

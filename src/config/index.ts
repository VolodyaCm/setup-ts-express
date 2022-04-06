import dotenv from 'dotenv';
import path from 'path';

const { NODE_ENV } = process.env;
export const isProd = NODE_ENV === 'production';
export const isDev = !isProd;

const dotenvFilePath = path.resolve(
  __dirname,
  isProd ? '../../prod.env' : '../../dev.env'
);

dotenv.config({ path: dotenvFilePath });

import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  BCRYPT_SALT: process.env.BCRYPT_SALT,
  JWT_SECRET: process.env.JWT_SECRET,
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  SP_ENDPOINT: process.env.SP_ENDPOINT,
  SP_USERNAME: process.env.SP_USERNAME,
  SP_PASSWORD: process.env.SP_PASSWORD,
  SP_PREFIX: process.env.SP_PREFIX,
  SP_RETURN_URL: process.env.SP_RETURN_URL,
}

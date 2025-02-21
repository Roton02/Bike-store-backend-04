import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
import config from '../config'

// Ensure uploads folder exists
const uploadDir = './uploads'
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads')
  },
  filename(req, file, callback) {
    const ext = path.extname(file.originalname)
    const fileName =
      file.originalname.replace(ext, '').split(' ').join('-').toLowerCase() +
      '-' +
      Date.now()
    callback(null, fileName + ext)
  },
})

const upload = multer({ storage })

export default upload

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
})

export const cloudinaryImage = (image: string, filePath: string) => {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(filePath)
    cloudinary.uploader.upload(
      absolutePath,
      { public_id: image.trim() },
      (error, result) => {
        if (fs.existsSync(absolutePath)) {
          fs.unlinkSync(absolutePath) // Delete file after upload
        }
        if (error) {
          reject(error)
        }
        resolve(result)
      }
    )
  })
}

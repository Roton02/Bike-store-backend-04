import multer from 'multer'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
import config from '../config'
import fs from 'fs'

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads')
  },
  filename(req, file, callback) {
    const ext = path.extname(file.originalname)
    const fileName =
      file.originalname.replace(ext, ' ').split(' ').join('-').toLowerCase() +
      '-' +
      Date.now()
    callback(null, fileName + ext)
    // console.log(file)
  },
})

const upload = multer({ storage: storage })

export default upload

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
})

export const cloudinaryImage = (image: string, path: string) => {
  return new Promise((resolve, rejects) => {
    cloudinary.uploader.upload(
      path,
      { public_id: image.trim() },
      (error, result) => {
        fs.unlinkSync(path)
        if (error) {
          rejects(error)
        }
        resolve(result)
      }
    )
  })
}

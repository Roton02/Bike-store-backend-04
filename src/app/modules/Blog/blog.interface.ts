import { Types } from 'mongoose'

interface IBlog {
  title: string
  content: string
  author: Types.ObjectId
  isPublished?: boolean
}

export default IBlog

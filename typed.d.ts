import { timeStamp } from 'console'

export interface PostType {
  id: string
  data: DataType
}
export interface DataType {
  email: string
  name: string
  postImage: string
  text: string
  timestamp: Timestamp
  userImage: string
}

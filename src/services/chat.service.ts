import { Timestamp } from 'firebase/firestore'

export const getEmptyMsg = () => {
  return {
    _id: '',
    sender: '',
    content: '',
    createdAt: Timestamp.now(),
  }
}
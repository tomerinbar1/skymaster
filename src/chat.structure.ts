import { Timestamp } from 'firebase/firestore'

export interface Msg {
  _id: string
  sender: string
  content: string
  createdAt: Timestamp
}

export interface Contact {
  _id: string
  chatIDs: string[]
  displayName: string
}

export interface Chat {
  _id: string
  msgs: Msg[] | null
  participants: string[]
  createdAt: Timestamp
}

/* When user is logged-in the store state will be populated with the user data.
 
When user send a new message:
 1. a function will check if the chat ID is already exists via getChatByID from contact.chat array in the contact object, if not it will create a new chat via firestore.
 2. the store state will be updated with the new message
 3. the chat component will be updated with the new message
 */

import {Timestamp} from 'firebase/firestore'

export interface TextService {
    (req: string): {
        minAge: string
        theoryList: string[]
        reqTests: string[]
        initial: string[]
    }
}

export interface User {
    uid: string | null | undefined
    displayName: string | null | undefined
    photoURL: string | null | undefined
}

export interface Msg {
    _id: string | null | undefined
    sender: string | null | undefined
    content: string
    createdAt: Timestamp
  }
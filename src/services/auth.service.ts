import firebaseApp from './firebase'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  getRedirectResult,
  updateProfile,
  signInWithRedirect,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth'
import { getDocs, doc, setDoc, Timestamp } from 'firebase/firestore'
import { firestoreService } from './firebase'

const auth = getAuth(firebaseApp)

const onGetAuth = () => {
  return getAuth(firebaseApp)
}

const getCurrentUser = () => {
  return auth.currentUser
}

const signIn = async (email: string, password: string) => {
  try {
    await setPersistence(auth, browserSessionPersistence)
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential
  } catch (error: any) {
    let errorCode = error.code
    let errorMessage = error.message
    if (errorCode === 'auth/wrong-password') {
      throw 'סיסמה שגויה'
    } else if (errorCode === 'auth/user-not-found') {
      throw 'משתמש לא קיים'
    } else if (errorCode === 'auth/invalid-email') {
      throw 'אימייל לא תקין'
    } else {
      throw errorMessage
    }
  }
}

const signUp = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    if (auth.currentUser !== null) {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      })
    }
    return userCredential
  } catch (error: any) {
    let errorCode = error.code
    let errorMessage = error.message
    if (errorCode === 'auth/email-already-in-use') {
      throw 'משתמש קיים'
    } else if (errorCode === 'auth/invalid-email') {
      throw 'אימייל לא תקין'
    } else if (errorCode === 'auth/weak-password') {
      throw 'סיסמה חלשה'
    } else {
      throw errorMessage
    }
  }
}

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    await setPersistence(auth, browserSessionPersistence)
    return signInWithRedirect(auth, provider)
  } catch (error: any) {
    throw error
  }
}

const getSignInResult = async () => {
  try {
    const userCredential = await getRedirectResult(auth)
    return userCredential
  } catch (error: any) {
    throw error
  }
}

const signOut = async () => {
  try {
    await auth.signOut()
  } catch (error: any) {
    console.error(error)
  }
}

const writeUserData = async (user: any) => {
  try {
    const usersSnapshot = await getDocs(firestoreService.usersCollection)
    const isFirstUser = usersSnapshot.empty
    const userCreated = Timestamp.now()

    await setDoc(doc(firestoreService.usersCollection, user.uid), {
      ...user,
      isOwner: isFirstUser,
      userCreated,
    })
  } catch (error) {
    console.log('Error writing document: ', error)
  }
}

export const authService = {
  signIn,
  signUp,
  signInWithGoogle,
  signOut,
  getCurrentUser,
  onGetAuth,
  getSignInResult,
  writeUserData,
}

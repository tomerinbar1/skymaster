import { defineStore } from 'pinia'
import { authService } from '../services/auth.service'
import { onAuthStateChanged, User } from 'firebase/auth'
import { computed, ref } from 'vue'

type AuthState = User | null


export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthState>(null)

  function init() {
    const auth = authService.onGetAuth()
    onAuthStateChanged(auth, currentUser => {
      user.value = currentUser
    })
    }

    async function login(email: string, password: string) {
      try {
        const userCredential = await authService.signIn(email, password)
        user.value = userCredential.user
      } catch (error: any) {
        throw new Error(error.message)
      }
    }

    async function signInWithGoogleRedirect() {
      await authService.signInWithGoogle()
      const userCredential = await authService.getSignInResult()
      if (userCredential?.user) {
        user.value = userCredential.user
      }
    }

    async function register(email: string, password: string, displayName: string) {
      try {
        const userCredential = await authService.signUp(email, password, displayName)

        if (userCredential.user) {
          user.value = userCredential.user
          await authService.writeUserData({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
          })
        }
      } catch (error: any) {
        throw error || 'Registration failed'
      }
    }

    async function logout() {
      await authService.signOut()
      user.value = null
    }

    const currentUser = computed(() => user)
    const isLoggedIn = computed(() => !!user)

    return { user, currentUser, isLoggedIn, init, login, logout, register, signInWithGoogleRedirect }
  })

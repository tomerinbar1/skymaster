import {defineStore} from 'pinia'
import {authService} from '../services/auth.service'
import {onAuthStateChanged, User} from 'firebase/auth'

interface InitializeAuthState {
    user: User | null
}

const initialState: InitializeAuthState = {
    user: null,
}

export const useAuthStore = defineStore('auth', {
    state: () => (initialState),
    getters: {
        isLoggedIn: state => !!state.user,
        currentUser(state) {
            return state.user
        },
    },
    actions: {
        async init() {
            const auth = authService.onGetAuth()
            onAuthStateChanged(auth, user => {
                this.user = user
            })
        },

        async login(email: string, password: string) {
            try {
                const userCredential = await authService.signIn(email, password)
                this.user = userCredential.user
            } catch (error: any) {
                throw new Error(error.message)
            }
        },

        async signInWithGoogleRedirect() {
            await authService.signInWithGoogle()
            const userCredential = await authService.getSignInResult()
            const user = userCredential?.user
            if (user) {
                this.user = user
            }
        },

        async register(email: string, password: string, displayName: string) {
            try {
                const userCredential = await authService.signUp(
                    email,
                    password,
                    displayName
                )
                const user = userCredential.user

                if (user) {
                    this.user = user
                    await authService.writeUserData({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                    })
                }
            } catch (error: any) {
                throw error || 'Registration failed'
            }
        },

        async logout() {
            await authService.signOut()
            this.user = null
        },
    },
})

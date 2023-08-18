<template>
  <div class="signIn-page">
    <form class="signIn-form" @submit.prevent="onSignIn">
      <h1>התחבר/י</h1>

      <section class="signIn-inputs">
        <label for="email">אימייל:</label>
        <input type="text" id="email" v-model="email" autocomplete="username" />
        <label for="password">סיסמה:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          autocomplete="current-password"
        />
      </section>

      <div class="error-msg" v-if="errMsg">
        {{ errMsg }}
      </div>

      <section class="actions-btn">
        <button class="regular-signIn" type="submit">התחבר</button>
        <button class="google-signIn" @click="onGoogleSignIn">
          <img :src="google_btn" alt="Google" />
        </button>
      </section>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import google_btn from '../assets/img/btn_google_signin.png'

export default defineComponent({
  name: 'signInPage',
  setup() {
    const authStore = useAuthStore()
    
    const email = ref('')
    const password = ref('')
    const router = useRouter()
    const errMsg = ref('')

    const onSignIn = async () => {
      try {
        await authStore.login(email.value, password.value)
        router.push('/')
      } catch (err: any) {
        errMsg.value = err
      }
    }

    const onGoogleSignIn = async () => {
      try {
        await authStore.signInWithGoogleRedirect()
      } catch (err: any) {
        errMsg.value = err
      }
    }

    const onSignOut = () => {
      authStore.logout()
    }

    watch(
      () => authStore.user,
      () => {
        if (authStore.user) {
          router.push('/')
        }
      }
    )

    return {
      email,
      password,
      onSignIn,
      onGoogleSignIn,
      onSignOut,
      errMsg,
      google_btn,
    }
  },
})
</script>

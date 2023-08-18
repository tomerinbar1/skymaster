<template>
  <div class="signUp-page">
    <form class="signUp-form" @submit.prevent="onSignUp">
      <h1>הרשם/י</h1>

      <section class="signUp-inputs">
        <label for="email">אימייל:</label>
        <input type="text" id="email" v-model="email" autocomplete="username" />
        <label for="password">סיסמה:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          autocomplete="current-password"
        />
        <label for="displayName">שם מלא:</label>
        <input type="text" id="displayName" v-model="displayName" />
      </section>

      <div class="error-msg" v-if="errMsg">
        {{ errMsg }}
      </div>

      <section class="actions-btn">
        <button class="regular-signUp" type="submit">רישום</button>
        <button class="google-signIn" @click="onGoogleSignIn">
          <img :src="google_btn" alt="Google" />
        </button>
      </section>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import google_btn from '../assets/img/btn_google_signin.png'
import { useAuthStore } from '../stores/auth.store'

export default defineComponent({
  name: 'signUpPage',
  setup() {
    const authStore = useAuthStore()

    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const displayName = ref('')
    const errMsg = ref('')

    const onSignUp = async () => {
      try {
        await authStore.register(email.value, password.value, displayName.value)
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

    return {
      email,
      password,
      displayName,
      onSignUp,
      onGoogleSignIn,
      google_btn,
      errMsg,
    }
  },
})
</script>

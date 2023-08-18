<template>
  <div class="profile-menu">
    <div class="welcome">
      {{ isLoggedIn ? 'ברוך הבא, ' + loginUser : 'שלום אורח, התחבר' }}
    </div>
    <img
      @click="toggleDropdown"
      src="../assets/icons/pilot-logo.svg"
      alt="profile"
    />
    <ul v-show="isDropdownOpen" class="dropdown-list">
      <li v-if="!isLoggedIn">
        <router-link to="/register" @click="closeDropdown">הרשמה</router-link>
      </li>
      <li v-if="!isLoggedIn">
        <router-link to="/login" @click="closeDropdown">התחברות</router-link>
      </li>
      <li v-if="isLoggedIn" @click="handleSignOut">התנתק</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

export default defineComponent({
  name: 'ProfileMenu',
  setup() {
    const authStore = useAuthStore()
    const isDropdownOpen = ref(false)
    const router = useRouter()

    const loginUser = computed(() => authStore.user?.displayName)
    const isLoggedIn = computed(() => authStore.user !== null)

    const closeDropdown = () => {
      isDropdownOpen.value = false
    }

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value
    }

    const handleSignOut = () => {
      authStore.logout()
      router.push('/')
    }

    return {
      isDropdownOpen,
      isLoggedIn,
      toggleDropdown,
      handleSignOut,
      closeDropdown,
      loginUser,
    }
  },
})
</script>

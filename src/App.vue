<template>
  <section class="app-wrapper" dir="rtl">
    <header class="header-wrapper">
      <AppHeader :menuItems="menuItems"/>
      <Slide
          :closeOnNavigation="true"
          :crossIcon="false"
          right
          width="250"
          class="mobile-navbar"
      >
        <router-link
            class="menu-item"
            v-for="item in menuItems"
            :key="item.name"
            :to="item.path"
        >
          {{ item.name }}
        </router-link>
      </Slide>
    </header>
    <router-view/>
    <Chat/>
    <footer>
      <AppFooter/>
    </footer>
  </section>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue'
import {RouteRecordNormalized, useRoute, useRouter} from 'vue-router'
import firebaseDB from './services/firebase'
import {useAuthStore} from './stores/auth.store'
// @ts-ignore
import {Slide} from 'vue3-burger-menu'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import Chat from './components/Chat.vue'


const AUTH_PATHS = ['/login', '/register']


export default defineComponent({
  components: {
    AppHeader,
    Slide,
    AppFooter,
    Chat,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const user = useAuthStore().currentUser

    const relativeRoutes = router.getRoutes().filter(route => !AUTH_PATHS.includes(route.path))

    const menuItems = relativeRoutes.map(route => {
      const {name, path} = route
      return {
        name,
        path,
      } as RouteRecordNormalized
    })

    onMounted(() => useAuthStore().init())

    return {
      firebaseDB,
      router,
      route,
      menuItems,
    }
  },
})
</script>

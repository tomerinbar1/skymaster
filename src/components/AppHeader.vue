<template>
  <nav class="desktop-navbar">
    <router-link
      class="menu-item"
      v-for="item in menuItems"
      :key="item.name"
      :to="item.path"
    >
      {{ item.name }}
    </router-link>
  </nav>
  <ProfileMenu />
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import ProfileMenu from './ProfileMenu.vue'
import { RouteRecordNormalized} from "vue-router";

export default defineComponent({
  props: {
    menuItems: {
      required: true,
      type: Array as PropType<RouteRecordNormalized[]>,
    },
  },
  name: 'AppHeader',
  components: {
    ProfileMenu,
  },
})
</script>

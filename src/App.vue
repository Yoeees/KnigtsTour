<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="h-screen  flex flex-col justify-center items-center bg-gradient-to-br from-black to-gray-800 text-white text-center overflow-y-auto">
    <router-view v-slot="{ Component }">
      <transition
        name="route"
        mode="out-in"
        appear
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>


.route-enter-active,
.route-leave-active {
  transition: all 0.4s ease-out;
}

.route-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
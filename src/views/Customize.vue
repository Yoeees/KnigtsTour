<script setup>
import { ref } from 'vue'
// Import images directly
import knight1 from '@/assets/img/knight.svg'
import knight2 from '@/assets/img/Knights2.svg'
import knight3 from '@/assets/img/Knight.svg'

const skins = ref([
  knight1,
  knight2,
  knight3,
])

const currentSkin = ref(0)

const prevSkin = () => {
  currentSkin.value = (currentSkin.value - 1 + skins.value.length) % skins.value.length
}

const nextSkin = () => {
  currentSkin.value = (currentSkin.value + 1) % skins.value.length
}

const selectSkin = () => {
  alert(`You selected Skin ${currentSkin.value + 1}`)
}

const uploadSkin = () => {
  alert('Skin upload functionality coming soon!')
}
</script>

<template>
  <div class="h-full w-full flex items-center justify-center">
    <div class="w-full max-w-lg p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm text-center shadow-lg">
      <h2 class="text-2xl font-bold text-white mb-4">
        Choose Your Knight Skin
      </h2>

      <!-- Knight Skin Carousel -->
      <div class="relative w-full aspect-square bg-gray-700 rounded-lg overflow-hidden shadow-md">
        <!-- Previous Button -->
        <button
          @click="prevSkin"
          aria-label="Previous Skin"
          class="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-gray-800/50 hover:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full transition-all duration-300 group"
        >
          <svg
            class="w-6 h-6 text-white transform group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Skin Display -->
        <transition
          mode="out-in"
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-300 ease-in"
          enter-from-class="opacity-0 scale-95"
          leave-to-class="opacity-0 scale-105"
        >
          <img
            :key="currentSkin"
            :src="skins[currentSkin]"
            :alt="`Knight Skin ${currentSkin + 1}`"
            class="w-full h-full object-contain p-4"
          />
        </transition>

        <!-- Next Button -->
        <button
          @click="nextSkin"
          aria-label="Next Skin"
          class="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-gray-800/50 hover:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full transition-all duration-300 group"
        >
          <svg
            class="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Action Buttons -->
      <div class="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
        <!-- Select Skin Button -->
        <button
          @click="selectSkin"
          class="px-4 py-2 text-lg font-semibold text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 focus:ring-4 focus:ring-green-500/50 rounded-lg transition-all duration-300 hover:scale-105 active:scale-100 shadow-lg"
        >
          Select This Skin
        </button>

        <!-- Upload Skin Button -->
        <button
          @click="uploadSkin"
          class="px-4 py-2 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 focus:ring-4 focus:ring-purple-500/50 rounded-lg transition-all duration-300 hover:scale-105 active:scale-100 shadow-lg flex items-center justify-center gap-2"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
            />
          </svg>
          Upload Skin
        </button>

        <!-- Main Button -->
        <router-link to="/">
          <button
            class="px-6 py-3 text-lg font-bold  text-white bg-gradient-to-r from-gray-800 to-black border-2 border-white hover:bg-gray-900 focus:ring-4 focus:ring-white/50 rounded-lg transition-transform duration-300 hover:scale-105 active:scale-100"
          >
            Menu
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backdrop-blur-sm {
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}

.aspect-square:hover {
  transform: scale(1.01);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>

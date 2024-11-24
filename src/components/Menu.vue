<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Main Section with Play Button -->
    <div class="flex items-center justify-center mb-8 space-x-4">
      <img
        src="../assets/img/Knights2.svg"
        alt="Knight's Tour Logo"
        class="w-16 h-16 md:w-24 md:h-24"
      />
      <h1 class="text-4xl font-extrabold text-white shadow-lg md:text-6xl chess-title">
        Knight's Tour
      </h1>
    </div>

    <div class="flex flex-col items-center justify-center w-4/5 max-w-md p-8 rounded-lg ">
      <button
        @click="showDialog = true"
        class="w-full max-w-xs px-6 py-4 mb-3 font-bold uppercase transition-transform duration-200 bg-black border-2 border-white rounded-md hover:scale-105 hover:bg-gray-800 active:scale-100"
      >
        Play
      </button>
      
      <button class="w-full max-w-xs px-6 py-4 mb-3 font-bold uppercase transition-transform duration-200 bg-black border-2 border-white rounded-md hover:scale-105 hover:bg-gray-800 active:scale-100">
        Challenge
      </button>
      <router-link to="/Customize" class="w-full">
        <button class="w-full max-w-xs px-6 py-4 mb-3 font-bold uppercase transition-transform duration-200 bg-black border-2 border-white rounded-md hover:scale-105 hover:bg-gray-800 active:scale-100">
        Customize
      </button>
      </router-link>

    </div>

    <!-- Dialog Component (controlled by showDialog) -->
    <settings :show="showDialog" @close="showDialog = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Settings from './Dialogues/Options.vue';

const showDialog = ref(false); // Controls visibility of the dialog
</script>


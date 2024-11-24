<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="flex flex-col items-center justify-center w-4/5 max-w-md p-8 rounded-lg backdrop-blur-md md:w-11/12 bg-white">
        <h2 class="text-2xl font-extrabold text-black mb-4">Choose Chessboard Size</h2>
        
        <div class="flex flex-col items-center w-full">
          <label for="size" class="mb-2 text-lg text-black">Enter the size of the chessboard:</label>
          <input
            v-model="boardSize"
            type="number"
            id="size"
            min="3"
            max="32"
            class="w-full max-w-xs px-4 py-2 mb-4 rounded-lg border border-gray-300 text-black"
            placeholder="Enter a number between 3 and 32"
          />
          
          
          <button
            @click="handleGenerate"
            class="w-full max-w-xs px-6 py-4 mb-3 font-bold uppercase transition-transform duration-200 bg-black border-2 border-white rounded-md hover:scale-105 hover:bg-gray-800 active:scale-100"
          >
            Generate
          </button>
          
          <button
            @click="closeDialog"
            class="w-full max-w-xs px-4 py-2 font-bold uppercase transition-transform duration-200 bg-red-500 border-2 border-white rounded-md hover:scale-105 hover:bg-red-600 active:scale-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  import { useRouter } from 'vue-router';  
  
  const props = defineProps({
    show: {
      type: Boolean,
      required: true,
    },
  });
  
  const emit = defineEmits(['close', 'generate-board']);
  const router = useRouter();  
  
  const boardSize = ref(8); 
  
  const handleGenerate = () => {
    if (boardSize.value < 3 || boardSize.value > 32) {
      alert("Please enter a board size between 3 and 32.");
    } else {
      console.log("Generating board with size:", boardSize.value);
      emit('generate-board', boardSize.value); 
      closeDialog();
      

      router.push({ name: 'Chessboard', query: { size: boardSize.value } });
    }
  };
  
  const closeDialog = () => {
    emit('close'); 
  };
  </script>
  
  <style scoped>
  </style>
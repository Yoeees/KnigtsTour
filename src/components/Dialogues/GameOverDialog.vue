<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  tourType: {
    type: String,
    required: true,
    validator: (value) => ['closed', 'open', 'incomplete'].includes(value)
  },
  moveCount: {
    type: Number,
    required: true
  },
  boardSize: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['close', 'playAgain']);

const messages = {
  closed: {
    title: "Congratulations! ",
    description: "You've completed a CLOSED KNIGHT'S TOUR. The knight can return to its starting position.",
    class: "bg-gray-900 border-green-500 text-green-400"
  },
  open: {
    title: "Tour Completed!",
    description: "You've completed an OPEN KNIGHT'S TOUR! All squares were visited exactly once.",
    class: "bg-gray-900 border-blue-500 text-blue-400"
  },
  incomplete: {
    title: "Game Over ⚠️",
    description: "No valid moves remaining. The knight is trapped!",
    class: "bg-gray-900 border-yellow-500 text-yellow-400"
  }
};

const goToMainMenu = () => {
  router.push('/');
};
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

      <!-- Dialog -->
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg border-2 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          :class="messages[tourType].class"
        >
          <!-- Content -->
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
              <h3 class="text-2xl font-semibold leading-6 mb-4">
                {{ messages[tourType].title }}
              </h3>
              <div class="mt-2">
                <p class="text-lg mb-4">
                  {{ messages[tourType].description }}
                </p>
                <div class="mt-4 space-y-2 bg-black bg-opacity-50 p-4 rounded-lg border border-gray-700">
                  <p class="font-semibold text-gray-300">Game Statistics:</p>
                  <p class="text-gray-400 capitalize">Tour Type: {{ tourType }}</p>
                  <p class="text-gray-400">Total Moves: {{ moveCount }}</p>
                  <p class="text-gray-400">Board Size: {{ boardSize }}x{{ boardSize }}</p>
                  <p class="text-gray-400">Squares Covered: {{ Math.round((moveCount / (boardSize * boardSize)) * 100) }}%</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-6 flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              class="w-full max-w-xs px-6 py-4 font-bold uppercase transition-transform duration-200 bg-gray-800 border-2 border-gray-600 rounded-md hover:scale-105 hover:bg-gray-700 active:scale-100 text-gray-300"
              @click="emit('close')"
            >
              Close
            </button>
            <button
              type="button"
              class="w-full max-w-xs px-6 py-4 font-bold uppercase transition-transform duration-200 bg-black border-2 border-gray-600 rounded-md hover:scale-105 hover:bg-gray-800 active:scale-100 text-gray-300"
              @click="goToMainMenu"
            >
              Main Menu
            </button>
            <button
              type="button"
              class="w-full max-w-xs px-6 py-4 font-bold uppercase transition-transform duration-200 bg-black border-2 border-white rounded-md hover:scale-105 hover:bg-gray-800 active:scale-100 text-white"
              @click="emit('playAgain')"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
</style>
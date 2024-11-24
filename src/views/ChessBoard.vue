<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { findNextMove, isValidMove } from '../Algorithm/warnsdorffsRule';
import IsClosedTour from '@/components/Dialogues/IsClosedTour.vue';
import GameOverDialog from '@/components/Dialogues/GameOverDialog.vue';

// Constants
const KNIGHT_MOVES = [
  { x: 2, y: 1 }, { x: 2, y: -1 },
  { x: -2, y: 1 }, { x: -2, y: -1 },
  { x: 1, y: 2 }, { x: 1, y: -2 },
  { x: -1, y: 2 }, { x: -1, y: -2 },
];

const AUTO_MOVE_DELAY = 400; // ms

// Game state
const route = useRoute();
const boardSize = parseInt(route.query.size) || 8;
const gameState = ref({
  moveCount: 0,
  knightPosition: null,
  previousPosition: null,
  visitedCells: [],
  isGameOver: false,
  tourType: 'incomplete'
});

// UI state
const board = ref([]);
const showGameOverDialog = ref(false);
const isClosedTour = ref(false);
const statusMessage = ref('Click on any cell to set the starting position.');

// Computed properties
const boardStyle = computed(() => ({
  gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
  gridTemplateRows: `repeat(${boardSize}, 1fr)`,
  width: `min(90vw, 90vh)`,
  height: `min(90vw, 90vh)`
}));

const knightStyle = computed(() => ({
  width: `calc(100% / ${boardSize})`,
  height: `calc(100% / ${boardSize})`,
  transform: gameState.value.knightPosition 
    ? `translate(${gameState.value.knightPosition.x * 100}%, ${gameState.value.knightPosition.y * 100}%)`
    : 'none'
}));

const messageStyle = computed(() => ({
  color: statusMessage.value.includes('Invalid') ? 'red' : 'green'
}));

// Board initialization
function createChessboard() {
  board.value = Array.from({ length: boardSize }, (_, y) =>
    Array.from({ length: boardSize }, (_, x) => ({
      x, y,
      content: null,
      isVisited: false,
      isValidMove: false
    }))
  );
}

// Move validation and highlighting
function highlightPossibleMoves() {
  board.value.forEach(row => row.forEach(cell => cell.isValidMove = false));

  if (!gameState.value.knightPosition) return;

  KNIGHT_MOVES.forEach(move => {
    const newX = gameState.value.knightPosition.x + move.x;
    const newY = gameState.value.knightPosition.y + move.y;

    if (isValidMove(newX, newY, boardSize) && 
        !gameState.value.visitedCells.some(c => c.x === newX && c.y === newY)) {
      board.value[newY][newX].isValidMove = true;
    }
  });
}

// Board update functions
function updateBoard() {
  board.value.forEach(row => row.forEach(cell => {
    const visited = gameState.value.visitedCells.find(v => v.x === cell.x && v.y === cell.y);
    cell.content = visited ? visited.move : null;
    cell.isVisited = Boolean(visited);
  }));

  if (gameState.value.knightPosition) {
    const { x, y } = gameState.value.knightPosition;
    board.value[y][x].content = '♞';
  }

  highlightPossibleMoves();
}

// Game state checks
function checkGameOver() {
  const totalSquares = boardSize * boardSize;
  const hasCompletedTour = gameState.value.moveCount === totalSquares;
  const hasValidMoves = board.value.some(row => 
    row.some(cell => cell.isValidMove)
  );

  if (hasCompletedTour || (!hasValidMoves && gameState.value.moveCount > 0)) {
    gameState.value.isGameOver = true;
    
    if (hasCompletedTour) {
      const startPos = gameState.value.visitedCells[0];
      const canReturnToStart = KNIGHT_MOVES.some(move => {
        const newX = gameState.value.knightPosition.x + move.x;
        const newY = gameState.value.knightPosition.y + move.y;
        return newX === startPos.x && newY === startPos.y;
      });
      gameState.value.tourType = canReturnToStart ? 'closed' : 'open';
      isClosedTour.value = canReturnToStart;
    } else {
      gameState.value.tourType = 'incomplete';
    }
    
    setTimeout(() => {
      showGameOverDialog.value = true;
      statusMessage.value = hasCompletedTour ? 
        "Congratulations! You've completed the tour!" : 
        "No more valid moves available.";
    }, 300); // 1000ms (1 second) delay before showing the dialog
  }
}

// Move handling
function handleCellClick(cell) {
  if (gameState.value.isGameOver) {
    statusMessage.value = "The game is over!";
    return;
  }

  if (!gameState.value.knightPosition) {
    // First move
    gameState.value.knightPosition = { x: cell.x, y: cell.y };
    gameState.value.moveCount = 1;
    gameState.value.visitedCells = [{ ...gameState.value.knightPosition, move: 1 }];
    statusMessage.value = "Make your next move!";
    updateBoard();
    return;
  }

  if (!cell.isValidMove) {
    statusMessage.value = "Invalid move. The knight can only move in an L-shape to unvisited cells.";
    return;
  }

  // Valid move
  gameState.value.previousPosition = { ...gameState.value.knightPosition };
  gameState.value.knightPosition = { x: cell.x, y: cell.y };
  gameState.value.moveCount++;
  gameState.value.visitedCells.push({ 
    ...gameState.value.knightPosition, 
    move: gameState.value.moveCount 
  });

  statusMessage.value = "Valid move! Keep going.";
  updateBoard();
  checkGameOver();
}

// Game control functions
function resetGame() {
  Object.assign(gameState.value, {
    moveCount: 0,
    knightPosition: null,
    previousPosition: null,
    visitedCells: [],
    isGameOver: false,
    tourType: 'incomplete'
  });
  
  showGameOverDialog.value = false;
  isClosedTour.value = false;
  statusMessage.value = "Click on any cell to set the starting position.";
  createChessboard();
}

function undoMove() {
  if (gameState.value.visitedCells.length <= 1) {
    statusMessage.value = "No moves to undo!";
    return;
  }

  gameState.value.visitedCells.pop();
  const lastMove = gameState.value.visitedCells[gameState.value.visitedCells.length - 1];
  gameState.value.previousPosition = null;
  gameState.value.knightPosition = { x: lastMove.x, y: lastMove.y };
  gameState.value.moveCount--;
  gameState.value.isGameOver = false;
  statusMessage.value = "Move undone. Continue playing!";

  updateBoard();
}

// Auto-complete tour
async function completeTour() {
  if (!gameState.value.knightPosition) {
    statusMessage.value = "Set a starting position first.";
    return;
  }

  while (!gameState.value.isGameOver) {
    const nextMove = findNextMove(
      gameState.value.knightPosition, 
      KNIGHT_MOVES, 
      gameState.value.visitedCells, 
      boardSize
    );

    if (!nextMove) {
      gameState.value.isGameOver = true;
      isClosedTour.value = gameState.value.moveCount === boardSize * boardSize;
      break;
    }

    const nextCell = board.value[nextMove.y][nextMove.x];
    handleCellClick(nextCell);
    await new Promise(resolve => setTimeout(resolve, AUTO_MOVE_DELAY));
  }
}

// Dialog handlers
function handlePlayAgain() {
  showGameOverDialog.value = false;
  resetGame();
}

function handleCloseDialog() {
  showGameOverDialog.value = false;
}

// Initialize game
onMounted(createChessboard);
</script>

<template>
  <div class="flex tablet:flex-row w-full h-full text-black bg-gradient-to-br from-black to-gray-800">
    <!-- Chessboard Display -->
    <div class="h-full w-4/6 flex items-center justify-center p-4">
      <div
        id="chessboard"
        class="grid relative"
        :style="boardStyle"
      >
        <!-- Knight piece -->
        <div
          v-if="gameState.knightPosition"
          class="knight absolute transition-all duration-500"
          :style="knightStyle"
        >
          <img
            src="../assets/img/knight.svg"
            alt="Knight"
            class="w-full h-full"
            :class="{ 'jumping': gameState.previousPosition }"
          />
        </div>

        <!-- Board cells -->
        <div
          v-for="cell in board.flat()"
          :key="`${cell.x}-${cell.y}`"
          :class="[
            'border',
            (cell.x + cell.y) % 2 === 0 ? 'bg-gray-200 text-black' : 'bg-gray-700 text-white',
            'flex items-center justify-center text-s font-bold cursor-pointer',
            cell.isValidMove ? 'bg-green-500' : '',
          ]"
          class="aspect-square"
          @click="handleCellClick(cell)"
        >
          <span 
            v-if="cell.isVisited" 
            :style="{ fontSize: `calc(1.5rem / ${boardSize / 8})` }"
          >
            {{ cell.content === '♞' ? '' : cell.content }}
          </span>
        </div>
      </div>
    </div>

    <!-- Controls Panel -->
    <div class="bg-gray-300 h-full w-2/6 p-4 flex flex-col justify-between">
      <div>
        <h1 class="text-xl font-bold mb-4">Move Tracker</h1>
        <p>Move Count: {{ gameState.moveCount }}</p>
        <p class="mt-4 text-sm" :style="messageStyle">{{ statusMessage }}</p>
      </div>

      <div class="text-black flex flex-col">
        <div class="text-black flex gap-2">
          <button 
            class="flex-1 px-6 py-4 mb-3 font-bold uppercase transition-transform duration-200 bg-black border-2 border-white rounded-md hover:scale-105 hover:bg-gray-800 active:scale-100 text-white" 
            @click="undoMove"
          >
            Undo
          </button>
          <button 
            class="flex-1 px-6 py-4 mb-3 font-bold uppercase transition-transform duration-200 bg-black border-2 border-white rounded-md hover:scale-105 hover:bg-gray-800 active:scale-100 text-white" 
            @click="resetGame"
          >
            Reset
          </button>
        </div>
        <button 
          class="w-full px-6 py-4 mb-3 font-bold uppercase transition-transform duration-200 bg-black border-2 border-white rounded-md hover:scale-105 hover:bg-gray-800 active:scale-100 text-white" 
          @click="completeTour"
        >
          Start Tour
        </button>
      </div>
    </div>
    
    <GameOverDialog
      :is-open="showGameOverDialog"
      :tour-type="gameState.tourType"
      :move-count="gameState.moveCount"
      :board-size="boardSize"
      @close="handleCloseDialog"
      @play-again="handlePlayAgain"
    />
  </div>
</template>

<style scoped>
.knight {
  z-index: 10;
  pointer-events: none;
}

.jumping {
  animation: jump 0s ease-in-out;
}

@keyframes jump {
  0% { transform: scale(1) translateY(0); }
  50% { transform: scale(1.2) translateY(-20px) rotate(180deg); }
  100% { transform: scale(1) translateY(0); }
}
</style>
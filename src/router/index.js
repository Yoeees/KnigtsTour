import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../views/MainMenu.vue'
import ChessBoard from '@/views/ChessBoard.vue'
import Customize from '@/views/Customize.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Menu',
      component: MainMenu,
    },
    {
      path: '/chessboard',
      name: 'Chessboard',
      component: ChessBoard,
    },
    {
      path: '/customize',
      name: 'Customize',
      component: Customize,
    },


    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router

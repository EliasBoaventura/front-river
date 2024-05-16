import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/HomeView.vue'
import Inicial from '../views/Inicial.vue'
import Amor from '../views/Amor.vue'
import { useAuthStore } from '@/stores/auth'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'inicial',
      component: Inicial
    },
    {
      path: '/amor',
      name: 'amor',
      component: Amor,
      meta: {
        requiresAuth: true // Indica que esta rota requer autenticação
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true // Indica que esta rota requer autenticação
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Obtenha a instância da store de autenticação
  if (to.meta.requiresAuth && !authStore.token) {
    // Se a rota requer autenticação e o usuário não tem um token, redireciona para a página de login
    next('/login');
  } else if (to.path === '/login' && authStore.token && from.path !== '/home') {
    // Se o usuário está autenticado e tenta acessar a página de login, redireciona para a página inicial,
    // exceto se ele estiver vindo da página inicial (para evitar redirecionamento em loop)
    next('/home');
  } else {
    next(); // Continua para a próxima rota
  }
});

export default router

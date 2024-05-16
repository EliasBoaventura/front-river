import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

import axios from 'axios';

const tokenExpiration = localStorage.getItem('expiresIn');
if (tokenExpiration && new Date().getTime() > parseInt(tokenExpiration)) {
    // Token expirado, remover do localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresIn');
    // Redirecionar para a página de login
    router.push('/login');
} else {
    // Configurar o Axios para incluir automaticamente o token no cabeçalho das solicitações
    const token = localStorage.getItem('accessToken');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Adicionar um interceptor para verificar se o token expirou antes de cada solicitação
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                // Token expirado, remover do localStorage
                localStorage.removeItem('accessToken');
                localStorage.removeItem('tokenExpiration');
                // Redirecionar para a página de login
                router.push('/');
            }
            return Promise.reject(error);
        }
    );
}

app.mount('#app')

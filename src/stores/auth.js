import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        token: localStorage.getItem("accessToken") || null, // Recupera o token do localStorage
        expiresIn: localStorage.getItem("expiresIn") || null, // Recupera o tempo de expiração do token do localStorage
    }),
    actions: {
        async login(username, password) {
            try {
                const response = await axios.post(
                    "java-spring-security-e-jwt-production.up.railway.app/login/logar",
                    { username, password }
                );
                const { accessToken, expiresIn } = response.data;
                this.setToken(accessToken, expiresIn);
                return { accessToken, expiresIn }; // Retorna um objeto com accessToken e expiresIn
            } catch (error) {
                throw error;
            }
        },
        setToken(accessToken, expiresIn) {
            const expirationTime = new Date().getTime() + expiresIn * 1000; // Multiplicando por 1000 para converter de segundos para milissegundos
            this.token = accessToken;
            this.expiresIn = expirationTime; // Armazena o tempo de expiração em milissegundos
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("expiresIn", expirationTime); // Salva o tempo de expiração em milissegundos
        },
    },
});

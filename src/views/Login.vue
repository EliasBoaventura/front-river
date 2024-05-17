<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

let username = "";
let password = "";

const login = async () => {
  try {
    const { accessToken, expiresIn } = await authStore.login(
      username,
      password
    );
    console.log("Login successful. Token:", accessToken);
    console.log("Expira em:", expiresIn);
    router.push("/home"); // Redirecionar para a página protegida
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please try again.");
    router.push("/login");
  }
};
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input
        type="text"
        id="username"
        v-model="username"
        required
      /><br /><br />
      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        required
      /><br /><br />
      <button type="submit">Login</button>
    </form>
    <div v-if="responseData">
      <p>Resposta do servidor: {{ responseData }}</p>
    </div>
    <div>
      <img src="../assets/plano-de-fundo.svg" alt="plano de fundo">
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos para este componente, se necessário */
</style>

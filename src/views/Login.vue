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
    <img src="../assets/banner.png" alt="" style="width: 100%" />
    <div>
      <ul
        class="nav justify-content-evenly align-items-center"
        style="height: 100px"
      >
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Active</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <h1>teste</h1>
      </ul>
    </div>
    <div class="tela-login">
      <div class="plano-de-fundo">
        <img src="../assets/plano de fundo 2.webp" alt="plano de fundo" />
      </div>
      <div class="login-card">
        <div class="card-header">
          <div class="log">Login</div>
        </div>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username">Login:</label>
            <input type="text" id="username" v-model="username" required />
          </div>
          <div class="form-group">
            <label for="password">Senha:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <div class="form-group">
            <input value="Login" type="submit" />
          </div>
        </form>
        <div v-if="responseData">
          <p>Resposta do servidor: {{ responseData }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.tela-login {
  position: relative;
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  min-height: 100vh; /* Altura mínima para ocupar toda a tela */
  display: flex;
  justify-content: center;
  align-items: center;
}

.plano-de-fundo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; /* Altura igual à altura da viewport */
  z-index: -1;
  opacity: 85%;
}

.plano-de-fundo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-card {
  width: 300px;
  margin: 0 auto;
  padding: 20px 20px 10px 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 2px 2px 10px #ccc;
}

.card-header {
  text-align: center;
  margin-bottom: 20px;
}

.card-header .log {
  margin: 0;
  font-size: 24px;
  color: #414040f6;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  color: #414040f6;
}

label {
  font-size: 18px;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: 0.5s;
}

input[type="submit"] {
  width: 100%;
  background-color: #ff1040;
  color: white;
  padding: 14px 20px;
  margin-top: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}

input[type="submit"]:hover {
  background-color: #fff;
  border: solid 1px #ccc;
  color: black;
}
/* Remover a borda azul quando clicado */
input:focus {
  outline: none;
  border-color: #000; /* Remove a borda */
}
</style>
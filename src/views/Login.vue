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
    <img
      class="banner-top border-bottom border-4 pb-2"
      src="../assets/banner.png"
      alt="banner-top"
    />

    <div class="row">
      <div class="container-fluid col-sm-10 p-3 d-flex justify-content-around">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="row">
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#">INÍCIO</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">HISTÓRIA</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">NOTÍCIAS</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="col-auto d-flex align-items-center gap-2">
        <a href="">LOGIN</a>
        <p>|</p>
        <a href="">CADASTRE-SE</a>
      </div>
    </div>

    <div class="tela-login">
      <div class="plano-de-fundo">
        <img src="../assets/plano de fundo 2.webp" alt="plano de fundo" />
      </div>
      <div class="login-card">
        <div class="card-header">
          <div class="log fs-1">Login</div>
          <div class="text-start fs-6 fw-lighter opacity-50">
            <p>Insira seus dados</p>
          </div>
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
.banner-top {
  display: flex;
  margin: 0 auto;
  width: 100%;
}
.nav-integrada {
  display: flex;
}
a {
  color: black;
  text-decoration: none;
}
a:hover {
  color: #ff1040d1;
  text-decoration: none;
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
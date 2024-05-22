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
  <div class="m-auto align-items-center ">
    <img class="banner-top" src="../assets/banner.png" alt="banner-top" />

    <div class="teste d-flex p-4 justify-content-center gap-5 mt-3">
      <div class="w-75 d-flex justify-content-center">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="row container-fluid gap-2">
            <button
              class="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"> </span>
            </button>
            <div class="row">
              <div class="navbar-collapse" id="navbarNav">
                <ul class="navbar-nav gap-1">
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/"
                      ><p>INÍCIO</p></a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/historia"><p>HISTÓRIA</p></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/noticia"><p>NOTÍCIAS</p></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="d-flex justify-content-center w-50">
        <div class="d-flex gap-2 align-items-center">
          <a href="/login"><p>LOGIN</p></a>
          <p>|</p>
          <a href="/cadastro"><p>CADASTRE-SE</p></a>
        </div>
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
            <input
              type="text"
              id="username"
              placeholder="E-mail"
              v-model="username"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Senha:</label>
            <input
              type="password"
              id="password"
              placeholder="*****"
              v-model="password"
              required
            />
          </div>
          <div class="form-group">
            <input value="Entrar" type="submit" />
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
  font-family: "Gotham", sans-serif;
  font-weight: normal;
  font-size: 16px;
}
.banner-top {
  display: flex;
  margin: 0 auto;
  width: 100%;
}
.teste {
  position: absolute;
  z-index: 2;
  background-color: #fff;
  opacity: 0.95;
  width: 100%;
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
  width: 320px;
  margin: 230px auto 0 auto;
  padding: 20px 20px 10px 20px;
  border: 1px solid #ccc;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 2px 2px 10px #ccc;
  opacity: 0.93;
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
  border-color: #000;
  outline: none;
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
  font-weight: bold;
}

input[type="submit"]:hover {
  background-color: #fff;
  border: solid 1px #ccc;
  color: black;
  transition: 0.5s ease;
}
/* Remover a borda azul quando clicado */
input:focus {
  outline: none;
  border-color: #000; /* Remove a borda */
}
</style>
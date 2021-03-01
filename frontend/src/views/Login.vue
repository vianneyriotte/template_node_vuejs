<template>
  <div class="bounce form-signin">
    <form>
      <h1 class="h3 mb-3 fw-normal">Me connecter</h1>
      <label for="inputEmail" class="visually-hidden">Adresse mail</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Adresse mail"
        v-model="state.email"
        required
        autofocus
      />
      <label for="inputPassword" class="visually-hidden">Mot de passe</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control mb-4"
        placeholder="Mot de passe"
        v-model="state.password"
        required
      />
      <button class="w-100 btn btn-lg btn-primary" @click.stop.prevent="doConnection">Connexion</button>
    </form>
  </div>
</template>
  
<script setup>
import { reactive } from "vue";

const state = reactive({ email: null, password: null });

import storage from "../helpers/storage";
import router from '../router';

const doConnection = async () => {
  if (!state.email || state.email.length <= 0) return;
  await storage.setUser({ email: state.email });
  await router.replace("/");
}
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

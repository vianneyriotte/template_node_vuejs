<template>
  <div class="bounce">
    <h1>Accueil</h1>
    <div>{{ state.user }}</div>
    <div class="dropdown pt-4">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >Dropdown button</button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
    </div>
    <div class="pt-4">{{ state.enveloppes }}</div>
    <div class="pt-4">
      <input type="text" :value="state.token" />
    </div>
  </div>
</template>

<script setup>
import auth from "../helpers/auth";
import enveloppe from "../helpers/enveloppes";
import { store } from '../store';
import { reactive, onMounted } from "vue";


const state = reactive({ user: null, enveloppes: null, token: null });

onMounted(async () => {
  const result = await auth.getUserInfo();
  if (result) {
    state.user = result;
  }
  state.enveloppes = await enveloppe.getAll();
  state.token = store.state.token;
})

</script>
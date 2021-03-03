<template>
  <div class="bounce">
    <h1>Accueil</h1>
    <div>{{ state.user }}</div>
    <div class="dropdown">
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
  </div>
</template>

<script setup>
import auth from "../helpers/auth";
import { reactive, onMounted } from "vue";


const state = reactive({ user: null });

onMounted(async () => {
  const result = await auth.getUserInfo();
  if (result) {
    state.user = result;
  }
})

</script>
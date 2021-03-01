<template>
  <div class="bounce">
    <h1>Accueil</h1>
    <div>{{ state.user }}</div>
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
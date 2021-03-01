<template>
  <Header :user="data.sharedState.user" :onDeconnectionClick="onDeconnectionClick" />
  <main class="container">
    <router-view />
  </main>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import storage from "./helpers/storage";
import Header from "./components/Header.vue";
import router from "./router";
import { store } from "./store";

const data = reactive({ sharedState: store.state });

const onDeconnectionClick = async () => {
  if (data.sharedState.user) {
    await storage.resetUserAndToken();
  }
  router.replace("/Login");
}

onMounted(async () => {
  await storage.isConnected(true);
});
</script>

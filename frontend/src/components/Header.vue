<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <div
      class="d-flex align-items-center justify-content-center flex-row flex-fill collapse navbar-collapse"
    >
      <div>
        <a class="navbar-brand" href="#">Mon projet</a>
      </div>
      <div class="p-2 flex-fill flex-grow-1 bd-highlight"></div>
      <div>
        <a class="navbar-brand" href="#">{{ user && user.firstname }}</a>
      </div>
      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a
              class="nav-link"
              @click="onDeconnectionClick"
              aria-current="page"
              href="#"
            >{{ user ? "Déconnexion" : "Connexion" }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  user: null,
  onDeconnectionClick: Function
});

</script>

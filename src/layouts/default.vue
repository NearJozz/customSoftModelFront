<template>
  <v-app>
    <v-main>
      <v-fab
      v-if="$route.path!='/'"
        key="home"
        color="blue"
        icon="mdi-home"
        class="ms-4 mb-4 "
        location="top start"
        size="64"
        href="/"
        absolute
        app
        appear
      ></v-fab>
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
  //
</script>

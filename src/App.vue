<script setup>
import Home from './pages/Home.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    
    <main class="flex-1">
      <router-view />
    </main>

    <Footer />
  </div>
</template>


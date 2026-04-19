<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="grid grid-cols-2 w-full max-w-3xl rounded-xl overflow-hidden shadow-sm">

      <div class="bg-teal-700 flex flex-col items-center justify-center p-12 gap-8">
        <div class="text-center">
          <h1 class="text-4xl text-teal-50" style="font-family: 'Sofadi One', cursive;">Wanderspot</h1>
          <p class="text-teal-300 text-sm mt-2 tracking-wide">descubre lugares increíbles</p>
        </div>
        <div class="flex flex-col gap-4 w-full max-w-xs">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-teal-800 flex items-center justify-center shrink-0">
              <Icon type="lucide" name="map-pin" width="20" height="20" color="oklch(98.7% 0.002 197.1)"/>
            </div>
            <p class="text-teal-300 text-sm">Explora restaurantes, parques y más</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-teal-800 flex items-center justify-center shrink-0">
             <Icon type="lucide" name="star" width="20" height="20" color="oklch(98.7% 0.002 197.1)"/>
            </div>
            <p class="text-teal-300 text-sm">Lee y escribe reseñas</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-teal-800 flex items-center justify-center shrink-0">
             <Icon type="lucide" name="camera" width="20" height="20" color="oklch(98.7% 0.002 197.1)"/>
            </div>
            <p class="text-teal-300 text-sm">Publica tus lugares favoritos</p>
          </div>
        </div>
      </div>

      <div class="bg-white flex flex-col justify-center p-10">
        <h2 class="text-xl font-medium text-gray-800 mb-1">Bienvenido de vuelta</h2>
        <p class="text-sm text-gray-400 mb-6">Inicia sesión para continuar</p>

        <form @submit.prevent="login" class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label class="text-xs text-gray-500">Email</label>
            <input v-model="email" type="email" placeholder="tu@email.com" class="input" required />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-gray-500">Contraseña</label>
            <input v-model="password" type="password" placeholder="••••••••" class="input" required />
          </div>

          <p class="text-xs text-teal-700 text-right cursor-pointer hover:underline">¿Olvidaste tu contraseña?</p>

          <button class="bg-teal-700 text-white w-full py-2.5 rounded-lg hover:bg-teal-800 transition-colors text-sm font-medium">
            Entrar
          </button>
        </form>

        <p class="text-sm text-gray-400 text-center mt-6">
          ¿No tienes cuenta?
          <router-link to="/register" class="text-teal-700 font-medium hover:underline">Regístrate</router-link>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'
import Icon from '../components/Icon.vue'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    alert(error.message)
    return
  }

  router.push('/')
}
</script>

<style>
.input {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
}
</style>
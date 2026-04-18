<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    
    <form @submit.prevent="login" class="bg-white p-6 rounded shadow w-80">
      
      <h2 class="text-xl font-bold mb-4 text-center">
        Iniciar sesión
      </h2>

      <input 
        v-model="email" 
        type="email"
        placeholder="Email" 
        class="input mb-3"
        required
      />

      <input 
        v-model="password" 
        type="password"
        placeholder="Contraseña" 
        class="input mb-4"
        required
      />

      <button class="bg-green-600 text-white w-full py-2 rounded hover:bg-green-800">
        Entrar
      </button>

    </form>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'

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
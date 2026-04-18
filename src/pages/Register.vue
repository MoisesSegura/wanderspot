<template>
  <div class="flex justify-center mt-20">
    <form @submit.prevent="register" class="bg-white p-6 rounded shadow w-80">
      
      <h2 class="text-xl mb-4">Registrarse</h2>

      <input v-model="email" placeholder="Email" class="input mb-2" />
      <input v-model="password" type="password" placeholder="Password" class="input mb-4" />

      <button class="bg-teal-600 text-white w-full py-2 rounded">
        Crear cuenta
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
const errorMsg = ref('')

const register = async () => {
  errorMsg.value = ''

  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })

  if (error) {
    errorMsg.value = error.message
    return
  }

  router.push('/')
}
</script>
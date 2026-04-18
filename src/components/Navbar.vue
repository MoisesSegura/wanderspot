<template>
  <nav class="bg-white shadow-md p-3">
    <div class="container mx-auto flex justify-between items-center">

      <h1 class="text-xl font-bold">
        Tour Guide
      </h1>

      <div class="flex items-center gap-4">
        
        <!-- No logged -->
        <template v-if="!user">
          <router-link 
            to="/login"
            class="text-gray-600 hover:text-black"
          >
            Iniciar sesión
          </router-link>

          <router-link 
            to="/register"
            class="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-800"
          >
            Registrarse
          </router-link>
        </template>

        <!-- loggeado -->
        <template v-else>
          <span class="text-gray-600">
            {{ user.email }}
          </span>

          <button 
            @click="logout"
            class="bg-pink-500 text-white px-3 py-1 rounded"
          >
            Salir
          </button>
        </template>

      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

const user = ref(null)

onMounted(async () => {
  const { data } = await supabase.auth.getUser()
  user.value = data.user
})

const logout = async () => {
  await supabase.auth.signOut()
  location.reload()
}
</script>
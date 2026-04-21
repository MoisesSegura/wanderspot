<template>
  <nav class="bg-white shadow-md p-3">
    <div class="container mx-auto flex justify-between items-center">

      <h1 class="text-xl font-bold ">
       <router-link 
            to="/"
            class="text-black hover:text-teal-500"
          >
            Wanderspot
          </router-link>
      </h1>

      <div class="flex items-center gap-4">
        
        <!-- No logged -->
        <template v-if="!user">
          <router-link 
            to="/login"
            class="text-black hover:text-teal-500"
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

          <router-link 
          to="/my-places"
          class="text-gray-600 hover:text-teal-600"
        >
          Mis lugares
        </router-link>

          <span class="text-gray-600">
            {{ user.display_name || user.email }}
          </span>

          <button 
            @click="logout"
            class="bg-teal-500 text-white px-3 py-1 rounded"
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
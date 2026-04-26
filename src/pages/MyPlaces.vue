<template>
  <div class="min-h-screen bg-gray-100">

    <div class="container mx-auto px-4 py-10">

      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Mis lugares</h1>

        <router-link 
          to="/create"
          class="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
        >
          + Crear lugar
        </router-link>
      </div>

      <div v-if="places.length" class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div 
          v-for="place in places"
          :key="place.id"
          class="bg-white p-4 rounded shadow"
        >
          <h2 class="text-lg font-semibold">
            {{ place.name }}
          </h2>

          <p class="text-gray-600 text-sm">
            {{ place.location }}
          </p>

          <p class="mt-2">
            {{ priceLabel(place.price_level) }}
          </p>

          <div class="flex gap-2 mt-4">

            <router-link 
              :to="`/place/${place.id}`"
              class="text-white bg-teal-500 px-4 py-2 rounded hover:bg-teal-600">
              Ver
            </router-link>

              <router-link 
                :to="`/edit/${place.id}`"
                class="text-white bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600">
                Editar
            </router-link>

            <button 
              @click="deletePlace(place.id)"
              class="text-white bg-rose-500 px-4 py-2 rounded hover:bg-rose-600">
              Eliminar
            </button>

          </div>
        </div>

      </div>

      <p v-else class="text-gray-500 text-center">
        No tienes lugares aún.
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'
import Navbar from '../components/Navbar.vue'

const places = ref([])

onMounted(async () => {
  const { data: userData } = await supabase.auth.getUser()

  if (!userData.user) return

  const userId = userData.user.id

  const { data } = await supabase
    .from('places')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  places.value = data || []
})


const priceLabel = (level) => {
  const map = { 1: '$', 2: '$$', 3: '$$$' }
  return map[level] || ''
}


const deletePlace = async (id) => {
  const confirmDelete = confirm('¿Eliminar este lugar?')

  if (!confirmDelete) return

  await supabase
    .from('places')
    .delete()
    .eq('id', id)

  places.value = places.value.filter(p => p.id !== id)
}
</script>

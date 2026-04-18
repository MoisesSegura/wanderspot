<template>

  <!-- BUSCADOR -->
  <section class="bg-white py-10 shadow-md">
    <div class="container mx-auto">
      <form class="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
        <input 
          v-model="search"
          type="text" 
          placeholder="¿A dónde quieres ir?" 
          class="p-3 border rounded-md w-full"
        >

        <button 
          @click.prevent="handleSearch"
          class="bg-teal-600 text-white px-4 py-3 rounded-md hover:bg-teal-800 w-full"
        >
          Buscar
        </button>
      </form>
    </div>
  </section>

  <!-- LISTA -->
  <section class="container mx-auto px-4 py-12">
    <h2 class="text-3xl font-semibold mb-6 text-center">
      Lugares disponibles
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <PlaceCard 
        v-for="place in filteredPlaces"
        :key="place.id"
        :place="place"
      />
    </div>

    <p v-if="filteredPlaces.length === 0" class="text-center text-gray-500 mt-6">
      No hay lugares disponibles.
    </p>
  </section>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getPlaces } from '../services/placeService'

import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import PlaceCard from '../components/PlaceCard.vue'

const places = ref([])
const search = ref('')

onMounted(async () => {
  places.value = await getPlaces()
})

const handleSearch = () => {
  
}

const filteredPlaces = computed(() => {
  return places.value.filter(place =>
    place.name.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>
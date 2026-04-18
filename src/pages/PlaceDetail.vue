<template>
  <div class="bg-gray-100 min-h-screen">


    <section>
      <div class="container mx-auto px-4 py-12">

        <!-- Imagen -->
        <div class="w-full h-100 bg-gray-300 rounded-lg overflow-hidden">
          <img 
            v-if="place?.image"
            :src="place.image"
            class="w-full h-full object-cover"
          />
          <div v-else class="flex items-center justify-center h-full text-gray-600">
            Sin imagen
          </div>
        </div>

        <!-- Header -->
        <div class="mt-6 flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold">
              {{ place?.name }}
            </h1>

            <p class="text-gray-600">
              {{ place?.location || 'Ubicación no definida' }}
            </p>
          </div>

          <div class="text-xl font-semibold text-gray-800">
            {{ priceLabel }}
          </div>
        </div>

        <!-- Info -->
        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Descripción -->
          <div>
            <p class="text-gray-700">
              {{ place?.description }}
            </p>
          </div>

          <!-- Info adicional (puedes expandir después) -->
          <div class="bg-gray-100 p-4 rounded-lg">
            <h2 class="text-lg font-semibold mb-2">Información</h2>
            <p class="text-gray-800">App turística</p>
            <p class="text-gray-600">Datos generados</p>
          </div>

        </div>

        <!-- Tags -->
       <div v-if="place?.place_tags?.length" class="mt-4">
        <h3 class="text-lg font-semibold">Tags:</h3>

        <div class="flex flex-wrap gap-2 mt-2">
            <span 
            v-for="item in place.place_tags"
            :key="item.tags.id"
            class="bg-teal-100 text-teal-700 text-sm font-medium px-3 py-1 rounded-full"
            >
            {{ item.tags.name }}
            </span>
        </div>
        </div>

        <div class="mt-8">
          <h2 class="text-2xl font-semibold mb-4">Ubicación</h2>

          <div id="map" class="w-full h-75 rounded-lg"></div>
        </div>


        <div class="mt-6">
          <button 
            @click="$router.back()" 
            class="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
            Volver
          </button>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../supabase'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const route = useRoute()
const place = ref(null)

onMounted(async () => {

  const { data } = await supabase
    .from('places')
    .select(`
  *,
  place_tags (
    tags (*)
  )
`)
    .eq('id', route.params.id)
    .single()

  place.value = data

  await nextTick()


  if (place.value?.lat && place.value?.lng) {
    const map = L.map('map').setView(
      [place.value.lat, place.value.lng], 
      13
    )

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(map)

    L.marker([place.value.lat, place.value.lng])
      .addTo(map)
      .bindPopup(place.value.name)
      .openPopup()
  }
})

const priceLabel = computed(() => {
  const map = { 1: '$', 2: '$$', 3: '$$$' }
  return place.value ? map[place.value.price_level] : ''
})
</script>
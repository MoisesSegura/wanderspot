<template>
  <div class="border rounded-lg shadow-lg overflow-hidden">

    <div v-if="place.image">
      <img 
        :src="place.image" 
        class="w-full h-48 object-cover"
      />
    </div>
    <div v-else class="w-full h-48 bg-gray-300 flex items-center justify-center">
      <span>Sin imagen</span>
    </div>

    <div class="p-4">
      <h3 class="text-xl font-bold">{{ place.name }}</h3>

      <p class="text-gray-600 text-sm">
        {{ place.description }}
      </p>

      <p class="text-gray-800 font-semibold mt-2">
        {{ priceLabel }}
      </p>

      <button 
        @click="goToDetail"
        class="mt-4 w-full bg-teal-600 hover:bg-teal-800 text-white py-2 rounded-lg"
      >
        Ver más
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  place: Object
})

const router = useRouter()

const goToDetail = () => {
  router.push(`/place/${props.place.id}`)
}

const priceLabel = computed(() => {
  const map = { 1: '$', 2: '$$', 3: '$$$' }
  return map[props.place.price_level] || ''
})


</script>
<template>
  <div>
    <PlaceCard
      v-for="place in places"
      :key="place.id"
      :place="place"
    />
  </div>
</template>

<script setup>
import PlaceCard from './PlaceCard.vue'

const props = defineProps({
  places: Array
})
</script>
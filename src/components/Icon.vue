<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  type: String,
  name: String,
  width: {
    type: Number,
    default: 24
  },
  height: {
    type: Number,
    default: 24
  },
  color: {
    type: String,
    default: 'currentColor'
  }
})

const getIconName = (type, name) => {
  if (type === 'lucide') return `lucide:${name}`
  if (type === 'simple-icons') return `simple-icons:${name}`
  return name
}
</script>

<template>
  <Icon
    :icon="getIconName(type, name)"
    :width="width"
    :height="height"
    :color="color"
  />
</template>
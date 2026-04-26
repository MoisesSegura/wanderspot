<template>
  <div class="relative" ref="containerRef">
    <label class="block font-semibold mb-2">Categoría</label>

    <div
      @click="isOpen = !isOpen"
      class="input flex items-center justify-between cursor-pointer select-none"
    >
      <span :class="selected ? 'text-gray-800' : 'text-gray-400'">
        {{ selected ? `${selected.name}` : 'Selecciona una categoría' }}
      </span>
      <Icon type="lucide" :name="isOpen ? 'chevron-up' : 'chevron-down'" :width="16" :height="16" class="text-gray-400" />
    </div>

    <div
      v-if="isOpen"
      class="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
    >
      <div
        v-for="category in categories"
        :key="category.id"
        @click="selectCategory(category)"
        class="flex items-center gap-2 px-4 py-2.5 hover:bg-teal-50 cursor-pointer transition-colors"
        :class="selected?.id === category.id ? 'bg-teal-50 text-teal-700' : 'text-gray-700'"
      >
        <span class="text-sm">{{ category.name }}</span>
        <Icon v-if="selected?.id === category.id" type="lucide" name="check" :width="14" :height="14" class="text-teal-600 ml-auto" />
      </div>

      <div v-if="categories.length === 0" class="px-4 py-3 text-sm text-gray-400 text-center">
        Sin categorías disponibles
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { supabase } from '../supabase'
import Icon from '../components/Icon.vue'

const emit = defineEmits(['update:selected'])

const categories = ref([])
const selected = ref(null)
const isOpen = ref(false)
const containerRef = ref(null)

onMounted(async () => {
  const { data } = await supabase.from('categories').select('*').order('name')
  categories.value = data ?? []

  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const selectCategory = (category) => {
  selected.value = category
  isOpen.value = false
  emit('update:selected', category.id)
}

const handleClickOutside = (e) => {
  if (containerRef.value && !containerRef.value.contains(e.target)) {
    isOpen.value = false
  }
}
</script>
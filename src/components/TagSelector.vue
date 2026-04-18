<template>
  <div class="mb-6">
    <label class="block font-bold mb-2">Tags</label>

    <div class="border p-2 rounded">
      <div class="flex flex-wrap gap-2 p-2">
        <span
          v-for="(tag, index) in selectedTags"
          :key="tag.id"
          class="bg-teal-500 text-white px-2 py-1 rounded-full flex items-center"
        >
          {{ tag.name }}
          <button 
            type="button"
            class="ml-2"
            @click="removeTag(index)"
          >
            ✖
          </button>
        </span>
      </div>
    </div>

    <input
      v-model="search"
      type="text"
      placeholder="Escribe para buscar tags..."
      class="border mt-2 p-2 w-full rounded"
    />

    <div 
      v-if="filteredTags.length"
      class="mt-2 border rounded p-2 max-h-32 overflow-y-auto"
    >
      <div
        v-for="tag in filteredTags"
        :key="tag.id"
        class="cursor-pointer p-2 hover:bg-gray-200 rounded"
        @click="addTag(tag)"
      >
        {{ tag.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase'

const selectedTags = ref([])
const search = ref('')
const allTags = ref([])

const emit = defineEmits(['update:selected'])

onMounted(async () => {
  const { data } = await supabase.from('tags').select('*')
  allTags.value = data || []
})

const filteredTags = computed(() => {
  if (!search.value) return []

  return allTags.value.filter(tag =>
    tag.name.toLowerCase().includes(search.value.toLowerCase()) &&
    !selectedTags.value.some(t => t.id === tag.id)
  )
})

const addTag = (tag) => {
  selectedTags.value.push(tag)
  search.value = ''

  emitSelected()
}

const removeTag = (index) => {
  selectedTags.value.splice(index, 1)

  emitSelected()
}

const emitSelected = () => {
  emit('update:selected', selectedTags.value.map(t => t.id))
}
</script>
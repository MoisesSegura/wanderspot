<template>
  <div class="min-h-screen flex justify-center items-center bg-gray-100">
    
    <form @submit.prevent="updatePlace" class="bg-white p-6 rounded shadow w-96">
      
      <h2 class="text-xl mb-4">Editar lugar</h2>

      <input v-model="form.name" class="input mb-2" />
      <input v-model="form.location" class="input mb-2" />

      <textarea v-model="form.description" class="input mb-2"></textarea>

      <button class="bg-yellow-500 text-white w-full py-2 rounded">
        Guardar cambios
      </button>

    </form>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const form = ref({
  name: '',
  location: '',
  description: ''
})

onMounted(async () => {
  const { data } = await supabase
    .from('places')
    .select('*')
    .eq('id', route.params.id)
    .single()

  form.value = data
})

const updatePlace = async () => {
  await supabase
    .from('places')
    .update({
      name: form.value.name,
      location: form.value.location,
      description: form.value.description
    })
    .eq('id', route.params.id)

  router.push('/my-places')
}
</script>

<style>
.input {
  width: 100%;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 8px;
}
</style>
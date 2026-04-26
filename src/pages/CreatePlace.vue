<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Registrar Lugar
      </h2>

      <form @submit.prevent="handleSubmit">

        <div class="mb-4">
          <label class="block font-semibold mb-2">Imagen</label>
          <input type="file" @change="handleFile" />
        </div>

        <div class="mb-4">
          <label class="block font-semibold mb-2">Nombre</label>
          <input v-model="form.name" class="input" required />
        </div>

        <div class="mb-4">
          <label class="block font-semibold mb-2">Descripción</label>
          <textarea v-model="form.description" class="input"></textarea>
        </div>

         <div class="mb-4">
        <CategorySelector @update:selected="form.value.category_id = $event" />
        </div>
        
        <div class="mb-4">
         <TagSelector @update:selected="handleTags" />
        </div>

        <div class="mb-4">
          <label class="block font-semibold mb-2">Ubicación</label>
          <input v-model="form.location" class="input" />
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <input v-model="form.lat" placeholder="Latitud" class="input" />
          <input v-model="form.lng" placeholder="Longitud" class="input" />
        </div>


        <div class="mb-4">
        <label class="block font-semibold mb-2">Seleccionar ubicación</label>
        <div id="map-picker" class="w-full h-75 rounded-lg"></div>
        </div>

        <div class="mb-4">
          <label class="block font-semibold mb-2">Precio</label>
          <select v-model="form.price_level" class="input">
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
          </select>
        </div>

        <div class="text-center">
          <button class="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600">
            Guardar Lugar
          </button>
        </div>

      </form>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import TagSelector from '../components/TagSelector.vue'
import CategorySelector from '../components/CategorySelector.vue'

const userId = ref(null)
const file = ref(null)
const router = useRouter()

const handleFile = (e) => {
  file.value = e.target.files[0]
}

const form = ref({
  name: '',
  description: '',
  category_id: null,
  location: '',
  lat: '',
  lng: '',
  price_level: 1
})

const selectedTags = ref([])

const handleTags = (tags) => {
  selectedTags.value = tags
}

onMounted(async () => {

const { data: userData } = await supabase.auth.getUser()
userId.value = userData.user.id
  await nextTick()


  delete L.Icon.Default.prototype._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  })

  const map = L.map('map-picker').setView([10.47193, -84.96724], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map)

  let marker

  map.on('click', (e) => {
    const { lat, lng } = e.latlng

    form.value.lat = lat.toFixed(6)
    form.value.lng = lng.toFixed(6)

    if (marker) {
      marker.setLatLng([lat, lng])
    } else {
      marker = L.marker([lat, lng]).addTo(map)
    }
  })
})


const handleSubmit = async () => {

  if (!form.value.name || !form.value.lat || !form.value.lng) {
    alert('Completa los campos obligatorios')
    return
  }

  // 🟢 SUBIR IMAGEN AQUÍ
  let imageUrl = null

  if (file.value) {
    const fileName = `${Date.now()}-${file.value.name}`

    const { error } = await supabase.storage
      .from('places-images')
      .upload(fileName, file.value)

    if (error) {
      console.error('Error subiendo imagen:', error)
    } else {
      const { data: publicUrl } = supabase
        .storage
        .from('places-images')
        .getPublicUrl(fileName)

      imageUrl = publicUrl.publicUrl
    }
  }

  // 🟢 INSERT
  const { data, error } = await supabase
    .from('places')
    .insert([{
      image: imageUrl,
      user_id: userId.value,
      name: form.value.name,
      description: form.value.description,
      category_id: form.value.category_id,
      location: form.value.location,
      lat: parseFloat(form.value.lat),
      lng: parseFloat(form.value.lng),
      price_level: parseInt(form.value.price_level)
    }])
    .select()
    .single()

  if (error) {
    console.error(error)
    return
  }

  const placeId = data.id

  // tags...
  if (selectedTags.value.length > 0) {
    const relations = selectedTags.value.map(tagId => ({
      place_id: placeId,
      tag_id: tagId
    }))

    await supabase.from('place_tags').insert(relations)
  }

  router.push(`/place/${placeId}`)
}
</script>
import { supabase } from '../supabase'

export const createPlace = async (place) => {
  const { data, error } = await supabase
    .from('places')
    .insert([place])
    .select()

  if (error) {
    console.error('Error:', error)
    return null
  }

  return data
}

export const getPlaces = async () => {
  const { data, error } = await supabase
    .from('places')
    .select('*')

  if (error) {
    console.error(error)
    return []
  }

  return data
}
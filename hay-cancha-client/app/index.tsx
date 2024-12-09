import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Keyboard
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import useFetchFilters from '../hooks/useFetchFilters'
import ImageSlider from '../components/Slider/ImageSlider'
import { SearchBar } from 'react-native-screens'

const bannerMessages = [
  'Reserva tu cancha ahora',
  'Encuentra las mejores canchas',
  'Juega con tus amigos cerca de ti'
]

export default function Home () {
  const [params, setParams] = useState({
    location: '',
    price: '',
    players: '',
    sport: ''
  })

  const [filtersVisible, setFiltersVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { filters, loading, error } = useFetchFilters(params)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  const updateFilters = (field: string, value: string) => {
    setParams(prev => ({ ...prev, [field]: value }))
    setFiltersVisible(true) // Muestra las canchas al actualizar un filtro
  }

  const clearFilters = () => {
    setParams({
      location: '',
      price: '',
      players: '',
      sport: ''
    })
    setFiltersVisible(false)
  }

  const handleSearch = () => {
    Keyboard.dismiss()
    setParams(prev => ({
      ...prev,
      location: searchTerm.trim(),
      sport: searchTerm.trim()
    }))
    setFiltersVisible(true)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(
        prevIndex => (prevIndex + 1) % bannerMessages.length
      )
    }, 3000) // Cambia cada 3 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <View style={styles.container}>
      {/* Banner */}
      <View style={styles.banner}>
        <Image
          source={require('../assets/images/banner/banner1.png')}
          style={styles.bannerImage}
        />
        <Text style={styles.bannerText}>
          {bannerMessages[currentMessageIndex]} {/* Mensaje dinámico */}
        </Text>
      </View>

      {/* Barra de búsqueda, filtros y botón */}
      <View style={styles.filterRow}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder='Buscar ubicación o deporte...'
            value={searchTerm}
            onChangeText={text => setSearchTerm(text)} // Actualiza el término de búsqueda
            onSubmitEditing={handleSearch} // Buscar al presionar Enter
            placeholderTextColor='#999' // Color del texto placeholder Buscar al presionar Enter
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
            <Icon name='magnify' size={20} color='#666' />{' '}
            {/* Ícono de lupa más pequeño */}
          </TouchableOpacity>
        </View>
      </View>

      {/* Filtros */}
      <View style={styles.filterRow}>
        {' '}
        {/* Filtro por ubicación */}
        <Picker
          selectedValue={params.location}
          onValueChange={value => updateFilters('location', value)}
          style={styles.picker}
        >
          <Picker.Item label='Ubicación' value='' />
          <Picker.Item label='Recoleta' value='Recoleta' />
          <Picker.Item label='Palermo' value='Palermo' />
          <Picker.Item label='Belgrano' value='Belgrano' />
          <Picker.Item label='Agronomía' value='Agronomía' />
          <Picker.Item label='Barracas' value='Barracas' />
        </Picker>
        <Picker
          selectedValue={params.sport}
          onValueChange={value => updateFilters('sport', value)}
          style={styles.picker}
        >
          <Picker.Item label='Deporte' value='' />
          <Picker.Item label='Futbol' value='Futbol' />
          <Picker.Item label='Basquetbol' value='Basquetbol' />
          <Picker.Item label='Tenis' value='Tenis' />
          <Picker.Item label='Pádel' value='Pádel' />
        </Picker>
        {/* Filtro por cantidad de jugadores */}
        {/* <Picker
          selectedValue={params.players}
          onValueChange={value => updateFilters('players', value)}
          style={styles.picker}
        >
          <Picker.Item label='Jugadores' value='' />
          <Picker.Item label='14' value='14' />
          <Picker.Item label='4' value='4' />
          <Picker.Item label='10' value='10' />
          <Picker.Item label='12' value='12' />
        </Picker> */}
        {/* Botón de limpiar filtros */}
        <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
          <Icon name='broom' size={24} color='#fff' />
        </TouchableOpacity>
      </View>

      {/* Lista de canchas */}
      {filtersVisible && (
        <View style={{ flex: 1, marginTop: 8 }}>
          {loading && <ActivityIndicator size='large' color='#0000ff' />}
          {error && <Text style={styles.error}>{error}</Text>}
          {!loading && !error && (
            <FlatList
              data={filters.filter(
                item =>
                  item.location
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) || // Filtra por ubicación
                  item.sport.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra por deporte
              )}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Image source={item.image} style={styles.cardImage} />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text>Ubicación: {item.location}</Text>
                    <Text>Precio: ${item.price}</Text>
                    <Text>Jugadores: {item.players}</Text>
                    <Text>Deporte: {item.sport}</Text>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      )}
      {/* Slider de imágenes */}
      <ImageSlider />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9'
  },
  banner: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8
  },
  bannerText: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderRadius: 8
  },
  input: {
    height: 40, // Asegura que todos los elementos tengan la misma altura
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  searchBar: {
    flex: 1,
    height: 40,
    color: '#333', // Color del texto
    paddingHorizontal: 8,
    backgroundColor: 'transparent' // Sin fondo
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0', // Borde claro
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fafafa', // Fondo claro
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1 // Sutil sombra
  },
  searchIcon: {
    padding: 4 // Espaciado interno para que no se vea comprimido
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 8
  },
  picker: {
    flex: 1,
    marginHorizontal: 4
  },
  clearButton: {
    width: 50, // Botón más pequeño
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 8,
    marginLeft: 8
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center'
  },
  cardImage: {
    width: 120,
    height: 120, // Altura de la imagen
    borderRadius: 8,
    marginRight: 16,
    resizeMode: 'cover' // Ajuste de la imagen
  },
  cardContent: {
    flex: 1
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  error: {
    color: 'red',
    textAlign: 'center'
  }
})

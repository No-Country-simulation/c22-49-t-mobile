import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Image
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import useFetchFilters from '../hooks/useFetchFilters'

export default function Filters () {
  const [params, setParams] = useState({
    location: '',
    price: '',
    players: '',
    sport: ''
  })

  const [searchTerm, setSearchTerm] = useState('')
  const updateFilters = (field: string, value: string) => {
    setParams(prev => ({ ...prev, [field]: value }))
  }

  const { filters, loading, error } = useFetchFilters(params)

  // Actualiza los filtros en tiempo real
  useEffect(() => {
    setParams(prev => ({
      ...prev,
      location: searchTerm.trim()
    }))
  }, [searchTerm])

  const handleSearch = () => {
    setParams(prev => ({ ...prev, location: searchTerm.trim() }))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtrar Canchas</Text>

      <View style={styles.filters}>
        <TextInput
          placeholder='Buscar por ubicación o por deporte...'
          style={styles.searchBar}
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
        <TextInput
          placeholder='Precio (máximo)'
          style={styles.filterInput}
          keyboardType='numeric'
          value={params.price}
          onChangeText={text => updateFilters('price', text)}
        />
        <TextInput
          placeholder='Jugadores'
          style={styles.filterInput}
          keyboardType='numeric'
          value={params.players}
          onChangeText={text => updateFilters('players', text)}
        />
        <TextInput
          placeholder='Deporte'
          style={styles.filterInput}
          value={params.sport}
          onChangeText={text => updateFilters('sport', text)}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Icon name='magnify' size={24} color='#fff' />
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        <Picker
          selectedValue={params.location}
          onValueChange={value =>
            setParams(prev => ({ ...prev, location: value }))
          }
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
          onValueChange={value =>
            setParams(prev => ({ ...prev, sport: value }))
          }
          style={styles.picker}
        >
          <Picker.Item label='Deporte' value='' />
          <Picker.Item label='Futbol' value='Futbol' />
          <Picker.Item label='Basquetbol' value='Basquetbol' />
          <Picker.Item label='Tenis' value='Tenis' />
          <Picker.Item label='Pádel' value='Pádel' />
        </Picker>
      </View>

      {/* Resultados */}
      {loading && <Text style={styles.loading}>Cargando...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={filters}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text>Ubicación: {item.location}</Text>
            <Text>Precio: {item.price}</Text>
            <Text>Jugadores: {item.players}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  filters: {
    marginBottom: 16
  },
  filterInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8
  },
  filterRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 8
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 8
  },
  picker: { flex: 1 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  loading: { textAlign: 'center' },
  error: {
    color: 'red',
    textAlign: 'center'
  }
})

// import React from 'react'
// import FiltersScreen from '../components/Filters/FiltersScreen'
// import { Button, View, StyleSheet } from 'react-native'
// import { useRouter } from 'expo-router'

// export default function Filters () {
//   const router = useRouter()

//   return (
//     <View style={styles.container}>
//       <FiltersScreen />
//       <Button title='Volver al inicio' onPress={() => router.push('/')} />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16
//   }
// })

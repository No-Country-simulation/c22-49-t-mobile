import React, { useState } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TextInput
} from 'react-native'
import useFetchFilters from '../hooks/useFetchFilters'

export default function Filters () {
  const [params, setParams] = useState({
    location: '',
    price: '',
    players: '',
    sport: ''
  })

  const updateFilters = (field: string, value: string) => {
    setParams(prev => ({ ...prev, [field]: value }))
  }

  const { filters, loading, error } = useFetchFilters(params)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtrar Canchas</Text>

      <View style={styles.filters}>
        <TextInput
          placeholder='Ubicación'
          style={styles.filterInput}
          value={params.location}
          onChangeText={text => updateFilters('location', text)}
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
      </View>

      {loading && <ActivityIndicator size='large' color='#0000ff' />}
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

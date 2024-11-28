import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  StyleSheet
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import useFetchFilters from '../hooks/useFetchFilters'

export default function Home () {
  const [params, setParams] = useState({
    location: '',
    price: '',
    players: ''
  })

  const updateFilters = (field: string, value: string) => {
    setParams(prev => ({ ...prev, [field]: value }))
  }

  const { filters, loading, error } = useFetchFilters(params)

  return (
    <View style={styles.container}>
      {/* Banner */}
      <View style={styles.banner}>
        <Image
          source={require('../assets/images/banner/banner1.png')}
          style={styles.bannerImage}
        />
        <Text style={styles.bannerText}>Reserva tu cancha ahora</Text>
      </View>

      {/* Filtros */}
      <View style={styles.filters}>
        {/* Filtro por ubicación */}
        <Text style={styles.filterLabel}>Ubicación</Text>
        <Picker
          selectedValue={params.location}
          onValueChange={value => updateFilters('location', value)}
          style={styles.picker}
        >
          <Picker.Item label='Selecciona una ubicación' value='' />
          <Picker.Item label='Recoleta' value='Recoleta' />
          <Picker.Item label='Palermo' value='Palermo' />
        </Picker>

        {/* Filtro por precio */}
        <Text style={styles.filterLabel}>Precio</Text>
        <Picker
          selectedValue={params.price}
          onValueChange={value => updateFilters('price', value)}
          style={styles.picker}
        >
          <Picker.Item label='Selecciona un rango de precios' value='' />
          <Picker.Item label='Mayor a menor' value='desc' />
          <Picker.Item label='Menor a mayor' value='asc' />
        </Picker>

        {/* Filtro por cantidad de jugadores */}
        <Text style={styles.filterLabel}>Jugadores</Text>
        <Picker
          selectedValue={params.location}
          onValueChange={(value: string) => updateFilters('location', value)}
        >
          <Picker.Item label='Selecciona una ubicación' value='' />
          <Picker.Item label='Recoleta' value='Recoleta' />
          <Picker.Item label='Palermo' value='Palermo' />
        </Picker>
      </View>

      {/* Resultados */}
      {loading && <ActivityIndicator size='large' color='#0000ff' />}
      {error && <Text style={styles.error}>{error}</Text>}
      {!loading && !error && (
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
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16
  },
  banner: {
    marginBottom: 16,
    alignItems: 'center'
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  bannerText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  filters: {
    marginBottom: 16
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12
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
    textAlign: 'center',
    marginTop: 10
  }
})

// import React from 'react'
// import { View, Text, Button, StyleSheet } from 'react-native'
// import { useRouter } from 'expo-router'

// export default function Home () {
//   const router = useRouter()

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Bienvenido a Hay Cancha</Text>
//       <Button title='Ver filtros' onPress={() => router.push('/filters')} />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5'
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20
//   }
// })

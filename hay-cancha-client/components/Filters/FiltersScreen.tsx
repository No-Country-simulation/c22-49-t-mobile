import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'
import useFetchFilters from '../../hooks/useFetchFilters'
import bannerImage from '../../assets/images/banner/banner2.png'
import { ActivityIndicator } from 'react-native'

export default function Home () {
  const [params, setParams] = useState({
    location: '',
    price: '',
    players: ''
  })

  // Hook para obtener canchas filtradas
  const { filters, loading, error } = useFetchFilters(params)

  // Función para manejar filtros
  const updateFilters = (newFilters: Partial<typeof params>) => {
    setParams(prevParams => ({ ...prevParams, ...newFilters }))
  }

  return (
    <View style={styles.container}>
      {/* Banner principal */}
      <View style={styles.banner}>
        <Image source={bannerImage} style={styles.bannerImage} />
        <Text style={styles.bannerText}>Reserva tu cancha ahora</Text>
      </View>

      {/* Filtros */}
      <View style={styles.filters}>
        <Text style={styles.filterLabel}>Filtros</Text>
        <Text
          style={styles.filterOption}
          onPress={() => updateFilters({ location: 'Recoleta' })}
        >
          Ubicación: Recoleta
        </Text>
        <Text
          style={styles.filterOption}
          onPress={() => updateFilters({ price: '20000' })}
        >
          Precio: Hasta 20000
        </Text>
        <Text
          style={styles.filterOption}
          onPress={() => updateFilters({ players: '5' })}
        >
          Jugadores: 5
        </Text>
      </View>

      {/* Lista de resultados */}
      {loading && <ActivityIndicator size='large' color='#0000ff' />}
      {error && <Text style={styles.error}>{error}</Text>}
      {!loading && !error && (
        <FlatList
          data={filters}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.name}</Text>
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
    padding: 16,
    backgroundColor: '#f8f9fa'
  },
  banner: {
    alignItems: 'center',
    marginBottom: 16
  },
  bannerImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover'
  },
  bannerText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  filterOption: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  filters: {
    marginVertical: 16
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  error: {
    color: 'red',
    textAlign: 'center'
  }
})

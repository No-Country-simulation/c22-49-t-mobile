import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  StyleSheet
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import useFetchFilters from '../hooks/useFetchFilters'
import ImageSlider from '../components/Slider/ImageSlider'

const bannerMessages = [
  'Reserva tu cancha ahora',
  'Encuentra las mejores canchas',
  'Juega con tus amigos cerca de ti'
]

export default function Home () {
  const [params, setParams] = useState({
    location: '',
    price: '',
    players: ''
  })

  const [filtersVisible, setFiltersVisible] = useState(false)
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
      players: ''
    })
    setFiltersVisible(false)
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
        {/* Barra de búsqueda */}
        <TextInput
          style={styles.searchBar}
          placeholder='Buscar...'
          value={params.location}
          onChangeText={text => updateFilters('location', text)}
        />

        {/* Filtro por ubicación */}
        <Picker
          selectedValue={params.location}
          onValueChange={value => updateFilters('location', value)}
          style={styles.picker}
        >
          <Picker.Item label='Ubicación' value='' />
          <Picker.Item label='Recoleta' value='Recoleta' />
          <Picker.Item label='Palermo' value='Palermo' />
        </Picker>

        {/* Filtro por cantidad de jugadores */}
        <Picker
          selectedValue={params.players}
          onValueChange={value => updateFilters('players', value)}
          style={styles.picker}
        >
          <Picker.Item label='Jugadores' value='' />
          <Picker.Item label='5' value='5' />
          <Picker.Item label='10' value='10' />
        </Picker>

        {/* Botón de limpiar filtros */}
        <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
          <Icon name='broom' size={24} color='#fff' />
        </TouchableOpacity>
      </View>

      {/* Lista de canchas */}
      {filtersVisible && (
        <>
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
                  <Text>Precio: ${item.price}</Text>
                  <Text>Jugadores: {item.players}</Text>
                </View>
              )}
            />
          )}
        </>
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
    height: 25,
    borderWidth: 1,
    borderColor: '#e0e0e0', // Borde más claro
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fafafa', // Fondo más claro para diferenciar
    color: '#333', // Color del texto para buen contraste
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1 // Sutil sombreado para destacar
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
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4
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

// import React, { useEffect, useState } from 'react'
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   FlatList,
//   StyleSheet
// } from 'react-native'
// import { Picker } from '@react-native-picker/picker'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import useFetchFilters from '../hooks/useFetchFilters'

// const bannerMessages = [
//   'Reserva tu cancha ahora',
//   'Encuentra las mejores canchas',
//   'Juega con tus amigos cerca de ti'
// ]

// export default function Home () {
//   const [params, setParams] = useState({
//     location: '',
//     price: '',
//     players: ''
//   })

//   const [filtersVisible, setFiltersVisible] = useState(false)
//   const { filters, loading, error } = useFetchFilters(params)
//   const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

//   const updateFilters = (field: string, value: string) => {
//     setParams(prev => ({ ...prev, [field]: value }))
//     setFiltersVisible(true) // Muestra las canchas al actualizar un filtro
//   }

//   const clearFilters = () => {
//     setParams({
//       location: '',
//       price: '',
//       players: ''
//     })
//     setFiltersVisible(false)
//   }

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentMessageIndex(
//         prevIndex => (prevIndex + 1) % bannerMessages.length
//       )
//     }, 3000) // Cambia cada 3 segundos

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <View style={styles.container}>
//       {/* Banner */}
//       <View style={styles.banner}>
//         <Image
//           source={require('../assets/images/banner/banner1.png')}
//           style={styles.bannerImage}
//         />
//         <Text style={styles.bannerText}>
//           {bannerMessages[currentMessageIndex]} {/* Mensaje dinámico */}
//         </Text>
//       </View>

//       <View style={styles.filtersAndSearchBar}>
//         <View style={styles.searchBarContainer}>
//           {/* Barra de búsqueda */}
//           <TextInput
//             style={styles.searchBar}
//             placeholder='Buscar...'
//             value={params.location}
//             onChangeText={text =>
//               setParams(prev => ({ ...prev, location: text }))
//             }
//           />

//           {/* Botón de limpiar filtros */}
//           <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
//             <Icon name='broom' size={24} color='#fff' />
//           </TouchableOpacity>
//         </View>

//         {/* Filtros */}
//         <View style={styles.filters}>
//           {/* Filtro por ubicación */}
//           <Text style={styles.filterLabel}>Ubicación</Text>
//           <Picker
//             selectedValue={params.location}
//             onValueChange={value => updateFilters('location', value)}
//             style={styles.picker}
//           >
//             <Picker.Item label='Selecciona una ubicación' value='' />
//             <Picker.Item label='Recoleta' value='Recoleta' />
//             <Picker.Item label='Palermo' value='Palermo' />
//           </Picker>

//           {/* Filtro por precio */}
//           {/* <Text style={styles.filterLabel}>Precio</Text>
//         <Picker
//           selectedValue={params.price}
//           onValueChange={value => updateFilters('price', value)}
//           style={styles.picker}
//         >
//           <Picker.Item label='Selecciona un precio' value='' />
//           <Picker.Item label='De menor a mayor' value='asc' />
//           <Picker.Item label='De mayor a menor' value='desc' />
//         </Picker> */}

//           {/* Filtro por cantidad de jugadores */}
//           {/* <Text style={styles.filterLabel}>Jugadores</Text>
//         <Picker
//           selectedValue={params.players}
//           onValueChange={value => updateFilters('players', value)}
//           style={styles.picker}
//         >
//           <Picker.Item label='Selecciona cantidad de jugadores' value='' />
//           <Picker.Item label='5' value='5' />
//           <Picker.Item label='10' value='10' />
//         </Picker> */}
//         </View>
//       </View>

//       {/* Lista de canchas */}
//       {filtersVisible && (
//         <>
//           {loading && <ActivityIndicator size='large' color='#0000ff' />}
//           {error && <Text style={styles.error}>{error}</Text>}
//           {!loading && !error && (
//             <FlatList
//               data={filters}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={({ item }) => (
//                 <View style={styles.card}>
//                   <Text style={styles.cardTitle}>{item.name}</Text>
//                   <Text>Ubicación: {item.location}</Text>
//                   <Text>Precio: ${item.price}</Text>
//                   <Text>Jugadores: {item.players}</Text>
//                 </View>
//               )}
//             />
//           )}
//         </>
//       )}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f9f9f9'
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16
//   },
//   filtersAndSearchBar: {
//     marginBottom: 16,
//     display: 'flex'
//   },
//   searchBarContainer: {
//     flexDirection: 'row', // Coloca los elementos en una fila
//     alignItems: 'center',
//     marginBottom: 16
//   },
//   searchBar: {
//     flex: 1, // Hace que la barra de búsqueda tome todo el espacio disponible
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 8,
//     backgroundColor: '#fff'
//   },
//   clearButton: {
//     marginLeft: 8, // Espacio entre el botón y la barra de búsqueda
//     backgroundColor: '#007bff', // Color de fondo del botón
//     padding: 10,
//     borderRadius: 8
//   },
//   banner: {
//     marginBottom: 16,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   bannerImage: {
//     width: '100%',
//     height: 350,
//     resizeMode: 'cover',
//     borderRadius: 8
//   },
//   bannerText: {
//     position: 'absolute',
//     bottom: 16,
//     left: 16,
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold'
//   },
//   filters: {
//     marginBottom: 16
//   },
//   filterLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8
//   },
//   picker: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     marginBottom: 16,
//     paddingHorizontal: 8
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 16,
//     marginBottom: 16,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold'
//   },
//   error: {
//     color: 'red',
//     textAlign: 'center'
//   }
// })

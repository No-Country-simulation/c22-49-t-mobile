import React, { useEffect, useState, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Keyboard,
  Dimensions
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import useFetchFilters from '../hooks/useFetchFilters'
import ImageSlider from '../components/Slider/ImageSlider'
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get('window')

// Normaliza el texto eliminando acentos y convirtiéndolo a minúsculas
const normalizeText = (text: string) => {
  return text
    .normalize('NFD') // Descompone los caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos
    .toLowerCase()
}

const bannerMessages = [
  'Reserva tu cancha ahora',
  'Encuentra las mejores canchas',
  'Juega con tus amigos cerca de ti'
]

export default function Home () {
  const navigation = useNavigation()
  const [params, setParams] = useState({
    location: '',
    price: '',
    players: '',
    sport: ''
  })

  const [filtersVisible, setFiltersVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState<any[]>([])
  const { filters, loading, error } = useFetchFilters(params)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  const updateFilters = (field: keyof typeof params, value: string) => {
    setParams(prev => ({ ...prev, [field]: value }))
    setFiltersVisible(true)
  }

  const clearFilters = () => {
    setParams({
      location: '',
      price: '',
      players: '',
      sport: ''
    })
    setFiltersVisible(false)
    setSearchTerm('')
    setFilteredData([])
  }

  const handleSearch = () => {
    Keyboard.dismiss()

    if (!searchTerm.trim()) {
      setFilteredData(filters) // Mostrar todo si no hay término
      return
    }

    const normalizedSearchTerm = normalizeText(searchTerm)

    const results = filters.filter(
      item =>
        normalizeText(item.location).includes(normalizedSearchTerm) ||
        normalizeText(item.sport).includes(normalizedSearchTerm)
    )
    setFilteredData(results)
  }

  const flatListRef = useRef<FlatList<any>>(null)

  useEffect(() => {
    setFilteredData(filters)
  }, [filters])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(
        prevIndex => (prevIndex + 1) % bannerMessages.length
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  type Court = {
    name: string
    location: string
    price: number
    players: number
    sport: string
    image: any
  }

  return (
    <View style={styles.container}>
      {/* Banner */}
      <View style={styles.banner}>
        <Image
          source={require('../assets/images/banner/banner1.png')}
          style={styles.bannerImage}
        />
        <Text style={styles.bannerText}>
          {bannerMessages[currentMessageIndex]}
        </Text>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder='Buscar ubicación o deporte...'
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
          placeholderTextColor='#999'
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
          <Icon name='magnify' size={20} color='#333' />
        </TouchableOpacity>
        <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
          <Icon name='broom' size={24} color='#fff' />
        </TouchableOpacity>
      </View>

      {/* Filtros */}
      <View style={styles.filterRow}>
        <View style={styles.pickerContainer}>
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
        </View>
        <View style={styles.pickerContainer}>
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
        </View>
      </View>

      {/* Lista de resultados */}
      <View style={{ flex: 1, marginTop: 8 }}>
        {loading && <ActivityIndicator size='large' color='#0000ff' />}
        {error && <Text style={styles.error}>{error}</Text>}
        {!loading && !error && (
          <FlatList<Court>
            ref={flatListRef}
            data={filteredData.length > 0 ? filteredData : filters}
            keyExtractor={(item, index) => index.toString()}
            getItemLayout={(data, index) => ({
              length: 112, // Altura real del elemento
              offset: 112 * index,
              index
            })}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('details', { court: item })}
              >
                <Image source={item.image} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text>Ubicación: {item.location}</Text>
                  <Text>Precio: ${item.price}</Text>
                  <Text>Jugadores: {item.players}</Text>
                  <Text>Deporte: {item.sport}</Text>
                </View>
              </TouchableOpacity>
            )}
            onScrollToIndexFailed={info => {
              flatListRef.current?.scrollToOffset({
                offset: info.index * 112,
                animated: true
              })
            }}
          />
        )}
      </View>

      {/* Slider de imágenes */}
      <ImageSlider />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f9f9f9'
  },
  banner: {
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bannerImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 8
  },
  bannerText: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fafafa'
  },
  searchBar: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 8
  },
  searchIcon: {
    padding: 8
  },
  clearButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: '#007bff',
    borderRadius: 8
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 4
  },
  picker: {
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center'
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    alignItems: 'center'
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
    resizeMode: 'cover'
  },
  cardContent: {
    flex: 1
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  error: {
    color: 'red',
    textAlign: 'center'
  }
})

// 2do bueno
// import React, { useEffect, useState } from 'react'
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   FlatList,
//   StyleSheet,
//   Keyboard,
//   Dimensions
// } from 'react-native'
// import { Picker } from '@react-native-picker/picker'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import useFetchFilters from '../hooks/useFetchFilters'
// import ImageSlider from '../components/Slider/ImageSlider'

// const { width } = Dimensions.get('window')

// // Normaliza el texto eliminando acentos y convirtiéndolo a minúsculas
// const normalizeText = (text: string) => {
//   return text
//     .normalize('NFD') // Descompone los caracteres acentuados
//     .replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos
//     .toLowerCase()
// }

// const bannerMessages = [
//   'Reserva tu cancha ahora',
//   'Encuentra las mejores canchas',
//   'Juega con tus amigos cerca de ti'
// ]

// export default function Home () {
//   const [params, setParams] = useState({
//     location: '',
//     price: '',
//     players: '',
//     sport: ''
//   })

//   const [filtersVisible, setFiltersVisible] = useState(false)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [filteredData, setFilteredData] = useState<any[]>([])
//   const { filters, loading, error } = useFetchFilters(params)
//   const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

//   const updateFilters = (field: keyof typeof params, value: string) => {
//     setParams(prev => ({ ...prev, [field]: value }))
//     setFiltersVisible(true)
//   }

//   const clearFilters = () => {
//     setParams({
//       location: '',
//       price: '',
//       players: '',
//       sport: ''
//     })
//     setFiltersVisible(false)
//     setSearchTerm('')
//     setFilteredData([])
//   }

//   const handleSearch = () => {
//     Keyboard.dismiss()

//     if (!searchTerm.trim()) {
//       setFilteredData(filters) // Mostrar todo si no hay término
//       return
//     }

//     const normalizedSearchTerm = normalizeText(searchTerm)

//     const results = filters.filter(
//       item =>
//         normalizeText(item.location).includes(normalizedSearchTerm) ||
//         normalizeText(item.sport).includes(normalizedSearchTerm)
//     )
//     setFilteredData(results)
//   }

//   useEffect(() => {
//     setFilteredData(filters)
//   }, [filters])

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentMessageIndex(
//         prevIndex => (prevIndex + 1) % bannerMessages.length
//       )
//     }, 3000)

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
//           {bannerMessages[currentMessageIndex]}
//         </Text>
//       </View>

//       {/* Barra de búsqueda */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchBar}
//           placeholder='Buscar ubicación o deporte...'
//           value={searchTerm}
//           onChangeText={setSearchTerm}
//           onSubmitEditing={handleSearch}
//           placeholderTextColor='#999'
//         />
//         <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
//           <Icon name='magnify' size={20} color='#333' />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
//           <Icon name='broom' size={24} color='#fff' />
//         </TouchableOpacity>
//       </View>

//       {/* Filtros */}
//       <View style={styles.filterRow}>
//         <View style={styles.pickerContainer}>
//           <Picker
//             selectedValue={params.location}
//             onValueChange={value => updateFilters('location', value)}
//             style={styles.picker}
//           >
//             <Picker.Item label='Ubicación' value='' />
//             <Picker.Item label='Recoleta' value='Recoleta' />
//             <Picker.Item label='Palermo' value='Palermo' />
//             <Picker.Item label='Belgrano' value='Belgrano' />
//             <Picker.Item label='Agronomía' value='Agronomía' />
//             <Picker.Item label='Barracas' value='Barracas' />
//           </Picker>
//         </View>
//         <View style={styles.pickerContainer}>
//           <Picker
//             selectedValue={params.sport}
//             onValueChange={value => updateFilters('sport', value)}
//             style={styles.picker}
//           >
//             <Picker.Item label='Deporte' value='' />
//             <Picker.Item label='Futbol' value='Futbol' />
//             <Picker.Item label='Basquetbol' value='Basquetbol' />
//             <Picker.Item label='Tenis' value='Tenis' />
//             <Picker.Item label='Pádel' value='Pádel' />
//           </Picker>
//         </View>
//       </View>

//       {/* Lista de resultados */}
//       <View style={{ flex: 1, marginTop: 8 }}>
//         {loading && <ActivityIndicator size='large' color='#0000ff' />}
//         {error && <Text style={styles.error}>{error}</Text>}
//         {!loading && !error && (
//           <FlatList
//             data={filteredData.length > 0 ? filteredData : filters}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({ item }) => (
//               <View style={styles.card}>
//                 <Image source={item.image} style={styles.cardImage} />
//                 <View style={styles.cardContent}>
//                   <Text style={styles.cardTitle}>{item.name}</Text>
//                   <Text>Ubicación: {item.location}</Text>
//                   <Text>Precio: ${item.price}</Text>
//                   <Text>Jugadores: {item.players}</Text>
//                   <Text>Deporte: {item.sport}</Text>
//                 </View>
//               </View>
//             )}
//           />
//         )}
//       </View>

//       {/* Slider de imágenes */}
//       <ImageSlider />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 12,
//     backgroundColor: '#f9f9f9'
//   },
//   banner: {
//     marginBottom: 8,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   bannerImage: {
//     width: '100%',
//     height: 180,
//     resizeMode: 'cover',
//     borderRadius: 8
//   },
//   bannerText: {
//     position: 'absolute',
//     bottom: 8,
//     left: 8,
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     backgroundColor: '#fafafa'
//   },
//   searchBar: {
//     flex: 1,
//     height: 40,
//     fontSize: 14,
//     color: '#333',
//     paddingHorizontal: 8
//   },
//   searchIcon: {
//     padding: 8
//   },
//   clearButton: {
//     marginLeft: 8,
//     padding: 8,
//     backgroundColor: '#007bff',
//     borderRadius: 8
//   },
//   filterRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8
//   },
//   pickerContainer: {
//     flex: 1,
//     marginHorizontal: 4
//   },
//   picker: {
//     height: 40,
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     justifyContent: 'center'
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     padding: 12,
//     marginBottom: 8,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 1,
//     alignItems: 'center'
//   },
//   cardImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     marginRight: 12,
//     resizeMode: 'cover'
//   },
//   cardContent: {
//     flex: 1
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
//   error: {
//     color: 'red',
//     textAlign: 'center'
//   }
// })

//1ero bueno
// import React, { useEffect, useState } from 'react'
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   FlatList,
//   StyleSheet,
//   Keyboard,
//   Platform
// } from 'react-native'
// import { Picker } from '@react-native-picker/picker'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import useFetchFilters from '../hooks/useFetchFilters'
// import ImageSlider from '../components/Slider/ImageSlider'

// // Normaliza el texto eliminando acentos y convirtiéndolo a minúsculas
// const normalizeText = (text: string) => {
//   return text
//     .normalize('NFD') // Descompone los caracteres acentuados
//     .replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos
//     .toLowerCase()
// }

// const bannerMessages = [
//   'Reserva tu cancha ahora',
//   'Encuentra las mejores canchas',
//   'Juega con tus amigos cerca de ti'
// ]

// export default function Home () {
//   const [params, setParams] = useState({
//     location: '',
//     price: '',
//     players: '',
//     sport: ''
//   })

//   const [filtersVisible, setFiltersVisible] = useState(false)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [filteredData, setFilteredData] = useState<any[]>([])
//   const { filters, loading, error } = useFetchFilters(params)
//   const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

//   const isMobile = Platform.OS === 'ios' || Platform.OS === 'android'

//   // Actualiza los parámetros de los filtros
//   const updateFilters = (field: keyof typeof params, value: string) => {
//     setParams(prev => ({ ...prev, [field]: value }))
//     setFiltersVisible(true)
//   }

//   // Limpiar los filtros y búsqueda
//   const clearFilters = () => {
//     setParams({
//       location: '',
//       price: '',
//       players: '',
//       sport: ''
//     })
//     setFiltersVisible(false)
//     setSearchTerm('')
//     setFilteredData([])
//   }

//   // Manejar la búsqueda en la barra de búsqueda
//   const handleSearch = () => {
//     Keyboard.dismiss()

//     if (!searchTerm.trim()) {
//       setFilteredData(filters) // Mostrar todo si no hay término
//       return
//     }

//     const normalizedSearchTerm = normalizeText(searchTerm)

//     const results = filters.filter(
//       item =>
//         normalizeText(item.location).includes(normalizedSearchTerm) ||
//         normalizeText(item.sport).includes(normalizedSearchTerm)
//     )
//     setFilteredData(results)
//   }

//   // Actualizar los resultados cuando cambian los filtros
//   useEffect(() => {
//     setFilteredData(filters)
//   }, [filters])

//   // Rotación automática del mensaje del banner
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentMessageIndex(
//         prevIndex => (prevIndex + 1) % bannerMessages.length
//       )
//     }, 3000)

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
//           {bannerMessages[currentMessageIndex]}
//         </Text>
//       </View>

//       {/* Barra de búsqueda */}
//       <View style={styles.filterRow}>
//         <View style={styles.searchContainer}>
//           <TextInput
//             style={styles.searchBar}
//             placeholder='Buscar ubicación o deporte...'
//             value={searchTerm}
//             onChangeText={setSearchTerm}
//             onSubmitEditing={handleSearch}
//             placeholderTextColor='#999'
//           />
//           <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
//             <Icon name='magnify' size={20} color='#333' />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Filtros */}
//       <View style={styles.filterRow}>
//         <View style={styles.pickerContainer}>
//           {/* <Text style={styles.pickerLabel}>Ubicación</Text> */}
//           <Picker
//             selectedValue={params.location}
//             onValueChange={value => updateFilters('location', value)}
//             style={styles.picker}
//           >
//             <Picker.Item label='Ubicación' value='' />
//             <Picker.Item label='Recoleta' value='Recoleta' />
//             <Picker.Item label='Palermo' value='Palermo' />
//             <Picker.Item label='Belgrano' value='Belgrano' />
//             <Picker.Item label='Agronomía' value='Agronomía' />
//             <Picker.Item label='Barracas' value='Barracas' />
//           </Picker>
//         </View>
//         <View style={styles.pickerContainer}>
//           {/* <Text style={styles.pickerLabel}>Deporte</Text> */}
//           <Picker
//             selectedValue={params.sport}
//             onValueChange={value => updateFilters('sport', value)}
//             style={styles.picker}
//           >
//             <Picker.Item label='Deporte' value='' />
//             <Picker.Item label='Futbol' value='Futbol' />
//             <Picker.Item label='Basquetbol' value='Basquetbol' />
//             <Picker.Item label='Tenis' value='Tenis' />
//             <Picker.Item label='Pádel' value='Pádel' />
//           </Picker>
//         </View>
//         <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
//           <Icon name='broom' size={24} color='#fff' />
//         </TouchableOpacity>
//       </View>

//       {/* Lista de resultados */}
//       <View style={{ flex: 1, marginTop: 8 }}>
//         {loading && <ActivityIndicator size='large' color='#0000ff' />}
//         {error && <Text style={styles.error}>{error}</Text>}
//         {!loading && !error && (
//           <FlatList
//             data={filteredData.length > 0 ? filteredData : filters}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({ item }) => (
//               <View style={styles.card}>
//                 <Image source={item.image} style={styles.cardImage} />
//                 <View style={styles.cardContent}>
//                   <Text style={styles.cardTitle}>{item.name}</Text>
//                   <Text>Ubicación: {item.location}</Text>
//                   <Text>Precio: ${item.price}</Text>
//                   <Text>Jugadores: {item.players}</Text>
//                   <Text>Deporte: {item.sport}</Text>
//                 </View>
//               </View>
//             )}
//           />
//         )}
//       </View>

//       {/* Slider de imágenes */}
//       <ImageSlider />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 12,
//     backgroundColor: '#f9f9f9'
//   },
//   banner: {
//     marginBottom: 8,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   bannerImage: {
//     width: '100%',
//     height: 180,
//     resizeMode: 'cover',
//     borderRadius: 8
//   },
//   bannerText: {
//     position: 'absolute',
//     bottom: 8,
//     left: 8,
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
//   filterRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//     borderRadius: 8
//   },
//   searchContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     backgroundColor: '#fafafa'
//   },
//   searchBar: {
//     flex: 1,
//     height: 40,
//     fontSize: 14,
//     color: '#333',
//     paddingHorizontal: 8,
//     outlineColor: 'transparent'
//   },
//   searchIcon: {
//     padding: 8
//   },
//   picker: {
//     width: '100%',
//     height: Platform.OS === 'android' ? 40 : 30
//   },
//   pickerContainer: {
//     flex: 1,
//     marginHorizontal: 4,
//     alignItems: 'center'
//   },
//   //   pickerLabel: {
//   //     fontSize: 14,
//   //     marginBottom: 4,
//   //     color: '#666'
//   //   },
//   clearButton: {
//     width: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#007bff',
//     borderRadius: 8,
//     marginLeft: 8
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     padding: 12,
//     marginBottom: 8,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 1,
//     alignItems: 'center'
//   },
//   cardImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     marginRight: 12,
//     resizeMode: 'cover'
//   },
//   cardContent: {
//     flex: 1
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: 'bold'
//     //marginBottom: 8
//   },
//   error: {
//     color: 'red',
//     textAlign: 'center'
//   }
// })

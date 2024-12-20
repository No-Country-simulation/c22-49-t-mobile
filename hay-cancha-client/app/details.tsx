import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native'
import { Calendar, DateData } from 'react-native-calendars'
import { useCourt } from '@/context/CourtContext'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList, Court } from '@/types/navigationTypes'

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'details'>

export default function Details ({ route, navigation }: DetailsProps) {
  const { selectedCourt } = useCourt()

  if (!selectedCourt) {
    return (
      <View style={styles.container}>
        <Text>No se pudo cargar la información de la cancha.</Text>
      </View>
    )
  }
  console.log('Court recibido:', selectedCourt)
  const [selectedDate, setSelectedDate] = useState<string>('')

  const handleReserve = () => {
    Alert.alert(
      'Reserva Confirmada',
      `Se ha reservado la cancha para el día ${selectedDate}. Se le ha enviado un correo con las indicaciones a seguir.`,
      [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
    )
  }

  return (
    <View style={styles.container}>
      <Image source={selectedCourt.image} style={styles.image} />
      <Text style={styles.title}>{selectedCourt.name}</Text>
      <Text>Ubicación: {selectedCourt.location}</Text>
      <Text>Precio: ${selectedCourt.price}</Text>
      <Text>Jugadores: {selectedCourt.players}</Text>
      <Text>Deporte: {selectedCourt.sport}</Text>
      <Calendar
        onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: '#00adf5'
          }
        }}
      />
      <TouchableOpacity
        onPress={handleReserve}
        style={[
          styles.button,
          { backgroundColor: selectedDate ? '#007bff' : '#ccc' }
        ]}
        disabled={!selectedDate}
      >
        <Text style={styles.buttonText}>Reservar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, borderRadius: 8, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  button: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  errorText: { fontSize: 16, marginBottom: 16 }
})

// import React, { useState } from 'react'
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Alert
// } from 'react-native'
// import { Calendar, DateData } from 'react-native-calendars'
// import { useCourt } from '@/context/CourtContext'
// import { NativeStackScreenProps } from '@react-navigation/native-stack'
// import { RootStackParamList, Court } from '@/types/navigationTypes'

// type DetailsProps = NativeStackScreenProps<RootStackParamList, 'details'>

// export default function Details ({ route, navigation }: DetailsProps) {
//   const court = route?.params?.court
//   console.log('Route:', route)
//   console.log('Route params:', route?.params)
//   console.log('Court:', route?.params?.court)

//   if (!court) {
//     console.error('No se recibieron los parámetros en la ruta.')
//     console.log('Route:', route)
//     console.log('Route params:', route?.params)
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>No se pudo cargar la información.</Text>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.button}
//         >
//           <Text style={styles.buttonText}>Volver</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }
//   console.log('Court recibido:', court)
//   const [selectedDate, setSelectedDate] = useState<string>('')

//   const handleReserve = () => {
//     Alert.alert(
//       'Reserva Confirmada',
//       `Se ha reservado la cancha para el día ${selectedDate}. Se le ha enviado un correo con las indicaciones a seguir.`,
//       [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <Image source={court.image} style={styles.image} />
//       <Text style={styles.title}>{court.name}</Text>
//       <Text>Ubicación: {court.location}</Text>
//       <Text>Precio: ${court.price}</Text>
//       <Text>Jugadores: {court.players}</Text>
//       <Text>Deporte: {court.sport}</Text>
//       <Calendar
//         onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
//         markedDates={{
//           [selectedDate]: {
//             selected: true,
//             marked: true,
//             selectedColor: '#00adf5'
//           }
//         }}
//       />
//       <TouchableOpacity
//         onPress={handleReserve}
//         style={[
//           styles.button,
//           { backgroundColor: selectedDate ? '#007bff' : '#ccc' }
//         ]}
//         disabled={!selectedDate}
//       >
//         <Text style={styles.buttonText}>Reservar</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#fff' },
//   image: { width: '100%', height: 200, borderRadius: 8, marginBottom: 16 },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
//   button: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 16 },
//   buttonText: { color: '#fff', fontWeight: 'bold' },
//   errorText: { fontSize: 16, marginBottom: 16 }
// })

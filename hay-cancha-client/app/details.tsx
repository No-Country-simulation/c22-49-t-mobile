import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal
} from 'react-native'
import { Calendar, DateData } from 'react-native-calendars'
import { useCourt } from '@/context/CourtContext'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types/navigationTypes'

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'details'>

export default function Details ({ route }: DetailsProps) {
  const { selectedCourt } = useCourt()
  const navigation = useNavigation()

  if (!selectedCourt) {
    return (
      <View style={styles.container}>
        <Text>No se pudo cargar la información de la cancha.</Text>
      </View>
    )
  }
  console.log('Court recibido:', selectedCourt)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [disabledDates, setDisabledDates] = useState<{ [key: string]: any }>({})
  const [modalVisible, setModalVisible] = useState(false)

  if (!selectedCourt) {
    return (
      <View style={styles.container}>
        <Text>No se pudo cargar la información de la cancha.</Text>
      </View>
    )
  }

  const handleReserve = () => {
    if (!selectedDate) {
      setModalVisible(true) // Mostrar el modal de error si no hay fecha seleccionada
      return
    }

    setDisabledDates(prev => ({
      ...prev,
      [selectedDate]: {
        disabled: true,
        disableTouchEvent: true,
        //selected: true,
        marked: true,
        selectedColor: '#ff0000' // Rojo para indicar que está reservada
      }
    }))

    setModalVisible(true)
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
          ...disabledDates,
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: '#00adf5' // Azul para la fecha seleccionada
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

      {/* Modal */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {selectedDate
                ? 'Reserva Confirmada'
                : 'Error: Fecha no seleccionada'}
            </Text>
            {selectedDate ? (
              <Text style={styles.modalText}>
                Se ha reservado la cancha para el día {selectedDate}. Se le ha
                enviado un correo con las indicaciones.
              </Text>
            ) : (
              <Text style={styles.modalText}>
                Por favor selecciona una fecha antes de reservar.
              </Text>
            )}

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false)
                if (selectedDate) {
                  if (navigation?.navigate) {
                    navigation.navigate('Home')
                  } else {
                    console.error('Error: navigation no está definido.')
                  }
                }
              }}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, borderRadius: 8, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  button: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  errorText: { fontSize: 16, marginBottom: 16 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Fondo oscuro
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalText: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  modalButtonText: { color: '#fff', fontWeight: 'bold' }
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

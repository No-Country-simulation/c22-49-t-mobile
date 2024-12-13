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
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type RootStackParamList = {
  Home: undefined
  Details: { court: any } // Define el tipo correcto aquí
}

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'details'>

export default function Details ({ route, navigation }: DetailsProps) {
  const { court } = route.params

  if (!court) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se pudo cargar la información.</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    )
  }

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
      <Image source={court.image} style={styles.image} />
      <Text style={styles.title}>{court.name}</Text>
      <Text>Ubicación: {court.location}</Text>
      <Text>Precio: ${court.price}</Text>
      <Text>Jugadores: {court.players}</Text>
      <Text>Deporte: {court.sport}</Text>
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

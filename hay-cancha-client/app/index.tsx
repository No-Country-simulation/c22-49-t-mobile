import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

export default function Home () {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Hay Cancha</Text>
      <Button title='Ver filtros' onPress={() => router.push('/filters')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  }
})

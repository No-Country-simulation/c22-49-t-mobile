import React from 'react'
import FiltersScreen from '../components/Filters/FiltersScreen'
import { Button, View, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

export default function Filters () {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <FiltersScreen />
      <Button title='Volver al inicio' onPress={() => router.push('/')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  }
})

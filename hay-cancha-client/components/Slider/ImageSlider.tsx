import React, { useState, useRef, useEffect } from 'react'
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native'
import { Asset } from 'expo-asset'

const images = [
  Asset.fromModule(require('../../assets/images/slider-fields/field1.png')).uri,
  Asset.fromModule(require('../../assets/images/slider-fields/field2.png')).uri,
  Asset.fromModule(require('../../assets/images/slider-fields/field3.png')).uri,
  Asset.fromModule(require('../../assets/images/slider-fields/field4.png')).uri,
  Asset.fromModule(require('../../assets/images/slider-fields/field5.png')).uri,
  Asset.fromModule(require('../../assets/images/slider-fields/field6.png')).uri,
  Asset.fromModule(require('../../assets/images/slider-fields/field7.png')).uri,
  Asset.fromModule(require('../../assets/images/slider-fields/field8.png')).uri,
  Asset.fromModule(require('../../assets/images/slider-fields/field9.png')).uri,
  Asset.fromModule(require('../../assets/images/slider-fields/field10.png')).uri
]

export default function ImageSlider () {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
    }, 3000) // Cambia cada 3 segundos

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollToIndex({
        index: currentIndex,
        animated: true
      })
    }
  }, [currentIndex])

  return (
    <View style={styles.sliderContainer}>
      <FlatList
        ref={sliderRef}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <Image source={item} style={styles.image} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  sliderContainer: {
    height: 120, // Ajusta la altura del slider
    marginTop: 10,
    marginBottom: 16
  },
  image: {
    width: Dimensions.get('window').width / 3, // Cada imagen ocupa un tercio del ancho
    height: 120,
    marginHorizontal: 4, // Espaciado entre imágenes
    borderRadius: 8,
    resizeMode: 'cover'
  }
})
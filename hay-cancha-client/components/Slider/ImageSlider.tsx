import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  ImageSourcePropType
} from 'react-native'

const images: { uri: ImageSourcePropType }[] = [
  { uri: require('../../assets/images/slider-fields/basquetbol.png') },
  { uri: require('../../assets/images/slider-fields/basquetbol1.png') },
  { uri: require('../../assets/images/slider-fields/basquetbol2.png') },
  { uri: require('../../assets/images/slider-fields/basquetbol3.png') },
  { uri: require('../../assets/images/slider-fields/futbol.png') },
  { uri: require('../../assets/images/slider-fields/futbol2.png') },
  { uri: require('../../assets/images/slider-fields/padel.png') },
  { uri: require('../../assets/images/slider-fields/tenis2.png') }
]

export default function ImageSlider () {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<FlatList<{ uri: ImageSourcePropType }> | null>(null)

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
        renderItem={({ item }) => (
          <Image source={item.uri} style={styles.image} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  sliderContainer: {
    height: 120,
    marginBottom: 16
  },
  image: {
    width: Dimensions.get('window').width / 3.5, // Cada imagen ocupa un tercio del ancho
    height: 120,
    marginHorizontal: 4, // Espaciado entre imágenes
    borderRadius: 8,
    resizeMode: 'cover'
  }
})

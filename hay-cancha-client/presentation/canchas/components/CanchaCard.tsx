import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const placeholderImage = require("../../../assets/images/no-cancha-image.png");

interface Props {
  canchaId:string,
  price_per_hour: number;
  location: string;
  images?: string;
}

const CanchaCard = ({ canchaId,price_per_hour, location, images }: Props) => {
  const handlePress = () => {
    router.push(`/(canchas-app)/cancha/${canchaId}`)
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.cardContainer}>
      <Image
        source={images ? { uri: images[0] } : placeholderImage}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.precio}>
          Precio por hora: <Text style={styles.bold}>${price_per_hour}</Text>
        </Text>
        <Text style={styles.ubicacion}>
          Ubicación: <Text style={styles.bold}>{location}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex:1,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4,
    margin: 4,
    overflow: "hidden",
    position: "relative", 
    height: 280, 
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  precio: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 5,
  },
  ubicacion: {
    fontSize: 14,
    color: "#ccc",
  },
  bold: {
    fontWeight: "bold",
  },
});

export default CanchaCard;

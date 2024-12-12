import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const placeholderImage = require("../../../assets/images/no-cancha-image.png");

interface Props {
  price_per_hour: number;
  location: string;
  images?: string;
}

const CanchaCard = ({ price_per_hour, location, images }: Props) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={images ? { uri: images[0] } : placeholderImage}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.precio}>
          Precio por hora: <Text style={styles.bold}>${price_per_hour}</Text>
        </Text>
        <Text style={styles.ubicacion}>Ubicación: {location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    maxWidth:130,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 6,
    overflow: "hidden",
    margin:4
  },
  image: {
    width: "100%",
    height: 150,
  },
  infoContainer: {
    padding: 15,
  },
  precio: {
    fontSize: 14,
    marginBottom: 5,
  },
  ubicacion: {
    fontSize: 14,
    color: "#555",
  },
  bold: {
    fontWeight: "bold",
  },
});

export default CanchaCard;

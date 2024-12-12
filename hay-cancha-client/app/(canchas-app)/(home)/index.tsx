import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import Slider from "@react-native-community/slider"; // Importa desde el paquete adecuado
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FilterComponent = () => {
  const primaryColor = useThemeColor({}, "primary");

  const [filters, setFilters] = useState({
    location: "",
    type: "",
    // price_per_hour: 20000,
  });

  const updateFilter = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    console.log("Filtros aplicados:", filters);

    const queryParams = new URLSearchParams({
      location: filters.location,
      type: filters.type,
      // price_per_hour: filters.price_per_hour.toString(),
    });

    router.push(`/result?${queryParams.toString()}`);
  };

  return (
    <View style={styles.container}>
      {/* Imagen en la parte superior */}
      <Image
        source={{
          uri: "https://civideportes.com.co/wp-content/uploads/2019/08/Cancha-de-f%C3%BAtbol-11.jpg",
        }}
        style={styles.image}
      />
      <View
        style={{
          backgroundColor: "black",
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText type="title" style={{ color: primaryColor }}>
          Canchas por tu zona!!
        </ThemedText>
      </View>
      {/* Filtros */}
      <View style={styles.filtersContainer}>
        {/* Deporte */}
        <View style={styles.filterButton}>
          <Picker
            selectedValue={filters.type}
            onValueChange={(itemValue) => updateFilter("type", itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona el deporte" value="" />
            <Picker.Item label="Fútbol" value="Fútbol" />
            <Picker.Item label="Básquetbol" value="Básquetbol" />
            <Picker.Item label="Tenis" value="Tenis" />
            <Picker.Item label="Pádel" value="Pádel" />
            <Picker.Item label="Vóleibol" value="Vóleibol" />
          </Picker>
        </View>

        {/* Ubicación */}
        <View style={styles.filterButton}>
          <Picker
            selectedValue={filters.location}
            onValueChange={(itemValue) => updateFilter("location", itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona una ubicación" value="" />
            <Picker.Item label="Palermo" value="Palermo" />
            <Picker.Item label="Belgrano" value="Belgrano" />
          </Picker>
        </View>

        {/* Precio por Hora  */}
        {/* <View style={styles.filterButton}>
          <Text style={styles.priceLabel}>
            Precio por hora: ${filters.price_per_hour}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={20000}
            maximumValue={40000}
            step={5}
            value={filters.price_per_hour}
            onValueChange={(value) =>
              setFilters({ ...filters, price_per_hour: Math.round(value) })
            }
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#1EB1FC"
          />
        </View> */}

        {/* Botón de aplicar filtros */}
        <TouchableOpacity
          onPress={applyFilters}
          style={[styles.applyButton, { backgroundColor: primaryColor }]}
        >
          <Text style={styles.applyText}>Aplicar Filtros</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
  },
  filtersContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  filterButton: {
    backgroundColor: "white",
    borderWidth: 0.3,
    borderColor: "blue",
    borderRadius: 8,
    marginVertical: 10,
  },
  picker: {
    marginHorizontal: 10,
  },
  priceLabel: {
    fontSize: 16,
    marginHorizontal: 30,
    marginTop: 10,
  },
  slider: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  applyButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  applyText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default FilterComponent;

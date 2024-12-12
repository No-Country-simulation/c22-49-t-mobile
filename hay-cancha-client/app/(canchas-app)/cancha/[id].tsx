import { useCanchaStore } from "@/presentation/canchas/store/useCanchaStore";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const CanchaScreen = () => {
  const { id } = useLocalSearchParams();
  const {
    loading,
    error,
    fetchCanchaId,
    selectedCancha,
    clearCanchaId,
  } = useCanchaStore();

  useEffect(() => {
    const canchaId = Array.isArray(id) ? id[0] : id;

    if (canchaId) {
      fetchCanchaId(canchaId);
    }

    return () => {
      clearCanchaId();
    };
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Cargando cancha...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  }

  if (!selectedCancha) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No se encontró la cancha...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.canchaContainer}>
        {/* Imagen principal de la cancha */}
        {selectedCancha.images[0] && (
          <Image
            source={{ uri: selectedCancha.images[0] }}
            style={styles.canchaImage}
            resizeMode="cover"
          />
        )}

        <Text style={styles.canchaTitle}>{selectedCancha.name}</Text>
        <Text style={styles.canchaLocation}>{selectedCancha.location}</Text>
        <Text style={styles.canchaPrice}>
          Precio por hora: ${selectedCancha.price_per_hour}
        </Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Detalles:</Text>
          <Text style={styles.detailsText}>Tipo: {selectedCancha.type}</Text>
          <Text style={styles.detailsText}>
            Horario de apertura: {selectedCancha.opening_hours}
          </Text>
          <Text style={styles.detailsText}>
            Hora de cierre: {selectedCancha.closing_time}
          </Text>
          <Text style={styles.detailsText}>
            Dirección: {selectedCancha.address.streetName} {selectedCancha.address.streetNumber}
          </Text>
        </View>

        {/* Estado de disponibilidad */}
        <View style={[styles.stateContainer, selectedCancha.state === "disponible" && styles.available]}>
          <Text style={styles.stateText}>
            {selectedCancha.state === "disponible" ? "Disponible" : "No disponible"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default CanchaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  canchaContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  canchaImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  canchaTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  canchaLocation: {
    fontSize: 18,
    color: "#777",
    marginBottom: 5,
  },
  canchaPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  detailsContainer: {
    marginTop: 15,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  stateContainer: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  available: {
    backgroundColor: "#e0ffe0",
  },
  stateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

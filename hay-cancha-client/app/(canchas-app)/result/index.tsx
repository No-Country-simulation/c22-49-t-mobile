import CanchaCard from "@/presentation/canchas/components/CanchaCard";
import { useCanchaStore } from "@/presentation/canchas/store/useCanchaStore";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

const ResultadoPage = () => {
  const { location, type } = useLocalSearchParams();
  const { canchas, loading, error, fetchCanchas, clearCanchas } =
    useCanchaStore();

  useEffect(() => {
    fetchCanchas({ location, type });
    return () => {
      clearCanchas();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Cargando canchas...</Text>
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

  if (canchas.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          No hay resultados que coincidan con la búsqueda...
        </Text>
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={canchas}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2} // Dos columnas
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row} // Para distribuir uniformemente
        renderItem={({ item }) => (
          <CanchaCard
          canchaId={item._id}
            price_per_hour={item.price_per_hour}
            location={item.location}
            images={item.images || "https://via.placeholder.com/150"}
          />
        )}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 10,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    marginHorizontal:8,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between", 
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default ResultadoPage;

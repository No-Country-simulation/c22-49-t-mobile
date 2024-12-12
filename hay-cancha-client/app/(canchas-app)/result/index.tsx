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
          No hay resultados que coincidan con la bsuqueda...
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
        renderItem={({ item }) => (
          <CanchaCard
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
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  listContainer: {
    paddingVertical: 10,
    justifyContent: "center", 
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  item: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    width: "100%",
  },
  itemText: {
    fontSize: 16,
  },
});

export default ResultadoPage;

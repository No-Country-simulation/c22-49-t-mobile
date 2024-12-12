import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

const CanchaScreen = () => {
  const { id } = useLocalSearchParams();
  

  return (
    <View>
      <Text>CanchaScreen</Text>
    </View>
  );
};

export default CanchaScreen;

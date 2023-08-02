import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useRoute } from "@react-navigation/native";

const MapScreen = () => {
  const {
    params: { coords, postLocation },
  } = useRoute();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        mapType="standard"
        minZoomLevel={15}>
        <Marker
          title={postLocation}
          coordinate={coords}
          description={postLocation}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;

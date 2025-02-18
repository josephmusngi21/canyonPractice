import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Tracking from '../components/geolocation/tracking/Tracking.jsx';
import Timer from '../components/Timer/Timer.jsx';
import List from '../components/List/List.jsx';

export default function Index() {
  const [hasSavedLocation, setHasSavedLocation] = useState(false);

  useEffect(() => {
    // Need logic to check if user has saved location
    const checkForSavedLocation = async () => {
      const savedLocation = await getSavedLocation();
      setHasSavedLocation(!!savedLocation);
    };

    checkForSavedLocation();
  }, []);

  const getSavedLocation = async () => {
      return null; // or return some location data if exists
  };

  return (
    <View style={styles.container}>
      {hasSavedLocation ? <Timer /> : <Text>You can save a location</Text>}
      <Tracking />
      <List />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

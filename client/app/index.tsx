import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Tracking from '../components/geolocation/tracking/Tracking.jsx';
import Timer from '../components/timer/Timer.jsx';
import List from '../components/List/List.jsx';

export default function Index() {
  return (
    <View style={styles.container}>
      <Tracking />
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

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import addList from "./addList"; 
import { getLocationDataFromServer, saveLocationDataToServer } from "../../util/api.js";

export default function List() {
  const [place, setPlace] = useState("");
  const [startLongitude, setStartLongitude] = useState("");
  const [startLatitude, setStartLatitude] = useState("");
  const [endLongitude, setEndLongitude] = useState("");
  const [endLatitude, setEndLatitude] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getLocationDataFromServer();
      setLocations(data.map(loc => new addList(loc.place, loc.startLongitude, loc.startLatitude, loc.endLongitude, loc.endLatitude)));
    };

    fetchLocations();
  }, []);

  const handleAddLocation = async () => {
    const newLocation = new addList(
      place,
      parseFloat(startLongitude),
      parseFloat(startLatitude),
      parseFloat(endLongitude),
      parseFloat(endLatitude)
    );
    setLocations([...locations, newLocation]);
    setPlace("");
    setStartLongitude("");
    setStartLatitude("");
    setEndLongitude("");
    setEndLatitude("");

    await saveLocationDataToServer([newLocation]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Run Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Place"
        value={place}
        onChangeText={setPlace}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Longitude"
        value={startLongitude}
        onChangeText={setStartLongitude}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Start Latitude"
        value={startLatitude}
        onChangeText={setStartLatitude}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="End Longitude"
        value={endLongitude}
        onChangeText={setEndLongitude}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="End Latitude"
        value={endLatitude}
        onChangeText={setEndLatitude}
        keyboardType="numeric"
      />
      <Button title="Add Location" onPress={handleAddLocation} />
      <Text style={styles.subHeader}>Locations:</Text>
      {locations.map((location, index) => (
        <View key={index} style={styles.locationContainer}>
          <Text>Place: {location.getPlace()}</Text>
          <Text>Start Longitude: {location.getStartLongitude()}</Text>
          <Text>Start Latitude: {location.getStartLatitude()}</Text>
          <Text>End Longitude: {location.getEndLongitude()}</Text>
          <Text>End Latitude: {location.getEndLatitude()}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  locationContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
});
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import addList from "./addList"; 
import { getLocationDataFromServer, saveLocationDataToServer } from "../../util/api.js";

export default function List() {
  // State variables for input fields and locations list
  const [place, setPlace] = useState("");
  const [startLongitude, setStartLongitude] = useState("");
  const [startLatitude, setStartLatitude] = useState("");
  const [endLongitude, setEndLongitude] = useState("");
  const [endLatitude, setEndLatitude] = useState("");
  const [locations, setLocations] = useState([]);

  // Fetch locations from server when component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      // Get location data from server
      const data = await getLocationDataFromServer();
      // Map the data to addList instances and update state
      setLocations(data.map(loc => new addList(loc.place, loc.startLongitude, loc.startLatitude, loc.endLongitude, loc.endLatitude)));
    };

    fetchLocations();
  }, []);

  // Handle adding a new location
  const handleAddLocation = async () => {
    // Create a new location instance
    const newLocation = new addList(
      place,
      parseFloat(startLongitude),
      parseFloat(startLatitude),
      parseFloat(endLongitude),
      parseFloat(endLatitude)
    );
    // Update locations state with new location
    setLocations([...locations, newLocation]);
    // Clear input fields
    setPlace("");
    setStartLongitude("");
    setStartLatitude("");
    setEndLongitude("");
    setEndLatitude("");

    // Save new location to server
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
          {/* Display location details */}
          <Text>{location.place}</Text>
          <Text>Start: {location.startLongitude}, {location.startLatitude}</Text>
          <Text>End: {location.endLongitude}, {location.endLatitude}</Text>
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
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import addList from "./addList"; // Adjust the import path as necessary

export default function List() {
  const [place, setPlace] = useState("");
  const [startLongitude, setStartLongitude] = useState("");
  const [startLatitude, setStartLatitude] = useState("");
  const [endLongitude, setEndLongitude] = useState("");
  const [endLatitude, setEndLatitude] = useState("");
  const [locations, setLocations] = useState([]);

  const handleAddLocation = () => {
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
  };

  return (
    <View>
      <Text>Add New Run Location</Text>
      <TextInput
        placeholder="Place"
        value={place}
        onChangeText={setPlace}
      />
      <TextInput
        placeholder="Start Longitude"
        value={startLongitude}
        onChangeText={setStartLongitude}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Start Latitude"
        value={startLatitude}
        onChangeText={setStartLatitude}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="End Longitude"
        value={endLongitude}
        onChangeText={setEndLongitude}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="End Latitude"
        value={endLatitude}
        onChangeText={setEndLatitude}
        keyboardType="numeric"
      />
      <Button title="Add Location" onPress={handleAddLocation} />
      <Text>Locations:</Text>
      {locations.map((location, index) => (
        <View key={index}>
          <Text>Place: {location.getPlace()}</Text>
          <Text>Start Longitude: {location.getStartLongitude()}</Text>
          <Text>Start Latitude: {location.getStartLatitude()}</Text>
          <Text>End Longitude: {location.getEndLongitude()}</Text>
          <Text>End Latitude: {location.getEndLatitude()}</Text>
          <Text>Distance: {location.calculateDistance()} km</Text>
        </View>
      ))}
    </View>
  );
}
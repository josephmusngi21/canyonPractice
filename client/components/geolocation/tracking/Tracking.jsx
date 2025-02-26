import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tracking = () => {
    const [locationData, setLocationData] = useState([]);
    const [isTracking, setIsTracking] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const watchId = useRef(null);

    useEffect(() => {
        const startTracking = async () => {
            try {
                // Request location permissions
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                // Start watching the location
                watchId.current = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.Highest,
                        timeInterval: 1000,
                        distanceInterval: 1,
                    },
                    (location) => {
                        const { latitude, longitude, speed } = location.coords;
                        const timestamp = new Date().toISOString();
                        const newLocationData = { latitude, longitude, speed, timestamp };
                        setLocationData((prevData) => [...prevData, newLocationData]);
                    }
                );
            } catch (error) {
                setErrorMsg('Failed to start tracking');
                console.error(error);
            }
        };
        //todo: need to fix stop tracking, currently crashing
        if (isTracking) {
            startTracking();
        } else if (watchId.current) {
            // Stop watching the location
            watchId.current.remove();
            watchId.current = null;
        }

        // Cleanup function to stop watching the location when the component unmounts
        return () => {
            if (watchId.current) {
                watchId.current.remove();
                watchId.current = null;
            }
        };
    }, [isTracking]);

    const handleSaveData = async () => {
        try {
            // Save location data to the server and local storage
            await saveLocationDataToServer(locationData);
            await AsyncStorage.setItem('locationData', JSON.stringify(locationData));
            setLocationData([]);
        } catch (error) {
            console.error('Failed to save data', error);
        }
    };

    let locationText = 'Waiting..';
    if (errorMsg) {
        locationText = errorMsg;
    } else if (locationData.length > 0) {
        locationText = JSON.stringify(locationData, null, 2);
    }

    return (
        <View>
            <Button title={isTracking ? 'Stop Tracking' : 'Start Tracking'} onPress={() => setIsTracking(!isTracking)} />
            <Button title="Save Data" onPress={handleSaveData} />
            <Text>{locationText}</Text>
        </View>
    );
};

export default Tracking;
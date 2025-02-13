import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveLocationDataToServer } from '../../utils/api';

const Tracking = () => {
    const [locationData, setLocationData] = useState([]);
    const [isTracking, setIsTracking] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        let watchId;

        const startTracking = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            watchId = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
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
        };

        if (isTracking) {
            startTracking();
        } else if (watchId) {
            Location.clearWatchAsync(watchId);
        }

        return () => {
            if (watchId) {
                Location.clearWatchAsync(watchId);
            }
        };
    }, [isTracking]);

    const handleSaveData = async () => {
        try {
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
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tracking = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            await AsyncStorage.setItem('location', JSON.stringify(location));
        })();
    }, []);

    let locationText = 'Waiting..';
    if (errorMsg) {
        locationText = errorMsg;
    } else if (location) {
        locationText = JSON.stringify(location);
    }

    return (
        <View>
            <Text>{locationText}</Text>
        </View>
    );
};

export default Tracking;
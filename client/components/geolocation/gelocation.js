import { useEffect, useState } from 'react';
import { getCurrentPositionAsync } from 'expo-location';

const Geolocation = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await getCurrentPositionAsync({});
            setLocation(location);
        };

        fetchLocation();
    }, []);

    return (
        <div>
            {location ? (
                <p>Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}</p>
            ) : (
                <p>Fetching location...</p>
            )}
        </div>
    );
};

export default Geolocation;
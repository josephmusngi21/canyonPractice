class addList {
    constructor(place, startLongitude, startLatitude, endLongitude = null, endLatitude = null) {
        // Initialize the properties of the addList instance
        this.place = place;
        this.startLongitude = startLongitude;
        this.startLatitude = startLatitude;
        this.endLongitude = endLongitude;
        this.endLatitude = endLatitude;
    }

    // Get the place
    getPlace() {
        return this.place;
    }

    // Get the starting longitude
    getStartLongitude() {
        return this.startLongitude;
    }

    // Get the starting latitude
    getStartLatitude() {
        return this.startLatitude;
    }

    // Get the ending longitude
    getEndLongitude() {
        return this.endLongitude;
    }

    // Get the ending latitude
    getEndLatitude() {
        return this.endLatitude;
    }

    // Set a new place
    setPlace(newPlace) {
        this.place = newPlace;
    }

    // Set new starting coordinates
    setStartCoordinates(longitude, latitude) {
        this.startLongitude = longitude;
        this.startLatitude = latitude;
    }

    // Set new ending coordinates
    setEndCoordinates(longitude, latitude) {
        this.endLongitude = longitude;
        this.endLatitude = latitude;
    }

    // Validate if the given coordinates are within valid ranges
    validateCoordinates(longitude, latitude) {
        return longitude >= -180 && longitude <= 180 && latitude >= -90 && latitude <= 90;
    }

    // Calculate the distance between start and end coordinates in kilometers
    calculateDistance() {
        if (this.endLongitude === null || this.endLatitude === null) {
            return null; // Return null if end coordinates are not set
        }

        const toRadians = (degrees) => degrees * (Math.PI / 180);
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = toRadians(this.endLatitude - this.startLatitude);
        const dLong = toRadians(this.endLongitude - this.startLongitude);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(toRadians(this.startLatitude)) * Math.cos(toRadians(this.endLatitude)) *
                  Math.sin(dLong / 2) * Math.sin(dLong / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers

        return distance;
    }

    // Calculate the distance between start and end coordinates in miles
    calculateDistanceInMiles() {
        const distanceInKm = this.calculateDistance();
        if (distanceInKm === null) {
            return null; // Return null if distance in kilometers is null
        }
        const kmToMiles = 0.621371;
        return distanceInKm * kmToMiles;
    }

    // Create an addList instance from an object
    static fromObject(obj) {
        return new addList(obj.place, obj.startLongitude, obj.startLatitude, obj.endLongitude, obj.endLatitude);
    }
}
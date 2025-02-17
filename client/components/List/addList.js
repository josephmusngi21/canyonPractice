class addList {
    constructor(place, startLongitude, startLatitude, endLongitude = null, endLatitude = null) {
        this.place = place;
        this.startLongitude = startLongitude;
        this.startLatitude = startLatitude;
        this.endLongitude = endLongitude;
        this.endLatitude = endLatitude;
    }

    getPlace() {
        return this.place;
    }

    getStartLongitude() {
        return this.startLongitude;
    }

    getStartLatitude() {
        return this.startLatitude;
    }

    getEndLongitude() {
        return this.endLongitude;
    }

    getEndLatitude() {
        return this.endLatitude;
    }

    calculateDistance() {
        if (this.endLongitude === null || this.endLatitude === null) {
            return null;
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
}
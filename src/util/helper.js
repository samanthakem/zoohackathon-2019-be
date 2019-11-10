const calculateDistance = (lat1,lon1,lat2,lon2) => {
    var R = 6371; // Earth's radius in Km
    return Math.acos(Math.sin(lat1)*Math.sin(lat2) +
                    Math.cos(lat1)*Math.cos(lat2) *
                    Math.cos(lon2-lon1)) * R;
}

module.exports = {
    calculateDistance
}

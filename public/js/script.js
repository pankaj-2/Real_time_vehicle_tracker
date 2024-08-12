const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("send-location", { latitude, longitude });
        },
        (error) => {
            console.error(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
}

// Initialize the map and set its view
const map = L.map('map').setView([12.973297, 77.708889], 15);

// Add the tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Pankaj',
}).addTo(map);

const markers = {};

// Define icons for Home and Office markers
const homeIcon = new L.Icon({
    iconUrl: '../icons/metro.png',  // Relative to your public folder
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const officeIcon = new L.Icon({
    iconUrl: '../icons/office.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Add Home marker (replace with actual coordinates)
L.marker([12.98086, 77.70879], { icon: homeIcon })
    .addTo(map)
    .bindPopup('<b>Home</b>');

// Add Office marker (replace with actual coordinates)
L.marker([12.973297, 77.708889], { icon: officeIcon })
    .addTo(map)
    .bindPopup('<b>Office</b>');

socket.on("receive-location", (data) => {
    const { id, latitude, longitude, number } = data;
    map.setView([latitude, longitude], 15);
    
    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(`<b>Marker #${number}</b><br>Latitude: ${latitude}<br>Longitude: ${longitude}`)
            .openPopup();
    }
});

socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});

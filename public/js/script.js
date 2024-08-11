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
//const map = L.map('map').setView([0,0], 16); // Use appropriate coordinates and zoom level
const map = L.map('map').setView([12.973297, 77.708889], 15);



// Add the tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Pankaj ',
}).addTo(map);

const markers ={};

// Define a custom icon
// const customIcon = L.icon({
//     iconUrl: '', // Replace with the path to your custom icon
//     iconSize: [38, 38], // Customize the size
//     iconAnchor: [19, 38], // Customize the anchor point
//     popupAnchor: [0, -38] // Customize the popup anchor point
// });

// Define icons for Home and Office markers
const homeIcon = new L.Icon({
    iconUrl: '../icons/metro.png',  // You can use a custom icon if you want
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

socket.on("receive-location",(data)=> {
    const {id, latitude,longitude} = data;
    map.setView([latitude,longitude],15);
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude]);
    }
    else {
        markers[id] = new L.marker([latitude,longitude]).addTo(map);
    }
});

socket.on("user-disconnected", (id) => {
    if(markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id]
    }
});
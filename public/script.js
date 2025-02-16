document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("updateLocation", { latitude, longitude });
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    socket.on("broadcastLocation", (users) => {
        for (let id in users) {
            let user = users[id];

            // If marker for user doesn't exist, create one
            if (!markers[id]) {
                markers[id] = L.marker([user.latitude, user.longitude]).addTo(map)
                    .bindPopup(`User ${id}`).openPopup();
            } else {
                // Update existing marker position
                markers[id].setLatLng([user.latitude, user.longitude]);
            }
            
        }
        for (let id in markers) {
            if (!users[id]) {
                map.removeLayer(markers[id]);
                delete markers[id];
            }
        }

    });
});
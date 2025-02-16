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
        console.log("Updated locations:", users);
    });
});
// App.jsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// أيقونات مخصصة
const busIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61236.png",
  iconSize: [30, 30],
});

const selectedBusIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61236.png",
  iconSize: [40, 40],
});

export default function App() {
  // بيانات باصات وهمية
  const [buses, setBuses] = useState([
    { id: 1, name: "Bus 1", lat: 31.95, lng: 35.91, capacity: 30 },
    { id: 2, name: "Bus 2", lat: 31.96, lng: 35.92, capacity: 20 },
    { id: 3, name: "Bus 3", lat: 31.97, lng: 35.90, capacity: 25 },
  ]);

  const [selectedBusId, setSelectedBusId] = useState(null);

  const handleBusSelect = (id) => {
    setSelectedBusId(id);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h1 style={{ textAlign: "center" }}>Amana Bus Tracker</h1>
      <MapContainer
        center={[31.95, 35.91]}
        zoom={13}
        style={{ height: "90%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {buses.map((bus) => (
          <Marker
            key={bus.id}
            position={[bus.lat, bus.lng]}
            icon={bus.id === selectedBusId ? selectedBusIcon : busIcon}
            eventHandlers={{
              click: () => handleBusSelect(bus.id),
            }}
          >
            <Popup>
              <b>{bus.name}</b>
              <br />
              Capacity: {bus.capacity}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <h2>Bus List</h2>
        {buses.map((bus) => (
          <button
            key={bus.id}
            onClick={() => handleBusSelect(bus.id)}
            style={{
              margin: "5px",
              padding: "5px 10px",
              backgroundColor: bus.id === selectedBusId ? "green" : "#ccc",
              color: bus.id === selectedBusId ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {bus.name}
          </button>
        ))}
      </div>
    </div>
  );
}

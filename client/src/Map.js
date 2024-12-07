import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import avatarIconImage from './avatarnew.png'; // Assuming avatarnew.png is in the same folder
import templeIconImage from './temple.png'; // Assuming temple.png is in the same folder
import eduInstiIconImage from './eduinsti.png'; // Assuming eduinsti.png is in the same folder
import beachIconImage from './beachnew.png'; // Assuming beachnew.png is in the same folder
import parkIconImage from './parknew.png'; // Assuming parknew.png is in the same folder

// Load custom icons
const avatarIcon = new L.Icon({
  iconUrl: avatarIconImage, // Using imported avatar icon
  iconSize: [32, 32],       // Adjust size as needed
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const templeIcon = new L.Icon({
  iconUrl: templeIconImage, // Using temple icon for temples
  iconSize: [64, 64],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const eduInstiIcon = new L.Icon({
  iconUrl: eduInstiIconImage, // Using educational institution icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const beachIcon = new L.Icon({
  iconUrl: beachIconImage, // Using beach icon for beach locations
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const parkIcon = new L.Icon({
  iconUrl: parkIconImage, // Using park icon for End Point, Tree Park, and Railway Bridge
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const attractions = [
  { name: "Manipal Lake", coords: [13.34212, 74.78449], description: "Manipal Lake is a serene and picturesque spot surrounded by lush greenery.", icon: beachIcon },
  { name: "Venugopal Temple", coords: [13.34488, 74.79119], description: "The Venugopal Temple is dedicated to Lord Krishna and is renowned for its stunning architecture.", icon: templeIcon },
  { name: "End Point", coords: [13.37158, 74.78483], description: "End Point is a breathtaking viewpoint that offers panoramic views.", icon: parkIcon },
  { name: "Hasta Shilpa Village", coords: [13.34347, 74.78974], description: "Hasta Shilpa Village is an open-air museum showcasing traditional Karnataka architecture.", icon: eduInstiIcon },
  { name: "Tree Park", coords: [13.32209, 74.80541], description: "Tree Park is a beautiful urban park featuring diverse tree species.", icon: parkIcon },
  { name: "Anatomy Museum", coords: [13.35270, 74.78549], description: "The Anatomy Museum offers fascinating insights into human anatomy.", icon: eduInstiIcon },
  { name: "Railway Bridge", coords: [13.38255, 74.76306], description: "The Railway Bridge is an iconic structure providing stunning views.", icon: parkIcon },
  { name: "Sri Krishna Temple", coords: [13.34119, 74.75207], description: "The Sri Krishna Temple is a famous pilgrimage site.", icon: templeIcon },
  { name: "Malpe Beach", coords: [13.36219, 74.69868], description: "Malpe Beach is a popular destination for sunbathers.", icon: beachIcon },
  { name: "Delta Beach", coords: [13.41877, 74.69610], description: "Delta Beach is known for its peaceful environment and scenic beauty.", icon: beachIcon },
  { name: "Kaup Beach", coords: [13.22388, 74.74075], description: "Kaup Beach is famous for its lighthouse and serene atmosphere.", icon: beachIcon },
  { name: "St. Mary’s Island", coords: [13.37829, 74.67307], description: "St. Mary’s Island is known for unique geological formations.", icon: beachIcon }
];

function Map() {
  const [position, setPosition] = useState(null);  // User's current location

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      () => {
        alert('Could not get your location.');
      }
    );
  }, []);

  return (
    <div className="Map">
      <h1>Discover Underrated Places Near You</h1>
      {position && (
        <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }}>
          {/* Map tile layer from Stadia Maps */}
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> contributors'
          />
          {/* User's current location with avatar icon */}
          <Marker position={position} icon={avatarIcon}>
            <Popup>You are here</Popup>
          </Marker>
          {/* Display attraction locations */}
          {attractions.map((attraction, index) => (
            <Marker key={index} position={attraction.coords} icon={attraction.icon}>
              <Popup>
                <strong>{attraction.name}</strong><br />
                {attraction.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}

export default Map;

import React, { useState } from 'react';

const GeoLocationTest = () => {
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
        },
        error => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  };

  const loadMap = () => {
    if (window.google) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: coordinates.latitude, lng: coordinates.longitude },
        zoom: 15
      });

      new window.google.maps.Marker({
        position: { lat: coordinates.latitude, lng: coordinates.longitude },
        map: map,
        title: 'Current Location'
      });
    } else {
      console.error("Google Maps API not loaded");
    }
  };

  return (
    <div>
    <button className="btn btn-primary" onClick={getLocation}>Get Location</button>
    
    <div id="map" style={{ width: '400px', height: '300px' }}>
      <p>Latitude: {coordinates.latitude}</p>
      <p>Longitude: {coordinates.longitude}</p>
      </div>
  </div>
  
  );
};

export default GeoLocationTest;

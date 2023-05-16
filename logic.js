"use strict";

const form = document.querySelector(".form");
const containerDives = document.querySelector(".dives");
const inputName = document.querySelector(".form_input_name");
const inputDepth = document.querySelector(".form_input_depth");
const inputDuration = document.querySelector(".form_input_duration");
const inputWaves = document.querySelector(".form_input_waves");
const inputWeather = document.querySelector(".form_input_weather");
const inputHighlight = document.querySelector(".form_input_highlight");
const formBtn = document.querySelector(".form_btn");
const map = document.querySelector("#map");

// geolocation API
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const coords = [latitude, longitude];

      // leaflet: display map
      const map = L.map("map").setView(coords, 13);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // marker on click
      map.on("click", (mapEvent) => {
        console.log(mapEvent);
        const { lat, lng } = mapEvent.latlng;

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
              className: "leaflet_pop_up",
            })
          )
          .setPopupContent("Dive")
          .openPopup();
      });
    },
    function () {
      alert("Could not get your position.");
    }
  );

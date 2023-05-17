"use strict";

const form = document.querySelector("form");
const containerDives = document.querySelector(".dives");
const inputName = document.querySelector(".form_input_name");
const inputDepth = document.querySelector(".form_input_depth");
const inputDuration = document.querySelector(".form_input_duration");
const inputWaves = document.querySelector(".form_input_waves");
const inputWeather = document.querySelector(".form_input_weather");
const inputHighlight = document.querySelector(".form_input_highlight");
const formBtn = document.querySelector(".form_btn");
// const containerMap = document.querySelector("#map");
// let map, mapEvent;

class Dive {
  date = new Date();
  id = Date.now();
  constructor(
    // date,
    // id,
    coords,
    name,
    depth,
    duration,
    waves,
    weather,
    highlight
  ) {
    // this.date = date;
    // this.id = Date.now();
    this.coords = coords;
    this.name = name;
    this.depth = depth;
    this.duration = duration;
    this.waves = waves;
    this.weather = weather;
    this.highlight = highlight;
  }
}

// class DiveLog extends Dive {
//   constructor(date, id, coords, depth, duration, waves, weather, highlight) {
//     super(date, id, coords, depth, duration, waves, weather, highlight);
//   }
// }

const diveLog1 = new Dive(
  [7, 5],
  "Elfinstone",
  30,
  23,
  "high",
  "sunny",
  "sharks"
);
console.log(diveLog1);

class App {
  map;
  mapEvent;
  dives = [];
  constructor() {
    this._getPosition();

    // form.addEventListener("submit", (e) => {
    formBtn.addEventListener("click", this._newDive.bind(this));
  }

  _getPosition() {
    // geolocation API
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position.");
        }
      );
  }

  _loadMap(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coords = [latitude, longitude];

    // leaflet: display map
    this.map = L.map("map").setView(coords, 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // handle clicks on map
    this.map.on("click", this._showForm.bind(this));
    // map.on("click", this._showForm);
  }

  _showForm(e) {
    this.mapEvent = e;
    form.classList.remove("d-none");
    inputName.focus();
  }

  _newDive(e) {
    e.preventDefault();

    // get data from form
    const name = inputName.value;
    const depth = inputDepth.value;
    const duration = inputDuration.value;
    const waves = inputWaves.value;
    const weather = inputWeather.value;
    const highlight = inputHighlight.value;
    const lat = this.mapEvent.latlng.lat;
    const lng = this.mapEvent.latlng.lng;

    // check if data is valid

    // create dive object
    const diveLog2 = new Dive(
      [lat, lng],
      name,
      depth,
      duration,
      waves,
      weather,
      highlight
    );

    // add new object to dive array
    this.dives.push(diveLog2);
    console.log(this.dives);

    // render dive on map as marker
    // display marker

    L.marker([lat, lng])
      .addTo(this.map)
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

    // render dive on list

    // hide form and clear input fields
    inputName.value = "";
    inputDepth.value = "";
    inputDuration.value = "";
    inputWaves.value = "";
    inputWeather.value = "";
    inputHighlight.value = "";
    form.classList.add("d-none");
  }
}

const app = new App();

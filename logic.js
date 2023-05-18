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
const moveToPopupBtn = document.querySelector(".move_to_popup_btn");
const deleteBtn = document.querySelector(".delete_btn");

class Dive {
  date = new Date();
  id = String(Date.now());
  constructor(coords, name, depth, duration, waves, weather, highlight) {
    this.coords = coords;
    this.name = name;
    this.depth = depth;
    this.duration = duration;
    this.waves = waves;
    this.weather = weather;
    this.highlight = highlight;
    this._setDescription();
  }
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.name} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class App {
  map;
  mapZoomLevel = 13;
  mapEvent;
  dives = [];
  constructor() {
    this._getPosition();

    // get data from local storage
    this._getLocalStorage();

    // attach event handlers
    formBtn.addEventListener("click", this._newDive.bind(this));

    containerDives.addEventListener("click", this._moveToPopup.bind(this));
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
    this.map = L.map("map").setView(coords, this.mapZoomLevel);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // handle clicks on map
    this.map.on("click", this._showForm.bind(this));

    this.dives.forEach((dive) => this._renderDiveMarker(dive));
  }

  _showForm(e) {
    this.mapEvent = e;
    form.classList.remove("d-none");
    inputName.focus();
  }

  // hide form and clear input fields
  _hideForm() {
    inputName.value = "";
    inputDepth.value = "";
    inputDuration.value = "";
    inputWaves.value = "";
    inputWeather.value = "";
    inputHighlight.value = "";
    form.classList.add("d-none");
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

    // render dive on list
    this._renderDive(diveLog2);

    // render dive on map as marker
    this._renderDiveMarker(diveLog2);

    // hide form
    this._hideForm();

    // set local storage
    this._setLocalStorage();
  }

  _renderDive(diveLog2) {
    let html = `<li  role="button" class="p-3 m-3 rounded list-unstyled dive" data-id="${diveLog2.id}">
    <h2>${diveLog2.description}</h2>
<div class="dive_details ">
  <span class="dive_icon">🤿</span>
  <span class="dive_value">${diveLog2.name}</span>
</div>
<div class="d-flex flex-wrap justify-content-between">
  <div class="dive_details ">
    <span class="dive_icon">📏</span>
    <span class="dive_value">${diveLog2.depth}</span>
    <span class="dive_unit">m</span>
  </div>
  <div class="dive_details ">
    <span class="dive_icon">⏱</span>
    <span class="dive_value">${diveLog2.duration}</span>
    <span class="dive_unit">min</span>
  </div>
  <div class="dive_details ">
    <span class="dive_icon">🌊</span>
    <span class="dive_value">${diveLog2.waves}</span>
  </div>
  <div class="dive_details ">
    <span class="dive_icon">🌡️</span>
    <span class="dive_value">${diveLog2.weather}</span>
  </div>
</div>
<div class="dive_details ">
  <span class="dive_icon">⭐</span>
  <span class="dive_value">${diveLog2.highlight}</span>
</div>
</li>`;
    form.insertAdjacentHTML("afterend", html);
  }

  _renderDiveMarker(diveLog2) {
    L.marker(diveLog2.coords)
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
      .setPopupContent(`${diveLog2.description}`)
      .openPopup();
  }

  _moveToPopup(e) {
    const diveEl = e.target.closest(".dive");
    console.log(diveEl);
    if (!diveEl) return;
    const diveLog = this.dives.find((dL) => dL.id === diveEl.dataset.id);
    console.log(this.dives);
    console.log(diveLog);

    this.map.setView(diveLog.coords, this.mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });
  }

  _setLocalStorage() {
    localStorage.setItem("dives", JSON.stringify(this.dives));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("dives"));

    if (!data) return;
    this.dives = data;

    this.dives.forEach((dive) => this._renderDive(dive));
  }
}

const app = new App();

# DIVE LOG MAP

## Description:

The Dive Log Application is a web-based tool that allows users to keep track of their scuba diving experiences. Users can add dives to their log by providing details such as dive location, depth, duration, weather conditions, and personal highlights. The application also provides a visual representation of dives on an interactive map.

## Demo:

View project demo at https://jb-dive-log-map.netlify.app/

## Usage:

To use the Dive Log Application, follow these steps:

    1. Open the application in a web browser.
    2. Grant permission to access your current location when prompted.
    3. Click on the map at the desired dive location to add a new dive.
    4. Fill out the dive details in the form that appears.
    5. Click the "Submit" button to add the dive to the log.
    6. The dive will be displayed on the map as a marker and in the dive list.
    7. Click on a dive in the list to move the map view to that dive's location.
    8. Dives are automatically saved to local storage, allowing you to access them later.

## Technologies Used:

- HTML
- CSS
- JavaScript
- Bootstrap
- Leaflet
- localStorage

## Features:

- Interactive Map: The application integrates with Leaflet, a popular JavaScript library for interactive maps. Users can click on the map to add a new dive, and existing dives are displayed as markers on the map. Clicking on a dive marker will move the map view to the dive's location.

- Dive Log Form: Users can fill out a form to add a new dive to their log. The form includes fields for dive name, depth, duration, waves, weather conditions, and personal highlights. The form is displayed on the map when the user clicks on a specific location.

  - Dive List: All added dives are displayed in a list format, showing relevant dive information such as the date, name, depth, duration, waves, weather, and highlights. Each dive in the list is clickable, allowing users to quickly navigate to the dive's location on the map.

  - Persistence: The application uses the browser's local storage to store dive data. This ensures that dive logs are preserved even when the page is refreshed or closed. The stored data is retrieved and displayed when the application is reopened.

## Contributing:

If you would like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

/*********************** Global Variables ***********************/

// Grab #btnSearch click event when user enters a value in the search field and presses the enter key or clicks the search button
let btn = document.querySelector("#btnSearch");

// Grab the #pastCity click event when user clicks on a city in the past city list
let pastCity = document.querySelector("#pastCity");

// Grab the #searchCity input field to get the value of the city the user entered
let searchCity = document.querySelector("#searchCity");

// Grab the #forecastCity div to display the city name and date
let forecastCity = document.querySelector("#forecastCity");

/*********** Execute Functions **********/
/*                                      */
// Function to initialize the page
/*                                      */
init();
/*                                      */
/*                                      */
function init() {
  loadCity();
}
/*                                      */
/****************************************/

// Function to load the city name and date from local storage
let dataStorage = JSON.parse(localStorage.getItem("cities")) || [];

// Function to save a searched city in local storage.
let saveCity = function (city) {
  let flag = false;
  if (dataStorage) {
    // Check if a city is already present in local storage
    for (let i = 0; i < dataStorage.length; i++) {
      if (dataStorage[i] === city) {
        flag = true;
      }
    }
  }
  if (!flag) {
    dataStorage.push(city);
    localStorage.setItem("cities", JSON.stringify(dataStorage));
  }
  // Load cities again.
  loadCity();
};
// console.log(dataStorage);

/******************************************* Functions ***********************************************/
/*                                                                                                   */
// TODO: Function to get the current weather for the city the user entered
/*                                                                                                   */
/*                                                                                                   */
/*                                                                                                   */
// TODO: Initialize the function to get the current weather for the city the user entered
/*                                                                                                   */
/*                                                                                                   */
/*                                                                                                   */
// TODO: Function to grab data from local storage and display it in the past city list
/*                                                                                                   */
/*                                                                                                   */

// Function to retrieve the current weather for the city the user entered from the OpenWeather API

async function getForecast(city) {
  let cityUrl;
  if (location.protocol === "http:") {
    cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=b49f09d83751bac497ac0bcca783dc04";
  } else {
    cityUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=b49f09d83751bac497ac0bcca783dc04";
  }

  // Calling API using fetch() method to get CITY coordinates
  const response = await fetch(cityUrl);
}

/*****************************************************************************************************/

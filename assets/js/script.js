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

  // Saving the API response in a JSON object.
  let cityData = await response.json();

  // If city doesn't exist show an error message
  if (cityData.length == 0) {
    $("#show").html(`<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">NO City Found!</strong>
    </div>`);
  } else {
    // If exist then save city in past cities
    saveCity(city);
    // Coordinates of a city
    let long = cityData[0].lon;
    let lat = cityData[0].lat;
    let weatherUrl;
    if (location.protocol === "http:") {
      weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&appid=b49f09d83751bac497ac0bcca783dc04`;
    } else {
      weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&appid=b49f09d83751bac497ac0bcca783dc04`;
    }
    // Calling API for weather forecast of the city
    const response2 = await fetch(weatherUrl);

    // Saving the api response data in JSON object.
    let data = await response2.json();
    // Sending data to showData() function to show data on screen.
    showData(data);
  }
}

/*****************************************************************************************************/

// Function to show data from API
function showData(data) {
  // Saves current day's data into variables.
  let cityName = data.city.name;
  let today = data.list[0];
  let timeStamp = today.dt;

  // let todayDate = dt.getDate() + '/'+ dt.getMonth() + '/'+ dt.getFullYear();
  let d = new Date(0); // 0 key sets the date to the epoch
  d.setUTCSeconds(timeStamp);
  let todayDate = utcToDate(today.dt);
  let todayIcon = today.weather[0].icon;
  let todayTemp = today.main.temp;
  let todayHumidity = today.main.temp;
  let todayWind = today.wind.speed;
  let len = Object.keys(data.list).length;

  let show = "";

  // Combines all data from the API into a string.
  show += `<div class="border p-3 mb-5">
  <h1 class="text-3xl font-bold">${cityName}</h1>
  <h4 class="text-md text-gray-500"><img src="https://openweathermap.org/img/wn/${todayIcon}.png"></h4>
  <h2 class="text-xl text-black-500 font-semibold">${todayDate}</h2>
  <p>Temperature: ${todayTemp} °F / ${toCelsius(todayTemp)} °C</p>
  <p>Humidity: ${todayHumidity}% </p>
  <p> Wind Speed: ${todayWind} MPH / ${toKph(todayWind)} KPH</p>
</div>`;

  show += `<div class="fiveDay">
  <h1 class="text-3xl font-semibold mb-4">5 Day Forecast</h1>
  <div class="flex flex-wrap justify-between">`;

  show += `<div class="block lg:w-1/4 mb-2 md:w-4/12 sm:w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow-md bg-blue-500 hover:bg-blue-400">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${todayDate}</h5>
  <img src="https://openweathermap.org/img/wn/${todayIcon}.png" alt="Icon">
  <p class="text-md font-normal text-white">Temp: ${todayTemp} °F / ${toCelsius(todayTemp)} °C</p>
  <p class="text-md font-normal text-white">Humidity: ${todayHumidity}%</p>
</div>`;

  let lastDate = todayDate;
  let day, dayDate, dayTemp, dayHumidity, dayIcon;
  let j = 0;
  // Gets the data for next five days and combining it to show.
  for (let i = 1; i <= len; i += 5) {
    day = data.list[i];
    if (day != undefined) {
      dayDate = utcToDate(day.dt);
      if (dayDate != lastDate && j < 4) {
        // console.log(day.dt_txt);
        dayTemp = day.main.temp;
        dayHumidity = day.main.humidity;
        dayIcon = day.weather[0].icon;
        show += `<div class="block lg:w-1/4 mb-2 md:w-4/12 sm:w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow-md bg-blue-500 hover:bg-blue-400">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${dayDate}</h5>
              <img src="https://openweathermap.org/img/wn/${dayIcon}.png" alt="Icon">
              <p class="text-md font-normal text-white">Temp: ${dayTemp} °F / ${toCelsius(dayTemp)} °C</p>
              <p class="text-md font-normal text-white">Humidity: ${dayHumidity}%</p>
          </div>`;
        lastDate = dayDate;
        j += 1;
      }
    }
  }
  show += `</div>
          </div>`;
  // Shows all data on page.
  $("#show").html(show);
}

/*****************************************************************************************************/

// Initialize the function to get the current weather for the city the user entered

btn.click(function () {
  let city = searchCity.val();
  getForecast(city);
  // console.log(city);
});

// Function to grab data from local storage and display it in the past city list
/*                                                                                                   */
/*                                                                                                   */

function loadCity() {
  // Clear everything in Past Cities Field
  $("#pastCity").html("");
  // Show all past cities from local storage
  for (let i = 0; i < dataStorage.length; i++) {
    $("#pastCity").append('<li class="p-3 hover:bg-gray-200 cursor-pointer">' + dataStorage[i] + "</li>");
  }
}

/****************************************Utility Functions *******************************************/

// Function to convert Fahrenheit to Celsius
function toCelsius(temp) {
  return (((temp - 32) * 5) / 9).toFixed(2);
}

// Function to convert mph to kph
function toKph(speed) {
  return (1.609 * speed).toFixed(2);
}

// Function to convert timestamp to date
function utcToDate(timeStamp) {
  let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(timeStamp);
  return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
}

/****************************************Initial Page Load Behavior*******************************************/

// Initialize the page
init();

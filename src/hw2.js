function formattedDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayIndex = date.getDay();
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

function showWeather(response) {
  let temperatureElement = document.querySelector("#number-degrees");
  let currentTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = currentTemperature;

  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].main;
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 78;
}
function convertToCelsuis(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 26;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsuis);

function searchCity(city) {
  let apiKey = "70cca878601436ccf9abe6701485d34f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "70cca878601436ccf9abe6701485d34f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentGeolocation() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentGeolocation);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentTime = new Date();
let dateElement = document.querySelector("#current-time");
dateElement.innerHTML = formattedDate(currentTime);

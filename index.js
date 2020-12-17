// API Config
const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const APIURL = (location) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;

// DOM elements

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// API calls
async function getWeatherByLocation(location) {
  const response = await fetch(APIURL(location), {
    origin: "cors",
  });
  const responseData = await response.json();

  addWeatherToPage(responseData);
}

// Functions

function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");
  weather.innerHTML = `
    <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C</h2>
    <small>in ${search.value}</small>
    
  `;

  search.value = "";
  // clean container
  main.innerHTML = "";

  main.appendChild(weather);
}

function KtoC(K) {
  return (K - 273.15).toFixed(2);
}

// Event listeners

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  if (location) {
    getWeatherByLocation(location);
  }
});

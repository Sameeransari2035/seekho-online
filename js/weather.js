const cityInput = document.getElementById("city-input");
const cityBtn = document.getElementById("city-btn");
const msgEl = document.getElementById("weather-msg");
const cardEl = document.getElementById("weather-card");
const cityEl = document.getElementById("w-city");
const tempEl = document.getElementById("w-temp");
const descEl = document.getElementById("w-desc");
const extraEl = document.getElementById("w-extra");

function weatherText(code) {
  if (code === 0) return "Saaf aasmaan ☀️";
  if (code <= 3) return "Halke baadal ⛅";
  if (code === 45 || code === 48) return "Kohra 🌫️";
  if (code >= 51 && code <= 57) return "Halki boondabandi 🌦️";
  if (code >= 61 && code <= 67) return "Baarish 🌧️";
  if (code >= 71 && code <= 77) return "Barfbaari ❄️";
  if (code >= 80 && code <= 82) return "Tez baarish ke jhonke 🌧️";
  if (code >= 95) return "Aandhi-toofan ⛈️";
  return "Mausam ka data mila";
}

async function getWeather() {
  const city = cityInput.value.trim();

  if (city === "") {
    msgEl.textContent = "Pehle shehar ka naam likhein.";
    cardEl.style.display = "none";
    return;
  }

  msgEl.textContent = "Dhundh rahe hain...";
  cardEl.style.display = "none";
  cityBtn.disabled = true;

  try {
    const geoUrl =
      "https://geocoding-api.open-meteo.com/v1/search?name=" +
      encodeURIComponent(city) + "&count=1";
    const geoRes = await fetch(geoUrl);
    if (!geoRes.ok) throw new Error("Geocoding error");
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      msgEl.textContent = "Ye shehar nahi mila. Spelling check karein.";
      return;
    }

    const place = geoData.results[0];
        localStorage.setItem("lastCity", city);

    const weatherUrl =
      "https://api.open-meteo.com/v1/forecast?latitude=" + place.latitude +
      "&longitude=" + place.longitude +
      "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code";
    const wRes = await fetch(weatherUrl);
    if (!wRes.ok) throw new Error("Weather error");
    const wData = await wRes.json();
    const now = wData.current;

    cityEl.textContent = place.name + ", " + place.country;
    tempEl.textContent = now.temperature_2m + " °C";
    descEl.textContent = weatherText(now.weather_code);
    extraEl.textContent =
      "Nami: " + now.relative_humidity_2m + "%  |  Hawa: " +
      now.wind_speed_10m + " km/h";

    msgEl.textContent = "";
    cardEl.style.display = "block";
  } catch (error) {
    msgEl.textContent = "Data nahi aa paya. Internet check karke dobara try karein.";
  } finally {
    cityBtn.disabled = false;
  }
}

cityBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") getWeather();
});

const savedCity = localStorage.getItem("lastCity");
if (savedCity) {
  cityInput.value = savedCity;
  getWeather();
}
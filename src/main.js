document.addEventListener("DOMContentLoaded", function () {
  const submitbtn = document.getElementById("submit");

  let title = document.getElementById("main-card-title");
  let temp = document.getElementById("main-card-temp");
  let wind = document.getElementById("main-card-wind");
  let humidity = document.getElementById("main-card-humidity");

  const endpoint = "https://api.openweathermap.org/";
  const apiKey = "6f9ea20be5ffff67f64770cd3b4ad14c";

  let lat = "";
  let lon = "";

  const apiEngine = async () => {
    if (localStorage.getItem("lat") && localStorage.getItem("lon")) {
      lat = localStorage.getItem("lat");
      lon = localStorage.getItem("lon");
    } else {
      lat = 33.74;
      lon = -84.38;
    }

    const path = "data/2.5/forecast";
    const queryParams = `?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const url = `${endpoint}${path}${queryParams}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        let jsonResponse = await response.json();
        return jsonResponse;
      }
    } catch (Error) {
      console.log(Error);
    }
  };

  const mainCard = async () => {
    let jsonResponse = await apiEngine();
    let status = jsonResponse.list[0].weather[0].main;
    console.log(jsonResponse);

    if (status === "Clouds") {
      var state = "☁️";
    } else if (status === "Clear") {
      var state = "🔆";
    } else if (status === "Rain") {
      var state = "🌧️";
    } else if (status === "partly cloudy") {
      var state = "⛅";
    } else if (status === "Snow") {
      var state = "❄️";
    }

    let kelTemp = jsonResponse.list[0].main.temp;
    let f = ((kelTemp - 273) * 9) / 5 + 32;
    f = Math.floor(f);

    title.textContent = `${jsonResponse.city.name} (Today) ${state}`;
    temp.textContent = `Temp: ${f}F°`;
    wind.textContent = `Wind: ${jsonResponse.list[0].wind.speed} MPH`;
    humidity.textContent = ` Humidity: ${jsonResponse.list[0].main.humidity}%`;
  };
  mainCard();

  const sectionCards = async () => {
    let section = document.getElementById("section");

    let sectionTitle = document.querySelectorAll(".card-date");
    let sectionTemp = document.querySelectorAll(".section-card-temp");
    let sectionWind = document.querySelectorAll(".section-card-wind");
    let sectionHumidity = document.querySelectorAll(".section-card-humidity");

    let jsonResponse = await apiEngine();
    let status = jsonResponse.list[0].weather[0].main;

    if (status === "Clouds") {
      var state = "☁️";
    } else if (status === "Clear") {
      var state = "🔆";
    } else if (status === "Rain") {
      var state = "🌧️";
    } else if (status === "partly cloudy") {
      var state = "⛅";
    } else if (status === "Snow") {
      var state = "❄️";
    }

    for (let i = 0; i < section.childElementCount; i++) {
      let kelTemp = jsonResponse.list[i].main.temp;
      let f = ((kelTemp - 273) * 9) / 5 + 32;
      f = Math.floor(f);

      sectionTitle[i].textContent = `${jsonResponse.list[i].dt_txt} ${state}`;
      sectionTemp[i].textContent = `Temp: ${f}F°`;
      sectionWind[
        i
      ].textContent = `Wind: ${jsonResponse.list[i].wind.speed} MPH`;
      sectionHumidity[
        i
      ].textContent = `Humidity: ${jsonResponse.list[i].main.humidity}%`;
    }
  };

  sectionCards();

  function handleClick(e) {
    e.preventDefault();
    const city = document.getElementById("city").value;
    geologicalApi(city);
  }

  submitbtn.addEventListener("click", handleClick);

  const geologicalApi = async (city) => {
    let cityname = city;
    console.log(cityname);
    const path = "geo/1.0/direct";
    const queryParams = `?q=${cityname}&limit=1&appid=${apiKey}`;
    const url = `${endpoint}${path}${queryParams}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        let jsonResponse = await response.json();
        lat = jsonResponse[0].lat;
        lon = jsonResponse[0].lon;
        localStorage.setItem("lat", lat);
        localStorage.setItem("lon", lon);
        mainCard();
        sectionCards();
      }
    } catch (Error) {
      console.log(Error);
    }
  };
});

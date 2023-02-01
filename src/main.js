document.addEventListener("DOMContentLoaded", function () {
  const submitbtn = document.getElementById("submit");

  let title = document.getElementById("main-card-title");
  let temp = document.getElementById("main-card-temp");
  let wind = document.getElementById("main-card-wind");
  let humidity = document.getElementById("main-card-humidity");
  let searchHistoryBtn = document.querySelectorAll(".btn");
  let index = 1;

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

    for (let i = 0; i < section.childElementCount; i++) {
      if (x == undefined) {
        var x = 1;
      } else if (x != undefined) {
        x = x + 9;
      }
      console.log(x);
      let status = jsonResponse.list[x].weather[0].main;

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
      let kelTemp = jsonResponse.list[x].main.temp;
      let f = ((kelTemp - 273) * 9) / 5 + 32;
      f = Math.floor(f);

      let date = new Date(jsonResponse.list[x].dt_txt.slice(0, 10));
      let formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      sectionTitle[i].textContent = `${formattedDate} ${state}`;
      sectionTemp[i].textContent = `Temp: ${f}F°`;
      sectionWind[
        i
      ].textContent = `Wind: ${jsonResponse.list[x].wind.speed} MPH`;
      sectionHumidity[
        i
      ].textContent = `Humidity: ${jsonResponse.list[x].main.humidity}%`;
    }
  };

  sectionCards();

  function handleClick(e) {
    e.preventDefault();
    const city = document.getElementById("city").value;
    geologicalApi(city);
    const clear = document.getElementById("city");
    clear.value = " ";
    removeEventListener("click", handleClick);
  }

  const geologicalApi = async (city) => {
    city = city.toLowerCase().trim();
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
        searchHistory(city);
        mainCard();
        sectionCards();
      }
    } catch (Error) {
      console.log(Error);
    }
  };


  if(!localStorage.getItem(1)) {
    searchHistoryBtn[1].textContent = localStorage.setItem(1, 'atlanta');
    searchHistoryBtn[2].textContent = localStorage.setItem(2, 'miami');
    searchHistoryBtn[3].textContent = localStorage.setItem(3, 'cancun');
    searchHistoryBtn[4].textContent = localStorage.setItem(4, 'anchorage'); 
    searchHistoryBtn[1].textContent = localStorage.getItem(1);
    searchHistoryBtn[2].textContent = localStorage.getItem(2);
    searchHistoryBtn[3].textContent = localStorage.getItem(3);
    searchHistoryBtn[4].textContent = localStorage.getItem(4); 
  } else {
    searchHistoryBtn[1].textContent = localStorage.getItem(1);
    searchHistoryBtn[2].textContent = localStorage.getItem(2);
    searchHistoryBtn[3].textContent = localStorage.getItem(3);
    searchHistoryBtn[4].textContent = localStorage.getItem(4); 
    
  }

  function searchHistory(city) {
    searchHistoryBtn[index].textContent = city;
    localStorage.setItem(index, searchHistoryBtn[index].textContent);
    searchHistoryBtn[index].addEventListener("click", handleSearchEvent);
    if (index >= 4) {
      index = 1;
    } else {
      index++;
    }
  }

  function handleSearchEvent(e) {
    e.preventDefault();
    geologicalApi(e.target.textContent);
    searchHistoryBtn[index].removeEventListener("click", handleSearchEvent);
  }

  submitbtn.addEventListener("click", handleClick);
});

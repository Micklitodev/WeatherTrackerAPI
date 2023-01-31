document.addEventListener("DOMContentLoaded", function () {
  let title = document.getElementById("test");
  let temp = document.getElementById("test2");
  let wind = document.getElementById("test3");
  let humidity = document.getElementById("test4");

  const endpoint = "https://api.openweathermap.org/";
  const apiKey = "6f9ea20be5ffff67f64770cd3b4ad14c";

  const lat = 33.74;
  const lon = -84.38;

  const apiEngine = async () => {
    const path = "data/2.5/forecast";
    const queryParams = `?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const url = `${endpoint}${path}${queryParams}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        let status = jsonResponse.list[0].weather[0].main;

        if (status === "Clouds") {
          var state = "☁️";
        } else if (status === "Sun") {
          var state = "🔆";
        } else if (status === "Rain") {
          var state = "🌧️";
        } else if (status === "partly cloudy") {
          var state = "⛅";
        }

        let kelTemp = jsonResponse.list[0].main.temp;
        let f = ((kelTemp - 273) * 9) / 5 + 32;
        f = Math.floor(f);

        title.textContent = `${jsonResponse.city.name} ${state}`;
        temp.textContent = `Temp: ${f}F°`;
        wind.textContent = `Wind: ${jsonResponse.list[0].wind.speed} MPH`;
        humidity.textContent = ` Humidity: ${jsonResponse.list[0].main.humidity}%`;
      }
    } catch (Error) {
      console.log(Error);
    }
  };

  apiEngine();
});

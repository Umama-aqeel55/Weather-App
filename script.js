const apiKey = "b8dad74bad443934e0c01fe0070b20e1";
      const searchBox = document.querySelector(".search input");
      const searchBtn = document.querySelector(".search button");
      const weatherIcon = document.querySelector(".weather-icon");

      async function checkWeather(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(apiUrl);

        if (response.status == 404) {
          document.querySelector(".error").style.display = "block";
          document.querySelector(".weather").style.display = "none";
        } else {
          var data = await response.json();

          document.querySelector(".city").innerHTML = data.name;
          document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°C";
          document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%";
          document.querySelector(".wind").innerHTML =
            data.wind.speed + " km/h";

          if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "img/clouds.png";
            document.body.style.background = "#B0C4DE";
          } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "img/clear.png";
            document.body.style.background = "#87CEEB";
          } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "img/rain.png";
            document.body.style.background = "#4682B4";
          } else if (data.weather[0].main == "Drizzle" || data.weather[0].main == "Mist") {
            weatherIcon.src = "img/mist.png";
            document.body.style.background = "#D3D3D3";
          }

          document.querySelector(".weather").style.display = "block";
          document.querySelector(".error").style.display = "none";
        }
      }

      searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
      });
// https://api.weatherstack.com/current?access_key=8a787f7bf13035ea62af9f50e4321608&query=nagpur
function fetchData() {
  let inp = document.querySelector(".inp");
  let btn = document.querySelector(".search");
  btn.addEventListener("click", () => {
    if (inp.value === "") {
      alert("Please Enter The City Name");
    }
    fetchingApi(inp.value);
    inp.value = "";
  });

  async function fetchingApi(name) {
    let city = document.querySelector(".show-weather .city-name");

    let sum = "";

    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=7cbaaeb6b69f4cb0bfc73034251905&q=${name}&days=1&aqi=no&alerts=no`
    );
    let data = await response.json();
    console.log(data);

    // Update City Name
    document.querySelector(".city-name").textContent = data.location.name;
    document.querySelector(".temp").textContent = `${data.current.temp_c}°`;

    // Update Time
    const localTime = data.location.localtime.split(" ")[1];

    document.querySelector(".time h4 span").textContent = `${localTime} :${
      localTime <= 12 ? "AM" : "PM"
    }  `;

    // Update UV Index
    document.querySelector(".uv h4").textContent = data.current.uv;

    // Update Rain %
    const rainChance = data.forecast.forecastday[0].day.daily_chance_of_rain;
    document.querySelector(".rain h4").textContent = `${rainChance}%`;

    // humidity
    const humidity = data.current.humidity;
    document.querySelector(".humidity h4").textContent = humidity;
    // Update Sunrise & Sunset
    const sunrise = data.forecast.forecastday[0].astro.sunrise;
    const sunset = data.forecast.forecastday[0].astro.sunset;
    document.querySelector(".sunrise h4").textContent = sunrise;
    document.querySelector(".sunset h4").textContent = sunset;
  }
}

fetchData();

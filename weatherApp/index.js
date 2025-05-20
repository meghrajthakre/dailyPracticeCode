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

//  --primary-color: #505050;
// --background-2-color: #f0f0f0e7;
// --text-color: #bdc4d0;

function dark() {
  let dark = document.querySelector(".dark");
  let rootElement = document.documentElement;
  let flag = 0;
  dark.addEventListener("click", () => {
    if (flag == 0) {
      rootElement.style.setProperty("--primary-color", "white");
      rootElement.style.setProperty("--background-2-color", "black");
      rootElement.style.setProperty("--text-color", "grey");
      flag = 1;
    } else {
      rootElement.style.setProperty("--primary-color", "#505050");
      rootElement.style.setProperty("--background-2-color", "#f0f0f0e7");
      rootElement.style.setProperty("--text-color", "#02060c");
      flag = 0;
    }
  });
}
dark();

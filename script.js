//object to store functions and objects necessary in order to use API
let weatherApp = {
  apiKey: "8caec9afde60911b47b28d119d114340",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { main, icon } = data.weather[0]; //getting those data from wather object array
    const { temp, feels_like, temp_min, temp_max, pressure, humidity } =
      data.main; //getting data
    const { speed } = data.wind;
    console.log(
      name,
      main,
      icon,
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      speed
    );
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".description").innerText = main;
    document.querySelector(".temp").innerText = temp.toFixed() + "º C";
    document.querySelector(".feels").innerText =
      "Feels like: " + feels_like.toFixed() + "º C";
    document.querySelector(".min-temp").innerText =
      "Min temp today is: " + temp_min + "º C";
    document.querySelector(".max-temp").innerText =
      "Max temp today is: " + temp_max + "º C";
    document.querySelector(".pressure").innerText =
      "Pressure: " + pressure + " hPa";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind-speed").innerText =
      "Wind speed is about: " + speed + "km/h";
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector("input").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weatherApp.search();
});

document.querySelector("input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector(".search button").click();
    upperCase((document.querySelector("input").value = ""));
  }
});

function upperCase() {
  document.querySelector("input").addEventListener("input", () => {
    text = document.querySelector("input").value;
    document.querySelector("input").value =
      text.charAt(0).toUpperCase() + text.slice(1);
  });
}
upperCase();

const apiKey = "97857c9ded1954e78f56f02d49e566a9"
var inputEl = document.querySelector("#city-name");
var searchBtnEl = document.querySelector(".search-btn")
var currentWeatherDiv = document.querySelector(".city-weather")
var weatherForecastDiv = document.querySelector(".forecast")
var searchHistory = []

// Display the weather info on pg 
var displayCurrentWeather = function(dataNew, city) {
    currentWeatherDiv.style.borderColor = "black"
    // make city name, date & icon appear
    var cityName = document.createElement("h2")
    cityName.classList.add("city-searched")

    var date = new Date(0)
    // converting epoch time to date
    date.setUTCSeconds(dataNew.current.dt)
    date = date.toLocaleDateString("en-US")

    console.log(city);

    cityName.textContent = city + " (" + date + ")"
    cityName.style.color = "black"

    // create icon element
    var iconImgEl = document.createElement("img")
    iconImgEl.src = `https://openweathermap.org/img/wn/${dataNew.current.weather[0].icon}.png`
    iconImgEl.innerHTML = dataNew.current.weather[0].icon

    // make temp, wind speed, humidity & uvi appear on pg
    var temp = document.createElement("p")
    temp.classList.add("temperature")
    temp.textContent = "Temp: " + Math.round(dataNew.current.temp) + "\u00B0" + "F"
    temp.style.color = "black"
    var windSpeed = document.createElement("p")
    windSpeed.classList.add("wind-speed")
    windSpeed.textContent = "Wind: " + dataNew.current.wind_speed + " MPH"
    windSpeed.style.color = "black"
    var humidity = document.createElement("p")
    humidity.classList.add("humidity")
    humidity.textContent = "Humidity: " + dataNew.current.humidity + "%"
    humidity.style.color = "black"
    var uvi = document.createElement("p")
    uvi.classList.add("uvi")
    uvi.textContent = "UV Index: " + dataNew.current.uvi
    uvi.style.color = "black"

    // add border color to div & append city name, temp, wind speed, humidity & uvi to it
    currentWeatherDiv.appendChild(cityName)
    currentWeatherDiv.appendChild(temp)
    currentWeatherDiv.appendChild(windSpeed)
    currentWeatherDiv.appendChild(humidity)
    currentWeatherDiv.appendChild(uvi)
    currentWeatherDiv.appendChild(iconImgEl)
}

// get city weather info using the collected latitude & longitude data  
var getWeatherInfo = function (data) {
    // use ver 2.5 of OpenWeather instead of ver 3.0 which requires subscription
    var apiUrlTwo = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=minutely,hourly,alerts&appid=" + apiKey

    fetch(apiUrlTwo).then(function (response) {
        if (response.ok) {
            response.json().then(function(dataNew) {
                console.log(dataNew);
                console.log(dataNew.current.temp);
                console.log(dataNew.current.wind_speed);
                console.log(dataNew.current.humidity);
                console.log(dataNew.current.uvi);
                
                // call displayCurrentWeather function
                displayCurrentWeather(dataNew, data[0].name)
            })
        } 
    })
}

// function to get latitude & longitude data based on city name inputted
var getLatAndLong = function (city) {
    var apiUrlOne = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey

    fetch(apiUrlOne).then(function (response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                console.log(data[0].lat);
                console.log(data[0].lon);

                // call getWeatherInfo function
                getWeatherInfo(data)
            })
        } 
    })
}

// collect city name from input
var getCityName = function (event) {
    event.preventDefault()
    // retrieve button element text data
    var city = inputEl.value.trim()
    console.log(inputEl.value);
    // / clear input field
    inputEl.value = ""

    // call getLatAndLong & displayCurrentWeather functions 
    getLatAndLong(city)
}


searchBtnEl.addEventListener("click", getCityName)
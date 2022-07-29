const apiKey = "97857c9ded1954e78f56f02d49e566a9"
var inputEl = document.querySelector("#city-name");
var searchBtnEl = document.querySelector(".search-btn")
var currentWeatherEl = document.querySelector(".city-weather")
var cloudIcon = document.querySelector(".fa-solid")
var searchHistory = []

// Display the weather info on pg 
var displayCurrentWeather = function(dataNew, city) {
    // make city name, date & icon appear
    var cityName = document.createElement("h2")
    cityName.classList = "city-searched"

    var date = new Date().toLocaleDateString

    cityName.textContent = city + " (" + date + ") " + cloudIcon
    cityName.style.color = "black"

    // make temp, wind speed, humidity & uvi appear on pg
    var temp = document.createElement("p")
    temp.classList = "temperature"
    temp.textContent = "Temp: " + Math.round(dataNew.current.temp) + "\u00B0" + "F"
    temp.style.color = "black"
    var windSpeed = document.createElement("p")
    windSpeed.classList = "wind-speed"
    windSpeed.textContent = "Wind: " + dataNew.current.wind_speed + " MPH"
    windSpeed.style.color = "black"
    var humidity = document.createElement("p")
    humidity.classList = "humidity"
    humidity.textContent = "Humidity: " + dataNew.current.humidity + "%"
    humidity.style.color = "black"
    var uvi = document.createElement("p")
    uvi.classList = "uvi"
    uvi.textContent = "UV Index: " + dataNew.current.uvi
    uvi.style.color = "black"

    // append city name, temp, wind speed, humidity & uvi to div
    currentWeatherEl.appendChild(cityName)
    currentWeatherEl.appendChild(temp)
    currentWeatherEl.appendChild(windSpeed)
    currentWeatherEl.appendChild(humidity)
    currentWeatherEl.appendChild(uvi)
}

// get city weather info using the collected latitude & longitude data  
var getWeatherInfo = function (data) {
    // use ver 2.5 of OpenWeather instead of ver 3.0 which requires subscription
    var apiUrlTwo = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=" + apiKey

    fetch(apiUrlTwo).then(function (response) {
        if (response.ok) {
            response.json().then(function(dataNew) {
                console.log(dataNew);
                console.log(dataNew.current.temp);
                console.log(dataNew.current.wind_speed);
                console.log(dataNew.current.humidity);
                console.log(dataNew.current.uvi);

                // call displayCurrentWeather function
                displayCurrentWeather(dataNew)
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

    // call getLatAndLong function 
    getLatAndLong(city)

    displayCurrentWeather(city)

    // clear input field
    inputEl.value = ""
}



searchBtnEl.addEventListener("click", getCityName)
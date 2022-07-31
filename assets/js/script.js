const apiKey = "97857c9ded1954e78f56f02d49e566a9"
var inputEl = document.querySelector("#city-name");
var searchBtnEl = document.querySelector(".search-btn")
var weatherInfoDiv = document.querySelector(".weather-details")
// var currentTitleDiv = document.querySelector(".current-weather-title")
var searchHistory = []

// Display the weather info on pg 
var displayCurrentWeather = function(dataNew, city) {
    // div to hold current weather info
    var currentWeatherDiv = document.createElement("div")
    currentWeatherDiv.classList.add("city-weather")
    weatherInfoDiv.appendChild(currentWeatherDiv)
    // div for current weather header items
    var currentHeaderDiv = document.createElement("div")
    currentHeaderDiv.classList.add("current-header")
    currentWeatherDiv.appendChild(currentHeaderDiv)
    // make city name, date & icon appear
    var cityName = document.createElement("h2")
    cityName.classList.add("city-searched")
    var date = new Date(0)
    // converting epoch time to current date
    date.setUTCSeconds(dataNew.current.dt)
    date = date.toLocaleDateString("en-US")

    cityName.textContent = city + " (" + date + ")"
    cityName.style.color = "black"

    // create icon element
    var iconImgEl = document.createElement("img")
    iconImgEl.src = `https://openweathermap.org/img/wn/${dataNew.current.weather[0].icon}.png`
    iconImgEl.innerHTML = dataNew.current.weather[0].icon
    iconImgEl.classList.add("icon-current")

    // display temp
    var temp = document.createElement("p")
    temp.classList.add("temperature")
    temp.textContent = "Temp: " + Math.round(dataNew.current.temp) + "\u00B0" + "F"
    temp.style.color = "black"
    // display wind speed
    var windSpeed = document.createElement("p")
    windSpeed.classList.add("wind-speed")
    windSpeed.textContent = "Wind: " + dataNew.current.wind_speed + " MPH"
    windSpeed.style.color = "black"
    // display humidity
    var humidity = document.createElement("p")
    humidity.classList.add("humidity")
    humidity.textContent = "Humidity: " + dataNew.current.humidity + "%"
    humidity.style.color = "black"
    // display UVI
    var uvi = document.createElement("div")
    uvi.classList.add("uvi")
    var uviValue = dataNew.current.uvi
    // create span el to hold uvi value
    var spanEl = document.createElement("span")
    spanEl.textContent = uviValue
    uvi.innerText = "UV Index: "
    uvi.style.color = "black"
    uvi.appendChild(spanEl)
    // update bg colors automatically based on uvi value
    if (uviValue < 3) {
        spanEl.style.background = "green"
    } else if (uviValue < 6) {
        spanEl.style.background = "yellow"
    } else if (uviValue < 8) {
        spanEl.style.background = "orange"
    } else if (uviValue < 11) {
        spanEl.style.background = "red"
    } else {
        spanEl.style.background = "purple"
    }

    // append city name, icon, temp, wind speed, humidity, UVI to corresponding divs
    currentWeatherDiv.appendChild(temp)
    currentWeatherDiv.appendChild(windSpeed)
    currentWeatherDiv.appendChild(humidity)
    currentWeatherDiv.appendChild(uvi)
    currentHeaderDiv.appendChild(cityName)
    currentHeaderDiv.appendChild(iconImgEl)
    
    // div to hold forecast info
    var forecastDiv = document.createElement("div")
    forecastDiv.classList.add("forecast")
    weatherInfoDiv.appendChild(forecastDiv)
    // div for forecast section header
    var forecastHeaderDiv = document.createElement("div")
    forecastHeaderDiv.classList.add("forecast-header")
    forecastDiv.appendChild(forecastHeaderDiv)
    // forecast title
    var forecastTitle = document.createElement("h3")
    forecastTitle.classList.add("forecast-title")
    forecastTitle.textContent = "5-Day Forecast:"
    forecastHeaderDiv.appendChild(forecastTitle)
    // div for 5-day forecast items
    var daysContainer = document.createElement("div")
    daysContainer.classList.add("days-container")
    forecastDiv.appendChild(daysContainer)

    for (var i = 1; i < dataNew.daily.length-2; i++) {
        // div to hold day1 info
        var daysDiv = document.createElement("div")
        daysDiv.classList.add("days")
        daysContainer.appendChild(daysDiv)
        // forecast title
        // var textEl = document.createElement("p")
        // textEl.classList.add("textEl")
        // textEl.textContent = "sample text"
        // daysDiv.appendChild(textEl)
        // date
        var dateEl = document.createElement("h4")
        dateEl.classList.add("next-date")
        var nextDate = new Date(1)
        // converting epoch time to current date
        nextDate.setUTCSeconds(dataNew.daily.dt)
        nextDate = nextDate.toLocaleDateString("en-US")
        dateEl.textContent = nextDate
        dateEl.style.color = "black"
        // daysDiv.appendChild(dateEl)
        
        // create icon element
        var forecastIcon = document.createElement("img")
        forecastIcon.src = `https://openweathermap.org/img/wn/${dataNew.daily.weather[1].icon}.png`
        forecastIcon.innerHTML = dataNew.daily.weather[1].icon
        forecastIcon.classList.add("forecast-icon")
        
        // display temp
        var forecastTemp = document.createElement("p")
        forecastTemp.classList.add("forecast-temp")
        forecastTemp.textContent = "Temp: " + Math.round(dataNew.daily.temp) + "\u00B0" + "F"
        forecastTemp.style.color = "black"
        // display wind speed
        var forecastWind = document.createElement("p")
        forecastWind.classList.add("forecast-wind")
        forecastWind.textContent = "Wind: " + dataNew.daily.wind_speed + " MPH"
        forecastWind.style.color = "black"
        // display humidity
        var forecastHumidity = document.createElement("p")
        forecastHumidity.classList.add("forecast-humidity")
        forecastHumidity.textContent = "Humidity: " + dataNew.daily.humidity + "%"
        forecastHumidity.style.color = "black"

        daysDiv.appendChild(forecastTemp)
        daysDiv.appendChild(forecastWind)
        daysDiv.appendChild(forecastHumidity)
        daysDiv.appendChild(forecastIcon)
        daysDiv.appendChild(dateEl)
    }
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
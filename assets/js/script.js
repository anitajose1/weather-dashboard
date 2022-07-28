const apiKey = "97857c9ded1954e78f56f02d49e566a9"
var inputEl = document.querySelector("#city-name");
var searchBtnEl = document.querySelector(".search-btn")
var searchHistory = []

var getWeatherData = function () {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            })
        }
    })
}

var getCityName = function (event) {
    event.preventDefault()
    // retrieve button element text data
    var city = inputEl.value.trim()

    // call getWeatherData function
    getWeatherData(city)

    // clear input field
    inputEl.value = ""
}


getCityName()

searchBtnEl.addEventListener("click", getCityName)
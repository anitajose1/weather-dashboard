const apiKey = "97857c9ded1954e78f56f02d49e566a9"
var inputEl = document.querySelector("#city-name");
var searchBtnEl = document.querySelector(".search-btn")
var searchHistory = []

// get city weather info using the collected latitude & longitude data  
var getWeatherInfo = function (data) {
    var apiUrlTwo =  "https://api.openweathermap.org/data/3.0/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=" + apiKey

    fetch(apiUrlTwo).then(function (response) {
        if (response.ok) {
            response.json().then(function(dataNew) {
                console.log(dataNew);
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

var getCityName = function (event) {
    event.preventDefault()
    // retrieve button element text data
    var city = inputEl.value.trim()

    // call getLatAndLong function 
    getLatAndLong(city)

    // clear input field
    inputEl.value = ""
}



searchBtnEl.addEventListener("click", getCityName)
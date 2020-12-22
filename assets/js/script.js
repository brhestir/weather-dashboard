// script.js

// When the document is ready, perform the following
$(document).ready(function(){

  // DOM VARIABLES

  // JAVASCRIPT VARIABLES
  var apiKey = "b4870574d339978807fdf94ae06ca36a"
  var cityName = "Atlanta";
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
  var cityDataResponse = [];
  // FUNCTION DEFINITIONS
  function init(){

  }

  function renderOneDayForecast(cityDataResponse){
    $("#cityName").text(cityDataResponse.name);
    $("#cityTemp").text("Temperature: " + cityDataResponse.main.temp)
    $("#cityHumidity").text("Humidity: " + cityDataResponse.main.humidity)
    $("#cityWindSpeed").text("Wind Speed: " + cityDataResponse.wind.speed)
    // $("#cityUVIndex").text(cityDataResponse.)
  }

  function renderFiveDayForecast(){

  }
  // FUNCTION CALLS
  // EVENT LISTENERS

  $("#search-submit").on("click", getCityData());


  function getCityData(){
    console.log("getCityData Called");
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      renderOneDayForecast(response);

    });

  };

});

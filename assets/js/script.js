// script.js

// When the document is ready, perform the following
$(document).ready(function(){

  // DOM VARIABLES

  // JAVASCRIPT VARIABLES
  var apiKey = "b4870574d339978807fdf94ae06ca36a"
  var cityName = "Atlanta";
  var cityQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
  var fiveDayQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+ cityName + "&appid=" + apiKey;
  var cityDataResponse = [];
  // FUNCTION DEFINITIONS
  function init(){

  }

  function renderOneDayForecast(cityDataResponse){
    $("#cityName").text(cityDataResponse.name);
    $("#cityTemp").text("Temperature: " + convertKtoF(parseInt(cityDataResponse.main.temp)));
    $("#cityHumidity").text("Humidity: " + cityDataResponse.main.humidity);
    $("#cityWindSpeed").text("Wind Speed: " + cityDataResponse.wind.speed);
    // $("#cityUVIndex").text(cityDataResponse.)
  }

  function renderFiveDayForecast(fiveDayQueryResponse){
    //$("#cityName").text(fiveDayQueryResponse.name);
    var i = 8;
    $("#dateP1").text((fiveDayQueryResponse.list[i].dt_txt).split(" ")[0]);
    $("#tempP1").text("Temperature: " + convertKtoF(parseInt(fiveDayQueryResponse.list[i].main.temp)));
    $("#humidityP1").text("Humidity: " + fiveDayQueryResponse.list[i].main.humidity);
  }

  function convertKtoF(kelvinTemp){
    return (((9/5)*(kelvinTemp-273.15) + 32)).toFixed(2);
  }

  function getCityData(){
    console.log("getCityData Called");
    $.ajax({
      url: cityQueryUrl,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      renderOneDayForecast(response);
      getFiveDayData();

    });
  };

  function getFiveDayData(){
    console.log("getFiveDayData Called");
    $.ajax({
      url: fiveDayQueryUrl,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      renderFiveDayForecast(response);

    });
  }

  // FUNCTION CALLS
  // EVENT LISTENERS

  $("#search-submit").on("click", getCityData());

  


  

});

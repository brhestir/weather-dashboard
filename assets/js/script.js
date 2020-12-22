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
    for(var i=8; i < 40; i+=8){
      var cardEl = $("<div>").addClass("card text-white bg-primary m-3 ");
      cardEl.attr("style", "max-width: 10rem;");
      $("#five-day-div").append(cardEl);

      var dateEl = $("<div>").text((fiveDayQueryResponse.list[i].dt_txt).split(" ")[0]);
      $(dateEl).addClass("card-header");
      $(cardEl).append(dateEl);

      var cardBodyEl = $("<div>").addClass("card-body");
      $(cardEl).append(cardBodyEl);

      // TODO: CHANGE THIS BASED ON WEATHER CONDITION
      var iconEl = $("<div>").addClass("fas fa-sun");

      var tempEl = $("<p>").text("Temperature: " + convertKtoF(parseInt(fiveDayQueryResponse.list[i].main.temp)));
      var humidityEl = $("<p>").text("Humidity: " + fiveDayQueryResponse.list[i].main.humidity);
      
      
      $(cardBodyEl).append(iconEl);
      $(cardBodyEl).append(tempEl);
      $(cardBodyEl).append(humidityEl);
      
    }
    
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

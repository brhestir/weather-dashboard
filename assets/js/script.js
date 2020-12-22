// script.js

// When the document is ready, perform the following
$(document).ready(function(){

  // DOM VARIABLES

  // JAVASCRIPT VARIABLES
  var apiKey = "b4870574d339978807fdf94ae06ca36a"
  var cityHistory = "";

  // FUNCTION DEFINITIONS
  function init(){
    if ((localStorage.getItem("cityHistory") === null) || (localStorage.getItem("cityHistory") == "")){
      localStorage.setItem("cityHistory", "")
    } else {
      var cityHistory = localStorage.getItem("cityHistory");
      getCityData(cityHistory);
    }
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
    
    $("#five-day-div").empty()

    for(var i=0; i < 40; i+=8){
      var cardEl = $("<div>").addClass("card text-white bg-primary m-1 ");
      cardEl.attr("style", "max-width: 10rem;");
      $("#five-day-div").append(cardEl);

      var dateEl = $("<div>").text((fiveDayQueryResponse.list[i].dt_txt).split(" ")[0]);
      $(dateEl).addClass("card-header");
      $(cardEl).append(dateEl);

      var cardBodyEl = $("<div>").addClass("card-body");
      $(cardEl).append(cardBodyEl);

      // TODO: CHANGE THIS BASED ON WEATHER CONDITION
      var iconEl = $("<div>").addClass("fas fa-sun");

      var tempEl = $("<p>").text("Temp: " + convertKtoF(parseInt(fiveDayQueryResponse.list[i].main.temp)));
      var humidityEl = $("<p>").text("Humidity: " + fiveDayQueryResponse.list[i].main.humidity);
      
      $(cardBodyEl).append(iconEl);
      $(cardBodyEl).append(tempEl);
      $(cardBodyEl).append(humidityEl);
      
    }
    
  };

  function convertKtoF(kelvinTemp){
    return (((9/5)*(kelvinTemp-273.15) + 32)).toFixed(2);
  };

  function getCityData(cityName){
    console.log("getCityData Called");

    //var cityName = "Atlanta";
    var cityQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    $.ajax({
      url: cityQueryUrl,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      renderOneDayForecast(response);
      getFiveDayData(cityName);

    });
  };

  function getFiveDayData(cityName){
    console.log("getFiveDayData Called");
    
    var fiveDayQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+ cityName + "&appid=" + apiKey;
    
    $.ajax({
      url: fiveDayQueryUrl,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      renderFiveDayForecast(response);

    });
  };

  function searchNewCity(event){
    event.preventDefault();
    var cityName = $("#city-search-input").val();
    getCityData(cityName);
    cityHistory = cityName;
    localStorage.setItem("cityHistory", cityHistory);
    
    var oldCityBtn = $("<button>");
    oldCityBtn.addClass("list-group-item");
    oldCityBtn.text(cityName);
    //$(oldCityBtn).addEventListener("click", searchHistory());
    $("#history").prepend(oldCityBtn);
  
  };

  function searchHistoryCity(event){
    console.log($(this))
    localStorage.setItem("cityHistory", $(this).text());
    getCityData($(this).text());
  }

  // FUNCTION CALLS
  init();

  // EVENT LISTENERS
  $("#search-submit").on("click", searchNewCity);
  $("#history").on("click", "button", searchHistoryCity);
  
});

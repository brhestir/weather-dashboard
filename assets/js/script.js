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
      var oldCityBtn = $("<button>");
      oldCityBtn.addClass("list-group-item");
      oldCityBtn.text(cityHistory);
      $("#history").prepend(oldCityBtn);
    }
  }

  function renderOneDayForecast(cityDataResponse){
    $("#cityName").text(cityDataResponse.name + " (" + moment().format("L") + ")");
    $("#cityTemp").text("Temperature: " + convertKtoF(parseInt(cityDataResponse.main.temp)) + " °F");
    $("#cityHumidity").text("Humidity: " + cityDataResponse.main.humidity + "%");
    $("#cityWindSpeed").text("Wind Speed: " + cityDataResponse.wind.speed + " MPH");
    var latitude = cityDataResponse.coord.lat;
    var longitude = cityDataResponse.coord.lon;
    var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
    $.ajax({
      url: uvQueryURL,
      method: "GET"
    }).then(function(responseUV){
      $("#cityUVIndex").text("UV Index: " + responseUV.value);
      if(responseUV.value <= 3){
        
        $("#cityUVIndex").attr("style", "background-color: rgb(114, 217, 136)");
      }
      else if ((responseUV.value > 3) || (responseUV.value < 7)) {
        
        $("#cityUVIndex").attr("style", "background-color: yellow");
      }
      else {
        
        $("#cityUVIndex").attr("style", "background-color: red");
      }
    })
    
  }

  function renderFiveDayForecast(fiveDayQueryResponse){
    //$("#cityName").text(fiveDayQueryResponse.name);
    
    $("#five-day-div").empty()

    for(var i=0; i < 40; i+=8){
      var cardEl = $("<div>").addClass("card text-white bg-primary m-1 ");
      cardEl.attr("style", "max-width: 11rem;");
      $("#five-day-div").append(cardEl);

      var dateEl = $("<div>").text((fiveDayQueryResponse.list[i].dt_txt).split(" ")[0]);
      $(dateEl).addClass("card-header");
      $(cardEl).append(dateEl);

      var cardBodyEl = $("<div>").addClass("card-body");
      $(cardEl).append(cardBodyEl);

      // TODO: CHANGE THIS BASED ON WEATHER CONDITION
      var iconEl = $("<div>").addClass("fas fa-sun");

      var tempEl = $("<p>").text("Temp: " + convertKtoF(parseInt(fiveDayQueryResponse.list[i].main.temp)) + " °F");
      var humidityEl = $("<p>").text("Humidity: " + fiveDayQueryResponse.list[i].main.humidity + "%");
      
      $(cardBodyEl).append(iconEl);
      $(cardBodyEl).append(tempEl);
      $(cardBodyEl).append(humidityEl);
      
    }
    
  };

  function convertKtoF(kelvinTemp){
    return (((9/5)*(kelvinTemp-273.15) + 32)).toFixed(2);
  };

  function getCityData(cityName){
    

    //var cityName = "Atlanta";
    var cityQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    $.ajax({
      url: cityQueryUrl,
      method: "GET"
    }).then(function(response) {
      

      renderOneDayForecast(response);
      getFiveDayData(cityName);

    });
  };

  function getFiveDayData(cityName){
    
    
    var fiveDayQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+ cityName + "&appid=" + apiKey;
    
    $.ajax({
      url: fiveDayQueryUrl,
      method: "GET"
    }).then(function(response) {
      

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
    $("#history").prepend(oldCityBtn);
  
  };

  function searchHistoryCity(event){
    
    localStorage.setItem("cityHistory", $(this).text());
    getCityData($(this).text());
  }

  // FUNCTION CALLS
  init();

  // EVENT LISTENERS
  $("#search-submit").on("click", searchNewCity);
  $("#history").on("click", "button", searchHistoryCity);
  
});

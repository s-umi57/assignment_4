let wd;

    function render(response){
      var currentLocation = response.name;
      var currentWeather = response.weather[0].description;
      var currentTemp = response.main.temp;
      var high = response.main.temp_max;
      var low = response.main.temp_min;
      var feelsLike = response.main.feels_like;
      var precip = response.rain ? response.rain["1h"] + " mm" : "0 mm";
      var humidity = response.main.humidity + " %";
      var windSpeed = response.wind.speed + " m/s";
      var windDir = response.wind.deg + "°";
      var timestamp = response.dt;
      
      $("#temperature").html(currentTemp.toFixed(0) + "&deg;C");
      $("#high").html("High: " + high.toFixed(0) + " &deg;C");
      $("#low").html("Low: " + low.toFixed(0) + " &deg;C");
      $("#local").html(currentLocation);
      $("#feels-like").html("Feels like " + feelsLike.toFixed(0) + "°C");
      $("#precipitation").html("Rainfall: " + precip);
      $("#humidity").html("Humidity: " + humidity);
      $("#wind-speed").html("Wind: " + windSpeed + " " + windDir);
      $("#weather-description").html(currentWeather);

      // Local date and time
      var localDate = new Date(timestamp * 1000);
      var options = {weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
      var localTimeString = localDate.toLocaleString("en-US", options);
      $("#local-time").html(localTimeString);

      // Change the Background
        const currentHour = new Date().getHours();
        if (currentHour >= 20 || currentHour < 6) {
          $("body").css("background-image", "url('images/nightview-resize.jpg')",
          "background-size", "cover",
          "background-position", "center"); 
        } else if (currentHour >=6 && currentHour < 17) {
          $("body").css("background-image", "url('images/clearsky-resize.jpg')",
          "background-size", "cover",
          "background-position", "center"); 
        } else {
          $("body").css("background-image", "url('images/sunset-resize.jpg')",
          "background-size", "cover",
          "background-position", "center"); // for daytime before 7pm
        }

      // Weather icon
      var weatherIcon = document.getElementById("icon");

      if (response.weather[0].main == "Clear" && isNightTime(response)) {
        weatherIcon.src = "images/moon.png";
      }
      else if (response.weather[0].main == "Clear") {
            weatherIcon.src = "images/sunny.png";
      }
      else if (response.weather[0].main == "Clouds") {
        weatherIcon.src = "images/cloudy.png";
      }
      else if (response.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      }
      else if (response.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      }
      else if (response.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png";
      }
      else if (response.weather[0].main == "Thunderstorm") {
        weatherIcon.src = "images/thunderstorm.png";
      }
      else if (response.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      }
      
    }

    $(function(){
      var loc;
      $.getJSON('https://ipinfo.io', function(ipAddress){
       console.log(ipAddress)
       loc = ipAddress.loc.split(","); // split longitude and latitude
       console.log(loc);
    
        //  https://fcc-weather-api.glitch.me
        $.getJSON(
          'https://fcc-weather-api.glitch.me/api/current?units=imperial&lat=' + loc[0] + '&lon=' + loc[1],function (response){
            wd = response;
            console.log(response)
            // https://openweathermap.org/weather-conditions
            // https://openweathermap.org/img/wn/10d@2x.png
            // var iconTemp = "https://openweathermap.org/img/wn/" + response.weather[1].icon + "@2x.png";
            // $('#icon').prepend('<img src=' + iconTemp + ' >')  
            render(response);
        })
      });
    })
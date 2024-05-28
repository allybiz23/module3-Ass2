const apiKey = 'YOURAPIKEY'; // Replace with your actual OpenWeatherMap API key

function fetchWeatherByCity() {
    const city = $('#city').val();
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            displayWeather(response);
        },
        error: function () {
            $('#weather').html('An error occurred while fetching weather data.');
        }
    });
}

function fetchWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

            $.ajax({
                url: apiUrl,
                method: 'GET',
                dataType: 'json',
                success: function (response) {
                    displayWeather(response);
                },
                error: function () {
                    $('#weather').html('An error occurred while fetching weather data.');
                }
            });
        });
    } else {
        $('#weather').html('Geolocation is not supported by this browser.');
    }
}

function displayWeather(data) {
    const weatherInfo = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °F</p>
        <p>Min Temperature: ${data.main.temp_min} °F</p>
        <p>Max Temperature: ${data.main.temp_max} °F</p>
        <p>Pressure: ${data.main.pressure} hPa</p>
    `;
    $('#weather').html(weatherInfo);
}

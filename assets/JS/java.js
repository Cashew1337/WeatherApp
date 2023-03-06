var apiKey = '81b611a44f10edec7e52dccbf27cc9d6';
var searchBtn = $('#button-addon2');
var resultContentEl = $('#resultContent')


$(function WeatherChecker() {

    searchBtn.click(function (e) {
        e.preventDefault;
        // resultContentEl

        var city = $('input[type=search]').val();
        var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;

        fetch(geoUrl).then(function (response) {
            return response.json();
        })
            .then(function (data) {
                if (!data.length) {
                    alert('no results found');
                } else {
                    for (let i = 0; i < data.length; i++) {
                        console.log(data[i]);
                        var lat = data[i].lat;
                        var latRound = Math.round(lat * 100) / 100;
                        console.log(lat);
                        console.log(latRound);
                        var lon = data[i].lon;
                        var lonRound = Math.round(lon * 100) / 100;
                        console.log(lonRound);
                        var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latRound + '&lon=' + lonRound + '&units=imperial&appid=' + apiKey;
                        console.log(apiUrl);

                        fetch(apiUrl).then(function (weather) {
                            return weather.json()
                        })
                            .then(function (forecast) {
                                console.log(forecast)
                                printResults(forecast)
                            });
                    }
                }
            })
    });

    function printResults(resultObject) {
        var currentDate = dayjs().format('MMM/D/YYYY')
        console.log(currentDate)

        var displayCard = document.createElement('div');
        displayCard.classList.add('card', 'mb-3', 'p-3');

        var displayBody = document.createElement('div');
        displayBody.classList.add('card-body');
        displayCard.append(displayBody);

        var oneDayHeaderEl = document.createElement('h2');
        var weatherIcon = document.createElement('img');
        weatherIcon.src = 'https://openweathermap.org/img/wn/' + resultObject.weather[0].icon + '@2x.png'
        $('img').attr('alt', 'weather icon')
        oneDayHeaderEl.textContent = resultObject.name
        oneDayHeaderEl.textContent += ' (' + currentDate + ') ';
        oneDayHeaderEl.append(weatherIcon);
        displayBody.append(oneDayHeaderEl);

        var weatherData = document.createElement('p');
        weatherData.innerHTML = 'Temp: ' + resultObject.main.temp + ' \u00b0F' + '</br>';
        weatherData.innerHTML += 'Wind: ' + resultObject.wind.speed + ' MPH' + '</br>';
        weatherData.innerHTML += 'Humidity: ' + resultObject.main.humidity + ' %'
        displayBody.append(weatherData);

        resultContentEl.append(displayCard)
    }

});
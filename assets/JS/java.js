var apiKey = '81b611a44f10edec7e52dccbf27cc9d6';
var searchBtn = $('#button-addon2');


$(function WeatherChecker() {

    searchBtn.click(function (e) {
        e.preventDefault;

        var city = $('input[type=search]').val();
        var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;

        fetch(geoUrl).then(function (response) {
            return response.json()
        })
            .then(function (data) {
                if (!data.length) {
                    alert('no results found')
                } else {
                    for (let i = 0; i < data.length; i++) {
                        console.log(data[i])
                        var lat = data[i].lat
                        var latRound = Math.round(lat * 100) / 100
                        console.log(lat)
                        console.log(latRound)
                        var lon = data[i].lon
                        var lonRound = Math.round(lon * 100) / 100
                        console.log(lonRound)
                        var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latRound + '&lon=' + lonRound + '&appid=' + apiKey;
                        console.log(apiUrl)

                        fetch(apiUrl).then(function (weather) {
                            return weather.json()
                        })
                            .then(function (forecast) {
                                console.log(forecast)
                                // printResults(forecast)
                            })
                    }
                }
            })
    });

});
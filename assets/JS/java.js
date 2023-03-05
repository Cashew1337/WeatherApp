var apiKey = '81b611a44f10edec7e52dccbf27cc9d6';
var city = $('input').val();
var searchBtn = $('#button-addon2');


$(function WeatherChecker () {

searchBtn.click(function (e) {
    e.preventDefault;
    var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;

console.log(geoUrl)
console.log(city)
});

});
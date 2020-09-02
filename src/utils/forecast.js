const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ea791a3ebd812c4951791ee2037ffc4c&units=metric&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services', undefined);
    } else if (body.message) {
      callback('Unable to get location', undefined);
    } else {
      callback(
        undefined,
        `Temp is ${body.main.temp} degree ,${body.weather[0].description} .
      MIN TEMP : ${body.main.temp_min} MAX TEMP : ${body.main.temp_max}`
      );
    }
  });
};

module.exports = forecast;

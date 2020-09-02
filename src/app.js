const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
//Define path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ujjwal'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Ujjwal'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    description: 'Nothing to help sorry',
    name: 'Ujjwal'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });
    else {
      forecast(latitude, longitude, (error, result) => {
        if (error) return res.send({ error });
        res.send({
          forecast: result,
          location: location,
          address: req.query.address
        });
      });
    }
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', { error: 'Article not found' });
});

app.get('*', (req, res) => {
  res.render('404', { title: '404', error: 'Page not found', name: 'ujjwal' });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});


const express = require('express');
const routes = require('./routes')
var cors = require('cors')
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000;
//{ credentials: false, origin: ['http://localhost:3000'] }
app.use(cors());

app.get('/avgtemp', routes.getCountryAvgTemp);
app.get('/avgprec', routes.getCountryPrec);
app.get('/tempchangeincome', routes.getTempChangeAndIncome);
app.get('/regioncarbon', routes.getCountryCarbonEmissionByRegion);
app.get('/incomecarbon', routes.getCountryCarbonEmissionByIncome);
app.get('/highincomecarbon', routes.getCountryCarbonEmissionInHighIncome);
app.get('/lowincomecarbon', routes.getCountryCarbonEmissionInLowIncome);
app.get('/tempprec', routes.getCountryTempAndPrec);
app.get('/tempcarbon', routes.getTempAndCarbonEmission);
app.get('/avgtempchange', routes.getCountryAvgTempChange);
app.get('/countryincome', routes.getCountryIncomeZones);
app.get('/countrycarbon', routes.getCountryCarbonEmissions);
app.get('/flooddrought', routes.getFloodDrought);
app.get('/certifiedreductions', routes.getCertifiedReductions);
app.get('/avgtemps', routes.getAvgTemps);


app.get('/', (req, res) => {
    res.json("hello")
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

module.exports = app;
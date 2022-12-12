
const express = require('express');
const routes = require('./routes')
var cors = require('cors')
const app = express();
const port = 8000;

app.use(cors({ credentials: false, origin: ['http://localhost:3000'] }));

app.get('/avgtemp', routes.getCountryAvgTemp);
app.get('/avgprec', routes.getCountryPrec);
app.get('/tempchangeincome', routes.getTempChangeAndIncome);
app.get('/regioncarbon', routes.getCountryCarbonEmissionByRegion);
app.get('/incomecarbon', routes.getCountryCarbonEmissionByIncome);
app.get('/highincomecarbon', routes.getCountryCarbonEmissionInHighIncome);
app.get('/tempprec', routes.getCountryTempAndPrec);
app.get('/tempcarbon', routes.getTempAndCarbonEmission);
app.get('/avgtempchange', routes.getCountryAvgTempChange);
app.get('/', (req, res) => {
    console.log(req.url)
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

module.exports = app;
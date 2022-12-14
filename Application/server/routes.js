
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host:  'database-1.cubxcb6baefx.us-east-1.rds.amazonaws.com',
    user: 'projectAdmin',
    password: '5500FinalProject!',
    port: '3306',
    database: 'PROJECT_DB'
});

connection.connect();

// Annual temperature and country name of countries with the highest annual temperature
async function getCountryAvgTemp(req, res) {
  const params = req.query;
  const { limit = 10 } = params;
  try {
    const sql = `SELECT c.CNAME AS country_name, t.Annual AS temperature
    FROM WB_CountryCode c
    INNER JOIN WB_CountryTemp t ON c.CCode = t.CCode
    ORDER BY t.Annual DESC LIMIT ${Number(limit)};`;

    connection.query(sql,  (error, results)  => {
        results && res.json({ results})
        error && res.json({error})
    });
  } catch (error) {
    console.log(error)
    res.json({ error: error })
  }
}


// Countries with the most precipitation
async function getCountryPrec(req, res) {
  try {
    const sql = `SELECT CName AS region, AVG(WB_CountryPrec.Annual) AS average_precipitation
    FROM WB_CountryCode
        INNER JOIN WB_CountryPrec ON WB_CountryCode.CCode = WB_CountryPrec.CCode
        GROUP BY WB_CountryPrec.CCode
        ORDER BY AVG(WB_CountryPrec.Annual) DESC;`;

    connection.query(sql, (error, results) => {
        results && res.json({ results})
        error && res.json({error})
    })
  } catch (error) {
    console.log(error)
    res.json({ error: error })
  }
}


// Change in carbon emission (per capita) from 1990 to 2008 in low income, lower middle income, upper middle income income, and high-income countries
async function getCountryCarbonEmissionByIncome(req, res) {
  const { startYear = 1990, endYear = 2008 } = req.query;
  const startYearInt = Number(startYear);
  const endYearInt = Number(endYear);
  try {
    const sql = `SELECT c.Group_name AS income_category, AVG(e.e${startYearInt}-e.e${endYearInt}) AS avg_change_in_emissions
    FROM WB_CountryCode c INNER JOIN WB_Emissions e ON c.CCode = e.CCode
    WHERE c.Group_name LIKE 'Upper middle income' OR c.Group_name LIKE 'High income: OECD'
        OR c.Group_name LIKE 'High income: nonOECD' OR c.Group_name LIKE 'Low income'
        OR c.Group_name LIKE 'Lower middle income'
    GROUP BY c.Group_name
    ORDER BY avg_change_in_emissions DESC;`;

    connection.query(sql, (error, results) => {
        results && res.json({ results})
        error && res.json({error})
    });
  } catch (error) {
    console.log(error)
    res.json({ error: error })
  }
}


// Increase in carbon emission (per capita) from 1990 to 2008, ranked by world regions
async function getCountryCarbonEmissionByRegion(req, res) {
  const { startYear = 1990, endYear = 2008 } = req.query;
  const startYearInt = Number(startYear);
  const endYearInt = Number(endYear);
  try {
    const sql = `SELECT c.CName AS region, AVG(e.e${startYearInt}-e.e${endYearInt}) AS avg_change_in_emissions
    FROM WB_CountryCode c INNER JOIN WB_Emissions e ON c.CCode = e.CCode
    WHERE c.Region LIKE 'Aggregates' AND c.CName NOT LIKE 'Upper middle income' AND c.CName NOT LIKE 'Low & middle income'
        AND c.CName NOT LIKE 'High income' AND c.CName NOT LIKE 'Lower middle income'
        AND c.CName NOT LIKE 'Low income' AND c.CName NOT LIKE 'Middle income'
    GROUP BY c.CName
    ORDER BY avg_change_in_emissions DESC;`

    connection.query(sql, (error, results) => {
        results && res.json({ results})
        error && res.json({error})
    });
  } catch (error) {
    console.log(error)
    res.json({ error: error })
  }
}


// Average temperature change based on income level
async function getTempChangeAndIncome(req, res) {
  const { startYear = 1990, endYear = 2008 } = req.query;
  const startYearInt = Number(startYear);
  const endYearInt = Number(endYear);
  try {
    const sql = `WITH temp_1900 AS (SELECT AVG(AveTemp) AS temperature, t.Country AS country_name
        FROM TempCountry t
        INNER JOIN WB_CountryCode c ON t.Country = c.CName
        WHERE t.Year = ${startYearInt}
        GROUP BY t.Country),
    temp_2008 AS(SELECT t.Country AS country_name, AVG(AveTemp) AS temperature
        FROM TempCountry t
        INNER JOIN WB_CountryCode c ON t.Country = c.CName
        WHERE t.Year = ${endYearInt}
        GROUP BY t.Country)
    SELECT Group_name as income_category, (temp_2008.temperature - temp_1900.temperature) AS temperature_change
    FROM temp_1900 INNER JOIN temp_2008 ON temp_2008.country_name = temp_1900.country_name
    INNER JOIN WB_CountryCode c ON c.CName = temp_1900.country_name
    WHERE c.Group_name NOT LIKE 'Aggregates'
    GROUP BY c.Group_name;`;

    connection.query(sql, (error, results) => {
        results && res.json({ results})
        error && res.json({error})
    });
  } catch (error) {
    console.log(error)
    res.json({ error: error })
  }
}


// Carbon emission trends of high-income countries
async function getCountryCarbonEmissionInHighIncome(req, res) {
  const { startYear = 1990, endYear = 2008 } = req.query;
  const startYearInt = Number(startYear);
  const endYearInt = Number(endYear);
  try {
    let i = startYearInt;
    let sumSql = '';
    while(i <= endYearInt) {
      sumSql += ` e${i},`;
      i++;
    }
    sumSql = sumSql.slice(0 , -1);
    const sql = `SELECT c.CName AS Country_name,${sumSql} FROM WB_CountryCode c INNER JOIN WB_Emissions e ON c.CCode = e.CCode
    WHERE c.Group_name = 'High income: OECD' or c.Group_name = 'High income: nonOECD';`;

    connection.query(sql, (error, results) => {
        results && res.json({ results})
        error && res.json({error})
    });
  } catch (error) {
    console.log(error)
    res.json({ error: error })
  }
}



// Carbon emission trends of high-income countries
async function getCountryCarbonEmissionInLowIncome(req, res) {
  const { startYear = 1990, endYear = 2008 } = req.query;
  const startYearInt = Number(startYear);
  const endYearInt = Number(endYear);
  try {
    let i = startYearInt;
    let sumSql = '';
    while(i <= endYearInt) {
      sumSql += ` e${i},`;
      i++;
    }
    sumSql = sumSql.slice(0 , -1);
    const sql = `SELECT c.CName AS Country_name,${sumSql} FROM WB_CountryCode c INNER JOIN WB_Emissions e ON c.CCode = e.CCode
    WHERE c.Group_name = 'Low income';`;

    connection.query(sql, (error, results) => {
        results && res.json({ results})
        error && res.json({error})
    });
  } catch (error) {
    console.log(error)
    res.json({ error: error })
  }
}



// Climate change leads to more severe droughts when temperatrue are higher in months of low precipitation. Find countries with highest temperature among the top 20 countries with the least annual precipitation

async function getCountryTempAndPrec(req, res) {
  const params = req.query;
  const { limit = 20 } = params;
  try {
    const sql = `WITH lowest_precipitation_countries AS (SELECT CCode, AVG(Annual) AS precipitation
        FROM WB_CountryPrec p
        GROUP BY p.CCode
        ORDER BY AVG(Annual)
        LIMIT ${Number(limit)})
    SELECT c.CName AS country_name, t.Annual AS annual_temperature, h.precipitation
    FROM WB_CountryCode c
    INNER JOIN WB_CountryTemp t on c.CCode = t.CCode
    INNER JOIN lowest_precipitation_countries h ON c.CCode = h.CCode
    ORDER BY annual_temperature DESC;`;
    connection.query(sql, (error, results) => {
        results && res.json({ results})
        error && res.json({error})
    });
  } catch (error) {
    console.log(error)
    res.json({ error: error })
  }
}


// Countries that do not contribute significantly to carbon emissions but are paying the price of climate change
// In other words, rank countries with the largest change in temperature, whose carbon emission is not in the top 100 countries

async function getTempAndCarbonEmission(req, res) {
  try {
    const sql1 = `WITH temp_1900 AS (SELECT AVG(AveTemp) AS temperature, t.Country AS country_name
        FROM TempCountry t
        INNER JOIN WB_CountryCode c ON t.Country = c.CName
        WHERE t.Year = 1900
        GROUP BY t.Country),
    temp_2008 AS(SELECT t.Country AS country_name, AVG(AveTemp) AS temperature
        FROM TempCountry t
        INNER JOIN WB_CountryCode c ON t.Country = c.CName
        WHERE t.Year = 2008
        GROUP BY t.Country),
    top_emission_countries AS (SELECT c.CName AS country_name, (e.e1990+e.e1991+e.e1992+e.e1993+e.e1994+e.e1995+e.e1996+e.e1997+e.e1998+e.e1999+e.e2000
          +e.e2001+e.e2002+e.e2003+e.e2004+e.e2005+e.e2006+e.e2007+e.e2008)/19 AS average_emissions
              FROM WB_CountryCode c INNER JOIN WB_Emissions e on c.CCode = e.CCode
              WHERE c.Region NOT LIKE 'Aggregates'
              ORDER BY (e.e1990+e.e1991+e.e1992+e.e1993+e.e1994+e.e1995+e.e1996+e.e1997+e.e1998+e.e1999+e.e2000
          +e.e2001+e.e2002+e.e2003+e.e2004+e.e2005+e.e2006+e.e2007+e.e2008)/19 DESC
              LIMIT 100)
    SELECT t1900.country_name, (t2008.temperature-t1900.temperature) AS temp_change
    FROM temp_1900 t1900 INNER JOIN temp_2008 t2008 on t1900.country_name = t2008.country_name
    WHERE t1900.country_name NOT IN (SELECT country_name FROM top_emission_countries)
    ORDER BY (t2008.temperature-t1900.temperature) DESC;`;

    // The difference between global average emissions and the emissions of countries with the largest change in temperature
    const sql2 = `WITH global_average_emission AS (SELECT c.CName AS country_name, (e.e1990+e.e1991+e.e1992+e.e1993+e.e1994+e.e1995+e.e1996+e.e1997+e.e1998+e.e1999+e.e2000
          +e.e2001+e.e2002+e.e2003+e.e2004+e.e2005+e.e2006+e.e2007+e.e2008)/19 AS average_emissions
              FROM WB_CountryCode c INNER JOIN WB_Emissions e on c.CCode = e.CCode
              WHERE c.Region NOT LIKE 'Aggregates' AND c.CName NOT LIKE 'Country name'),
    temp_1900 AS (SELECT AVG(AveTemp) AS temperature, t.Country AS country_name
      FROM TempCountry t
      INNER JOIN WB_CountryCode c ON t.Country = c.CName
      WHERE t.Year = 1900
      GROUP BY t.Country),
    temp_2008 AS(SELECT t.Country AS country_name, AVG(AveTemp) AS temperature
      FROM TempCountry t
      INNER JOIN WB_CountryCode c ON t.Country = c.CName
      WHERE t.Year = 2008
      GROUP BY t.Country)
    SELECT g.country_name, average_emissions - AVG(average_emissions) AS emissions_in_comparison, (t2008.temperature-t1900.temperature) AS temp_change
    FROM global_average_emission g
    INNER JOIN temp_1900 t1900 ON t1900.country_name = g.country_name
    INNER JOIN temp_2008 t2008 ON t2008.country_name = g.country_name
    GROUP BY g.country_name
    ORDER BY (t2008.temperature-t1900.temperature) DESC;`
    let results1;
    connection.query(sql1, (error, results) => {
        //console.log(error)
        results && (results1 = results)
        error && res.json({error})
        connection.query(sql2, (error, results) => {
            if(results) res.json({ results})
                
            error && res.json({error})
        });
    });

    //console.log(results1)
  } catch (error) {
    console.log(error)
    res.json({ error: error })
  }
}


//From 1900 to 2008, the top countries that are most affected by climate change (in terms of changes in temperature) ordered by change in temperature
async function getCountryAvgTempChange(req, res) {
  let { startYear, endYear} = req.query;
  !startYear &&  (startYear = 1991)
  !endYear &&  (endYear = 2008);
  try {
    const sql = `WITH temp_1900 AS (SELECT AVG(AveTemp) AS temperature, t.Country AS country_name
        FROM TempCountry t
        INNER JOIN WB_CountryCode c ON t.Country = c.CName
        WHERE t.Year = ${startYear}
        GROUP BY t.Country),
    temp_2008 AS(SELECT t.Country AS country_name, AVG(AveTemp) AS temperature
        FROM TempCountry t
        INNER JOIN WB_CountryCode c ON t.Country = c.CName
        WHERE t.Year = ${endYear}
        GROUP BY t.Country)
    SELECT temp_1900.country_name, (temp_2008.temperature - temp_1900.temperature) AS Diff
    FROM temp_1900
    INNER JOIN temp_2008 ON temp_1900.country_name = temp_2008.country_name
    ORDER BY Diff DESC;`
    connection.query(sql, (error, results) => {
        console.log(error)
        results && res.json({ results })
        error && (res.json({ error }))

    });
  } catch (error) {
    console.log(error)
    res.json({ error: error })
  }
}


// Countries with flood drought
async function getFloodDrought(req, res) {
  try {
    const sql = `WITH c_list AS (SELECT CCode, CName, SCode, Value AS droughts_floods_2009
      FROM WB_Res r
      WHERE SCode LIKE "EN.CLC.MDAT.ZS"),
      temp_1900 AS (SELECT Country, AVG(AveTemp) AS avg_1900 FROM TempCountry WHERE Year = 1990 GROUP BY Country),
      temp_2008 AS (SELECT Country, AVG(AveTemp) AS avg_2008 FROM TempCountry WHERE Year = 2008 GROUP BY Country)
      SELECT c.CName, c.CCode, (t2.avg_2008-t1.avg_1900)/t1.avg_1900 AS percent_temp_change, l.droughts_floods_2009
      FROM WB_CountryCode c INNER JOIN temp_1900 t1 ON c.CName = t1.Country
                            INNER JOIN temp_2008 t2 ON c.CName = t1.Country
                            INNER JOIN c_list l ON c.CCode = l.CCode
      GROUP BY c.CCode
      ORDER BY droughts_floods_2009 DESC;`;

    connection.query(sql, (error, results) => {
        results && res.json({ results})
        error && res.json({error})
    })
  } catch (error) {
    console.log(error)
    res.json({ error: error })
  }
}

async function getCertifiedReductions(req, res) {
  try {
    const sql = `WITH c_list AS (SELECT CName, CCode, SCode, Value AS certified_reduction
      FROM WB_Res r
      WHERE SCode = "EN.CLC.ICER" AND Year = 2011)
      SELECT c.CName, c.certified_reduction, (e2008-e2000) AS diff_in_emissions
      FROM c_list c INNER JOIN WB_Emissions e ON c.CCode = e.CCode
      GROUP BY c.CCode
      ORDER BY c.certified_reduction DESC;`;

    connection.query(sql, (error, results) => {
        results && res.json({ results})
        error && res.json({error})
    })
  } catch (error) {
    console.log(error)
    res.json({ error: error })
  }
}


module.exports = {
    getCountryAvgTemp,
    getCountryPrec,
    getCountryCarbonEmissionByIncome,
    getCountryCarbonEmissionByRegion,
    getTempChangeAndIncome,
    getCountryCarbonEmissionInHighIncome,
    getCountryTempAndPrec,
    getTempAndCarbonEmission,
    getCountryAvgTempChange,
    getCountryCarbonEmissionInLowIncome,
    getFloodDrought,
    getCertifiedReductions
}



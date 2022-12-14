import React, { useState, useEffect } from 'react'
import {getCountryCarbonEmissionInHighIncome, getCountryCarbonEmissionInLowIncome} from '../../../apiOperations'
import '../IncomeBrackets.css';
import { Line, LineChart, XAxis, YAxis, Label, Tooltip } from "recharts";

const TimeSeriesByIncome = props => {
    const [highIncome, setHighIncome] = useState([]);
    const [lowIncome, setLowIncome] = useState([]);
    

    useEffect(() => {
        
        const setHighIncomeInitial = async () => {
            const highIncome = await getCountryCarbonEmissionInHighIncome();
            setHighIncome(highIncome);
        }
        setHighIncomeInitial().catch(console.error);

        const setLowIncomeInitial = async () => {
            const lowIncome = await getCountryCarbonEmissionInLowIncome();
            setLowIncome(lowIncome);
        }
        setLowIncomeInitial().catch(console.error);

    }, [])

    console.log("Printing low income read", lowIncome);
    var highIncomeArray = {};
    var lowIncomeArray = {};
    
    if (highIncome.length>0) {
        for (let i=0;i<20; i++){
            let average = 0;
            highIncome.forEach(e => {
                let key = Object.keys(e)[i];
                let value = Object.values(e)[i];
                // console.log("Key is", key);
                if (key !== "Country_name"){
                    average += value;
                    highIncomeArray[key] = average/164;
                }
            })
        }
    }
    
    console.log("printing substring", parseInt(String(Object.keys(highIncomeArray)[0]).substring(1)));
    var keys = ['year', 'high_income_carbon_emissions']
    var highIncomeDict = [];
    for (let j=0; j<19; j++){
        var values = [parseInt(String(Object.keys(highIncomeArray)[j]).substring(1)), Object.values(highIncomeArray)[j]];
        var result = {};
        keys.forEach((key, i) => result[key] = values[i]);
        // console.log(result);
        highIncomeDict.push(result);
    }

    console.log(highIncomeDict);

    //// low income stuff
    if (lowIncome.length>0) {
        for (let i=0;i<20; i++){
            let average = 0;
            lowIncome.forEach(e => {
                let key = Object.keys(e)[i];
                let value = Object.values(e)[i];
                // console.log("Key is", key);
                if (key !== "Country_name"){
                    average += value;
                    lowIncomeArray[key] = average/101;
                }
            })
        }
    }
    
    console.log("printing substring", parseInt(String(Object.keys(lowIncomeArray)[0]).substring(1)));
    var keys = ['year', 'low_income_carbon_emissions']
    var lowIncomeDict = [];
    for (let j=0; j<19; j++){
        var values = [parseInt(String(Object.keys(lowIncomeArray)[j]).substring(1)), Object.values(lowIncomeArray)[j]];
        var result = {};
        keys.forEach((key, i) => result[key] = values[i]);
        // console.log(result);
        lowIncomeDict.push(result);
    }

    console.log(lowIncomeDict);

    let merged = [];

    for(let i=0; i<highIncomeDict.length; i++) {
     merged.push({
        ...highIncomeDict[i], 
        ...(lowIncomeDict.find((itmInner) => itmInner.year === lowIncomeDict[i].year))}
        );
    }

    console.log(merged);
    
    return (
        <>
        <div className = "left" style={{
            display: 'block', width: 700, padding: 30
        }}>
        <h4 className ="charttitleIncome">Carbon emission time series by income bracket </h4>
   <LineChart
      width={600}
      height={400}
      data={merged}
      margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
    >
      <XAxis type="string" dataKey="year">
        <Label
          value={"Year"}
          position="bottom"
          style={{ textAnchor: "middle" }}
        />
      </XAxis>
      <YAxis>
        <Label
          value={"Carbon Emissions"}
          position="left"
          angle={-90}
          style={{ textAnchor: "middle" }}
        />
      </YAxis>
      <Line dataKey="high_income_carbon_emissions" stroke="green"/>
      <Line dataKey="low_income_carbon_emissions" />
    </LineChart>
    </div>
        </>
    )
}




export default TimeSeriesByIncome
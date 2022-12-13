import React, { useState, useEffect } from 'react'
import { getTempChangeAndIncome, getCountryCarbonEmissionByIncome } from '../../apiOperations'
import './Correlation.css';
import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid, LabelList, ResponsiveContainer } from 'recharts';
import CorrelationLabel from './CorrelationLabel.js';

const ScatterChartCorrelation = props => {
    const [tempAndIncome, setTempAndIncome] = useState([]);
    const [carbAndIncome, setCarbAndIncome] = useState([]);
    

    useEffect(() => {
        
        const setInitialTemps = async () => {
            const tempAndIncome = await getTempChangeAndIncome();
            setTempAndIncome(tempAndIncome);
        }
        
        const setInitialCarb = async () => {
            const carbAndIncome = await getCountryCarbonEmissionByIncome();
            setCarbAndIncome(carbAndIncome);
        }
        
        setInitialTemps().catch(console.error);
        setInitialCarb().catch(console.error);

    }, [])


    const renderTempIncome = () => {
        return tempAndIncome.map( (temp, index)=> {
            // console.log(temp);
            return (
                <div key={index}>
                <h3>{temp.income_category}</h3>
                <p>{temp.temperature_change}</p>
                </div>
            )
        }
        )
    }

    const renderCarbIncome = () => {
        return carbAndIncome.map( (carb, index)=> {
            // console.log(carb);
            return (
                <div key={index}>
                <h3>{carb.income_category}</h3>
                <p>{carb.avg_change_in_emissions}</p>
                </div>
            )
        }
        )
    }


    let merged = [];

    for(let i=0; i<tempAndIncome.length; i++) {
     merged.push({
        ...tempAndIncome[i], 
        ...(carbAndIncome.find((itmInner) => itmInner.income_category === tempAndIncome[i].income_category))}
        );
    }

    console.log(merged);

    return (
        <>
        <br></br>
        <header>Change in emissions vs. Temperature change by Country Income</header>
        <ScatterChart width={500} height={300} margin={{
            top: 10,
            right: 150,
            bottom: 10,
            left: 10,
          }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="avg_change_in_emissions" />
            <YAxis type="number" dataKey="temperature_change" />
            <Scatter data={merged} fill="green" shape = {<CorrelationLabel data={merged}/>} >
            </Scatter>
        </ScatterChart>
        <p></p>
        </>
    )
}




export default ScatterChartCorrelation
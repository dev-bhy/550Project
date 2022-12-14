import React, { useState, useEffect } from 'react'
import { getTempChangeAndIncome, getCountryCarbonEmissionByIncome } from '../../../apiOperations'
import '../IncomeBrackets.css';
import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid, LabelList, ResponsiveContainer, Label } from 'recharts';
import ScatterChartLabel from './ScatterChartLabel.js';

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



    let merged = [];

    for(let i=0; i<tempAndIncome.length; i++) {
     merged.push({
        ...tempAndIncome[i], 
        ...(carbAndIncome.find((itmInner) => itmInner.income_category === tempAndIncome[i].income_category))}
        );
    }

    // console.log(merged);

    return (
        <>
        <div className = "left" style={{
            display: 'block', width: 700, paddingTop: 0, paddingLeft: 20
        }}>
        <h4 className = "charttitleIncome">Change in Emissions vs. Change in Temperature by Country Income</h4>
        <ScatterChart width={600} height={400} margin={{
            top: 10,
            right: 150,
            bottom: 20,
            left: 20,
          }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="avg_change_in_emissions">
            <Label
                    value={"Change in emissions 2000-2008"}
                    position="bottom"
                    style={{ textAnchor: "middle" }}
                    buffer={10}
                />
                </XAxis>
            <YAxis type="number" dataKey="temperature_change">  
            <Label
                    value={"Change in temperature 2000-2008"}
                    position="left"
                    angle={-90}
                    style={{ textAnchor: "middle" }}
                />
                </YAxis>
            <Scatter data={merged} fill="green" shape = {<ScatterChartLabel data={merged}/>} >
            </Scatter>
        </ScatterChart>
        <p></p>
        
        </div>
        </>
    )
}




export default ScatterChartCorrelation
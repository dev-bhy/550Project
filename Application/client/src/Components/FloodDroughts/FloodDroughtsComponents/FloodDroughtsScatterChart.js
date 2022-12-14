import React, { useState, useEffect } from 'react'
import {getFloodDrought} from '../../../apiOperations'
import '../FloodDroughts.css';
import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid, LabelList, ResponsiveContainer, Label } from 'recharts';

const FloodDroughtScatterChart = props => {
    const [floodDrought, setFloodDrought] = useState([]);
    
    useEffect(() => {
        
        const setInitialData = async () => {
            const floodDrought = await getFloodDrought();
            setFloodDrought(floodDrought);
        }
        
        setInitialData().catch(console.error);

    }, [])




    return (
        <>
        <br></br>
        <div style={{
            display: 'block', width: 700, padding: 30
        }}>
        <h4>Change in Temperature 1900-2008 vs. Droughts/ Floods in 2009</h4>
        <ScatterChart width={600} height={400} margin={{
            top: 30,
            right: 30,
            bottom: 30,
            left: 30
          }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="percent_temp_change">
                <Label
                    value={"Temp Change % 1900-2008"}
                    position="bottom"
                    style={{ textAnchor: "middle" }}
                    buffer={10}
                />
            </XAxis>
            <YAxis type="number" dataKey="droughts_floods_2009">
                <Label
                    value={"Droughts/ Floods 2009"}
                    position="left"
                    angle={-90}
                    style={{ textAnchor: "middle" }}
                />
            </YAxis>
            <Scatter data={floodDrought} fill="green"></Scatter>
        </ScatterChart>
        <p></p>
        
        </div>
        </>
    )
}




export default FloodDroughtScatterChart
import React, { useState, useEffect } from 'react'
import {getFloodDrought} from '../../../apiOperations'
import '../FloodDroughts.css';
import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid, LabelList, ResponsiveContainer, Label, Tooltip } from 'recharts';

const FloodDroughtScatterChart = props => {
    const [floodDrought, setFloodDrought] = useState([]);
    
    useEffect(() => {
        
        const setInitialData = async () => {
            const floodDrought = await getFloodDrought();
            setFloodDrought(floodDrought);
        }
        
        setInitialData().catch(console.error);

    }, [])

    var filteredFloodDrought =[];

    floodDrought.forEach(e => {
        let key = Object.keys(e)[2];
        let value = Object.values(e)[2];
        if ((Object.values(e)[2]<16)){
            console.log("Key is", Object.keys(e)[2]);
            filteredFloodDrought.push(e);
        }
    })

    console.log("printing filtered reductions", filteredFloodDrought);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
          return (
            <div className="custom-tooltip">
              <p className="intro">{payload[0].payload.fullName}</p>
              <p className="desc">Country: {payload[0].payload.CName}</p>
            </div>
          );
        }}


    return (
        <>
        <br></br>
        <div className = "left" style={{
            display: 'block', width: 700, paddingTop: 0, paddingLeft: 20
        }}>
        <h4 className = "charttitle">Change in Temperature 1900-2008 vs. Droughts/ Floods in 2009</h4>
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
            <Tooltip content={<CustomTooltip/>} />
            <Scatter data={filteredFloodDrought} fill="blue"></Scatter>
        </ScatterChart>
        <br></br>
        <small>Note: Mongolia was removed as an outlier. Temperature change was {'>'} 20% and also had a lot of droughts/floods</small>
        
        </div>
        </>
    )
}




export default FloodDroughtScatterChart
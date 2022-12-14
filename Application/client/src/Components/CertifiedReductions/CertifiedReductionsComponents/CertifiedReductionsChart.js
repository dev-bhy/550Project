import React, { useState, useEffect } from 'react'
import {getCertifiedReductions} from '../../../apiOperations'
import '../CertifiedReductions.css';
import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid, LabelList, ResponsiveContainer, Label, Tooltip } from 'recharts';

const CertifiedReductionsChart = props => {
    const [certifiedReductions, setcertifiedReductions] = useState([]);
    
    useEffect(() => {
        
        const setInitialData = async () => {
            const certifiedReductions = await getCertifiedReductions();
            setcertifiedReductions(certifiedReductions);
        }
        
        setInitialData().catch(console.error);

    }, [])

    var filteredReductions =[];

    certifiedReductions.forEach(e => {
        let key = Object.keys(e)[2];
        let value = Object.values(e)[2];
        if ((Object.values(e)[2]<100000) && (Object.values(e)[2]>-100000)){
            console.log("Key is", Object.keys(e)[2]);
            filteredReductions.push(e);
        }
    })

    console.log("printing filtered reductions", filteredReductions);

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
        <div className = "left" style={{
            display: 'block', width: 700, paddingTop: 0, paddingLeft: 20
        }}>
        <h4 style={{color:"#006400"}} className = "charttitle">Certified Reduction Count in 2011 vs. Diff in Emissions 2000 - 2008</h4>
        <ScatterChart width={600} height={400} margin={{
            top: 30,
            right: 30,
            bottom: 30,
            left: 30
          }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="diff_in_emissions">
                <Label
                    value={"Diff in Emissions 2000-2008"}
                    position="bottom"
                    style={{ textAnchor: "middle" }}
                    buffer={10}
                />
            </XAxis>
            <YAxis type="number" dataKey="certified_reduction">
                <Label
                    value={"Certified Reduction Count"}
                    position="left"
                    angle={-90}
                    style={{ textAnchor: "middle" }}
                />
            </YAxis>
            <Tooltip content={<CustomTooltip/>} />
            <Scatter data={filteredReductions} fill="green"></Scatter>
        </ScatterChart>
        <small>Note: Serbia, SA, and Iran outliers were removed. Serbia reduced their emissions drastically, while SA and Iran had strong increases in carobon emissions</small>
        
        </div>
        </>
    )
}




export default CertifiedReductionsChart
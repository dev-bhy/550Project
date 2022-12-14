import React, { useState, useEffect } from 'react'
import {getCertifiedReductions} from '../../../apiOperations'
import '../CertifiedReductions.css';
import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid, LabelList, ResponsiveContainer, Label } from 'recharts';

const CertifiedReductionsChart = props => {
    const [certifiedReductions, setcertifiedReductions] = useState([]);
    
    useEffect(() => {
        
        const setInitialData = async () => {
            const certifiedReductions = await getCertifiedReductions();
            setcertifiedReductions(certifiedReductions);
        }
        
        setInitialData().catch(console.error);

    }, [])




    return (
        <>
        <br></br>
        <div style={{
            display: 'block', width: 700, padding: 30
        }}>
        <h4>Certified Reduction Count vs. Diff in Emissions 2000 - 2008</h4>
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
            <Scatter data={certifiedReductions} fill="green"></Scatter>
        </ScatterChart>
        <p></p>
        
        </div>
        </>
    )
}




export default CertifiedReductionsChart
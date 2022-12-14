import React, { useState, useEffect } from 'react'
import {getCountryAvgTempChange, getTempAndCarbonEmission, getTempChangeAndIncome, getCountryCarbonEmissionByIncome } from '../../../apiOperations'
import '../IncomeBrackets.css';
import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,
    Select
} from 'antd'

const TableImpactedCountries = props => {
    const [tempAndIncome, setTempAndIncome] = useState([]);
    

    useEffect(() => {
        
        const setInitialTemps = async () => {
            const tempAndIncome = await getTempAndCarbonEmission();
            setTempAndIncome(tempAndIncome);
        }
        
        setInitialTemps().catch(console.error);


    }, [])
    // console.log("Printing temp and carbon data", tempAndIncome);

    var filteredTempIncome =[];

    tempAndIncome.forEach(e => {
        // let key = Object.keys(e)[2];
        e["temp_change"] = Math.floor(e["temp_change"]*100)/100;
        // if ((Object.values(e)[2]<16)){
            // console.log("Key is", e["temp_change"]);
        //     filteredFloodDrought.push(e);
        // }
    })


    const columns = [
        {
            title: 'Country',
            dataIndex: 'country_name',
            key: 'country_name',
        },
        {
            title: 'Temperature Change',
            dataIndex: 'temp_change',
            key: 'temp_change',
        },
    ];

    return (
        <>
        <div className="left" style={{
            display: 'block', width: 600, padding: 30
        }}>
            <h4 className = "charttitleIncome">Countries most impacted by climate change, despite not producing a lot of CO2</h4>
            <Table pagination={{ pageSize: 5 }} dataSource={tempAndIncome} columns={columns} />
        </div>
        <br></br>
        </>
    )
}




export default TableImpactedCountries
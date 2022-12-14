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
    const [carbAndIncome, setCarbAndIncome] = useState([]);
    

    useEffect(() => {
        
        const setInitialTemps = async () => {
            const tempAndIncome = await getCountryAvgTempChange();
            setTempAndIncome(tempAndIncome);
        }
        
        const setInitialCarb = async () => {
            const carbAndIncome = await getCountryCarbonEmissionByIncome();
            setCarbAndIncome(carbAndIncome);
        }
        
        setInitialTemps().catch(console.error);
        setInitialCarb().catch(console.error);

    }, [])
    // console.log("Printing temp and carbon data", tempAndIncome);

    const columns = [
        {
            title: 'Country',
            dataIndex: 'country_name',
            key: 'country_name',
        },
        {
            title: 'Temperature Change',
            dataIndex: 'Diff',
            key: 'temp_change',
        },
    ];

    return (
        <>
        <div style={{
            display: 'block', width: 700, padding: 30
        }}>
            <h4>Countries most impacted by climate change, despite not producing a lot of CO2</h4>
            <Table dataSource={tempAndIncome} columns={columns} />
        </div>
        </>
    )
}




export default TableImpactedCountries
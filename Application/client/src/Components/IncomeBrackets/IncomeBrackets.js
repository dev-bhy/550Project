import React, { useState, useEffect } from 'react'
import './IncomeBrackets.css';
import ScatterChartCorrelation from './IncomeBracketsComponents/ScatterChart.js'
import TableImpactedCountries from './IncomeBracketsComponents/TableImpactedCountries.js'
import TimeSeriesByIncome from './IncomeBracketsComponents/TimeSeriesByIncome.js'

const IncomeBrackets = props => {
    return (
        <>
        <ScatterChartCorrelation/>
        <TableImpactedCountries/>
        <TimeSeriesByIncome/>
        </>
    )
}




export default IncomeBrackets
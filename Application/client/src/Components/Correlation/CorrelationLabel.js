import React, { useState, useEffect } from 'react'
import { getTempChangeAndIncome, getCountryCarbonEmissionByIncome } from '../../apiOperations'
import './Correlation.css';
import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid, LabelList, Dot } from 'recharts';

const CorrelationLabel = props => {
    const cx = null;
    const cy = null;
    const r = null;
    

    console.log("printing in correlation label", props.cx);
    return (
    <g>
        <Dot cx={props.cx} cy={props.cy} r={5} />
        <g transform={`translate(${props.cx},${props.cy})`}>
          <text x={10} y={0} dy={5} font-size="8" textAnchor="bottom">{props.income_category}</text>
        </g>
      </g>
    )
}

export default CorrelationLabel
import React, { useState, useEffect } from 'react'
import './IncomeBrackets.css';
import ScatterChartCorrelation from './IncomeBracketsComponents/ScatterChart.js'
import TableImpactedCountries from './IncomeBracketsComponents/TableImpactedCountries.js'
import TimeSeriesByIncome from './IncomeBracketsComponents/TimeSeriesByIncome.js'
import ChartExplanation from '../ChartExplanation.js';
import ChartExplanationSub from '../ChartExplanationSub.js';

const IncomeBrackets = props => {
    return (
        <>
        <div>
        <ScatterChartCorrelation/>
        <ChartExplanation text="There isn't a strong correlation between temp change of a country and the flood and drought levels in our dataset."/>
        <ChartExplanationSub text="Finland and Norway have had strong increases in temperatures. The effects are being felt by countries such as Swaziland and Malawi across the globe"/>
        </div>
        <div class="clearfix"></div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        <div>
        <TableImpactedCountries/>
        <ChartExplanation text="There isn't a strong correlation between temp change of a country and the flood and drought levels in our dataset."/>
        <ChartExplanationSub text="Finland and Norway have had strong increases in temperatures. The effects are being felt by countries such as Swaziland and Malawi across the globe"/>
        </div>
        <div class="clearfix"></div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        <div>
        <TimeSeriesByIncome/>
        <ChartExplanationSub color = "#006400" text="High Income Countries"/>
        <ChartExplanation text="There isn't a strong correlation between temp change of a country and the flood and drought levels in our dataset."/>
        <ChartExplanationSub text="Finland and Norway have had strong increases in temperatures. The effects are being felt by countries such as Swaziland and Malawi across the globe"/>
        </div>
        <div class="clearfix"></div>
        <br></br>
        <br></br>
        
        </>
    )
}




export default IncomeBrackets
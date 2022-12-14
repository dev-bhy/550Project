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
        <ChartExplanation text="Lower middle income countries have increased their carbon production the most, but aren't suffering the consequences of climate change."/>
        <ChartExplanationSub text="The temperature change is being felt most in upper middle income countries"/>
        </div>
        <div class="clearfix"></div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        <div>
        <TableImpactedCountries/>
        <ChartExplanation text="There are certain countries that are suffering from increased temperatures, despite working on reducing carbon emissions."/>
        <ChartExplanationSub text="Northern Eurpoean countries dominate this list."/>
        </div>
        <div class="clearfix"></div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        <div id='time-series'>
        <TimeSeriesByIncome/>
        <ChartExplanationSub color = "#03AC13" text="High Income Countries"/>
        <ChartExplanationSub color = "#0000FF" text="Low Income Countries"/>
        <ChartExplanation text="There is a stark difference in the amount of carbon produced based on income level."/>
        <ChartExplanationSub text="Regardless of their income level, their carbon emissinon amounts are not declining."/>
        </div>
        <div class="clearfix"></div>
        <br></br>
        <br></br>
        
        </>
    )
}




export default IncomeBrackets
import React, { useState, useEffect } from 'react'
import './FloodDroughts.css';
import FloodDroughtsScatterChart from './FloodDroughtsComponents/FloodDroughtsScatterChart'
import ChartExplanation from '../ChartExplanation.js';
import ChartExplanationSub from '../ChartExplanationSub.js';

const FloodDroughts = props => {
    return (
        <>
        <FloodDroughtsScatterChart/>
        <ChartExplanation text="There isn't a strong correlation between temp change of a country and the flood and drought levels in our dataset."/>
        <ChartExplanationSub text="Finland and Norway have had strong increases in temperatures. The effects are being felt by countries such as Swaziland and Malawi across the globe"/>
        
        </>
    )
}




export default FloodDroughts
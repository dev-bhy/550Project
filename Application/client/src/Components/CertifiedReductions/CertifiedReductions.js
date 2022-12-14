import React, { useState, useEffect } from 'react'
import './CertifiedReductions.css';
import CertifiedReductionsChart from './CertifiedReductionsComponents/CertifiedReductionsChart'
import ChartExplanation from '../ChartExplanation.js';
import ChartExplanationSub from '../ChartExplanationSub.js';

const CertifiedReductions = props => {
    return (
        <>
        <CertifiedReductionsChart/>
        <ChartExplanation text="Countries who had the biggest increase in emissions between 2000 and 2008, were not compensating by issuing reduction counts in 2011."/>
        <ChartExplanationSub text="Thailand is the exception with highest emission increase, but also high reduction efforts. Countries like UAE, Qatar, and Oman are not taking action."/>
        
        </>
    )
}




export default CertifiedReductions
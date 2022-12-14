import React, { useState, useEffect } from 'react'
import './CertifiedReductions/CertifiedReductions.css';

const ChartExplanation = props => {
    return (
        <>
        <p className = 'right' color={props.color}>{props.text}</p> 
        </>
    )
}




export default ChartExplanation
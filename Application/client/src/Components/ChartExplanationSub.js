import React, { useState, useEffect } from 'react'
import './CertifiedReductions/CertifiedReductions.css';

const ChartExplanationSub = props => {
    console.log(props.color);
    const color = props.color;
    return (
        <>
        <p className = 'right' style={{color:color}}>{props.text}</p> 
        </>
    )
}




export default ChartExplanationSub
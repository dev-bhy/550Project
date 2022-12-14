import React, { useState } from 'react';
import Overview from './Overview.js'
import '../styles/Main.css'
import IncomeBrackets from './IncomeBrackets/IncomeBrackets.js'
import FloodDroughts from './FloodDroughts/FloodDroughts.js'
import CertifiedReductions from './CertifiedReductions/CertifiedReductions.js'


const renderCurrentPage = currentPage => {
    switch (currentPage) {
        case 0:
            return <Overview />
        case 1:
            return <IncomeBrackets/>
        case 2:
            return <FloodDroughts/>
        case 3:
            return <CertifiedReductions/>                
        default:
            return <p>No page selected</p>
    }
}

const Main = props => {
    const [currentPage, updateCurrentPage] = useState(0);
    return (
        <>
            <div id='topBar'>
                <button className='topBar-button' onClick={() => updateCurrentPage(0)}>Overview</button>
                <button className='topBar-button' onClick={() => updateCurrentPage(1)}>Income Brackets</button>
                <button className='topBar-button' onClick={() => updateCurrentPage(2)}>Flood Droughts</button>
                <button className='topBar-button' onClick={() => updateCurrentPage(3)}>Certified Reductions</button>
            </div>
            {renderCurrentPage(currentPage)}
        </>
    )
}



export default Main;
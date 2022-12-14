import React, { useState } from 'react';
import Overview from './Overview.js'
import Correlation from './Correlation/Correlation.js'
import '../styles/Main.css'


const renderCurrentPage = currentPage => {
    switch (currentPage) {
        case 0:
            return <Overview />
        case 1:
            return <Correlation/>
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
                <button className='topBar-button' onClick={() => updateCurrentPage(1)}>Correlation</button>
            </div>
            {renderCurrentPage(currentPage)}
        </>
    )
}



export default Main;
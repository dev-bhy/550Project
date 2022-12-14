import React, { useState } from 'react';
import Overview from './Overview.js'
import IncomeBrackets from './IncomeBrackets/IncomeBrackets.js'


const renderCurrentPage = currentPage => {
    switch (currentPage) {
        case 0:
            return <Overview />
        case 1:
            return <IncomeBrackets/>
        default:
            return <p>No page selected</p>
    }
}

const Main = props => {
    const [currentPage, updateCurrentPage] = useState(0);
    return (
        <>
            <div id='topBar'>
                <button onClick={() => updateCurrentPage(0)}>Overview</button>
                <button onClick={() => updateCurrentPage(1)}>Income Brackets</button>
            </div>
            {renderCurrentPage(currentPage)}
        </>
    )
}



export default Main;
import React, { useState, useEffect } from 'react'
import { getAvgPrecs, getAvgTemps, getTempChange, getIncomes, getCarbons} from '../apiOperations'
import WorldMap from './WorldMap';
import IncomeMap from './IncomeMap';
import { scaleLinear, scaleLog} from "d3-scale"
import '../styles/Overview.css'


const Overview = props => {
    const [currentDataType, updateCurrentDataType] = useState('Temp');
    const [startYear, updateStartYear] = useState(1900);
    const [endYear, updateEndYear] = useState(2008);
    const [year, updateYear] = useState(2008);
    const [countryData, updateCountryData] = useState([]);
    const [dictionary, updateDictionary] = useState({})
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);

    const colorScaleLinear = (minValue, maxValue, minColor, maxColor, name) => {
        let scale = scaleLinear()
        .domain([Number(minValue),Number(maxValue)])
        .range([minColor,maxColor])
        return scale(name);
    }

    const colorScaleLog = (minValue, maxValue, minColor, maxColor, name) =>  {
        let scale = scaleLog(name)
        .domain([Number(minValue),Number(maxValue)])
        .range([minColor,maxColor])
        return scale(name)
    }

    

    const renderMap = ()  => {
        switch (currentDataType) {
            case 'Temp':
                return (
                    <>
                <h2>Average Yearly Temperatures per Country</h2>
                <WorldMap minValue = {minValue} 
                                 maxValue={maxValue} 
                                 dict={dictionary}  
                                 minColor={'#DAFFBE'} 
                                 maxColor={'#003d06'}
                                 defaultColor={'#8F928C'}
                                 units={'\u00B0 C'}
                                 colorScale={colorScaleLinear}/>
                                 </>)
                        
            case 'Prec':
                return(
                    <>
                    <h2>Average Yearly Precipitation Per Country</h2>
                     <WorldMap minValue = {minValue} 
                                 maxValue={maxValue} 
                                 dict={dictionary}  
                                 minColor={'#6ec5eb'} 
                                 maxColor={'#002b3d'}
                                 defaultColor={'#8F928C'}
                                 units={' in'}
                                 colorScale={colorScaleLinear}/>
                                 </>)
            case 'TempChange':
                return ( <>
                        <h2>Change in Average Yearly Temperatures Per Country from {startYear} to {endYear}</h2>
                        <WorldMap minValue = {minValue} 
                                 maxValue={maxValue} 
                                 dict={dictionary}  
                                 minColor={'#f8ff96'} 
                                 maxColor={'#aeba00'}
                                 defaultColor={'#8F928C'}
                                 units={'\u00B0 C'}
                                 colorScale={colorScaleLinear}/>
                        <h3>Average World Temperature Change: {computeAverageTempChange(countryData)}%</h3>
                                 </>)
            case 'Income':
                return (<>
                        <h2>Income Zone per Country</h2>
                        <IncomeMap 
                            dict={dictionary} 
                            defaultColor={'#6a6b6b'}
                            />     
                        </>)
            case 'Carbon':
                return ( <>
                        <h2>Average Yearly Carbon Emissions per Country in {year}</h2>
                        <WorldMap minValue = {minValue} 
                                 maxValue={maxValue} 
                                 dict={dictionary}  
                                 minColor={'#ecdcf7'} 
                                 maxColor={'#42006e'}
                                 defaultColor={'#8F928C'}
                                 units={' tons'}
                                 colorScale={colorScaleLog}/>
                                 </>)
            
            default :
                return <p>None Selected</p>
        }
     }
    const computeAverageTempChange = countryData => {
        let sum = 0;
        countryData.forEach(datum => {
            sum += datum.Diff;
        })
        return sum/countryData.length;
    }
     const getData = async (dataType, start, end)=> {
        let min = Number.MAX_VALUE
        let max = Number.MIN_VALUE
        const dict = {};
        let data;
        let propName;
        let countryName;
        switch(dataType) {
            case 'Temp':
                data = await getAvgTemps(1000);
                propName = 'temperature'
                countryName = 'country_name'
                break;
            case 'Prec':
                data = await getAvgPrecs(1000);
                propName = 'average_precipitation'
                countryName = 'region'
                break;
            case 'TempChange':
                data = await getTempChange(start, end);
                propName = 'Diff'
                countryName = 'country_name'
                break;
            case 'Income':
                data = await getIncomes();
                propName = 'income_group'
                countryName = 'country_name'
                break;
            case 'Carbon':
                data = await getCarbons(start);
                propName = 'emission'
                countryName = 'country_name'
                break;
            default:
                throw new Error('No datatype selected')
        }
        updateCountryData(data);
        data.forEach(datum => {
            Number(datum[propName]) < min && (min = datum[propName])
            Number(datum[propName]) > max && (max = datum[propName])
            switch(datum[countryName]) {
                case 'United States':
                    dict['United States of America'] = datum[propName];
                    break;
                case 'Cote d\'Ivoire':
                    dict['Ivory Coast'] = datum[propName];
                    break;
                case 'Serbia':
                    dict['Republic of Serbia'] = datum[propName];
                    break;
                case 'Congo, Rep.':
                    dict['Republic of the Congo'] = datum[propName];
                    break;
                case 'Tanzania':
                    dict['United Republic of Tanzania'] = datum[propName];
                    break;
                case 'Congo, Dem. Rep.':
                    dict['Democratic Republic of the Congo'] = datum[propName];
                    break;
                case 'Timor Leste':
                    dict['East Timor'] =  datum[propName];
                    break;
                default:
                    dict[datum[countryName]] = datum[propName];
                    break; 
            }
        })
        //console.log('min ' + min);
       // console.log('max ' + max);
       dict['South Sudan'] = dict['Sudan']
        
        setMaxValue(max)
        setMinValue(min)
        updateCountryData(data); 
        updateDictionary(dict);
     }

    useEffect(() => {
        getData('Temp');        
    }, [])

    return (
        <>
        <div id='mode-container'>
            <button id={(currentDataType==='Temp')?'selected': ''}className='mode-button' onClick={() => {
                updateCurrentDataType('Temp');
                getData('Temp')
            }}>Temperatures</button>
            <button id={(currentDataType==='Prec')?'selected': ''} className='mode-button' onClick={() => {
                updateCurrentDataType('Prec')
                getData('Prec')           
            }}>Precipitation</button>
            <button id={(currentDataType==='TempChange')?'selected': ''} className='mode-button' onClick={() => {
                updateCurrentDataType('TempChange')
                getData('TempChange', startYear, endYear)           
            }}>Temperature Change by Year</button>
            <button id={(currentDataType==='Income')?'selected': ''} className='mode-button' onClick={() => {
                updateCurrentDataType('Income')
                getData('Income')           
            }}>Income Categories</button>
            <button id={(currentDataType==='Carbon')?'selected': ''} className='mode-button' onClick={() => {
                updateCurrentDataType('Carbon')
                getData('Carbon')          
            }}>Carbon Emissions by Year</button>
        </div>

        {renderMap()}
        {currentDataType === 'TempChange' && (
            <>
                <p>Start Year: {startYear}</p>
                <input type="range" min="1900" max={endYear} value={startYear} onChange={e => {
                            updateStartYear(e.target.value)
                            getData('TempChange', e.target.value, endYear);
                }}/>
                <p>End Year: {endYear}</p>
                <input type="range" min={startYear} max="2008" value={endYear} onChange={(e => {
                    updateEndYear(e.target.value)
                    getData('TempChange', startYear, e.target.value);
                    
                })}/>
            </>
        )}
        {currentDataType === 'Carbon' && (
            <>
            <p>Year: {year}</p>
            <input type="range" min='1991' max="2008" value={year} onChange={(e => {
                console.log(e.target.value);
                updateYear(e.target.value)
                getData('Carbon', e.target.value);
                
            })}/>
            </>
        )}
        
        </>
    )
}




export default Overview
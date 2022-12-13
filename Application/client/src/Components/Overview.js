import React, { useState, useEffect } from 'react'
import { getAvgPrecs, getAvgTemps, getTempChange } from '../apiOperations'
import WorldMap from './WorldMap';
import ReactTooltip from 'react-tooltip'



const Overview = props => {
    const [currentDataType, updateCurrentDataType] = useState('Temp');
    const [startYear, updateStartYear] = useState(1900);
    const [endYear, updateEndYear] = useState(2008);
    const [countryData, updateCountryData] = useState([]);
    const [dictionary, updateDictionary] = useState({})
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);

    const renderMap = ()  => {
        switch (currentDataType) {
            case 'Temp':
                return <WorldMap minValue = {minValue} 
                                 maxValue={maxValue} 
                                 dict={dictionary}  
                                 minColor={'#DAFFBE'} 
                                 maxColor={'#003d06'}
                                 defaultColor={'#8F928C'}/>
                        
            case 'Prec':
                return <WorldMap minValue = {minValue} 
                                 maxValue={maxValue} 
                                 dict={dictionary}  
                                 minColor={'#6ec5eb'} 
                                 maxColor={'#002b3d'}
                                 defaultColor={'#8F928C'}/>
            case 'TempChange':
                return <WorldMap minValue = {minValue} 
                                 maxValue={maxValue} 
                                 dict={dictionary}  
                                 minColor={'#f8ff96'} 
                                 maxColor={'#aeba00'}
                                 defaultColor={'#8F928C'}/>
            default :
                return <p>None Selected</p>
        }
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
            default:
                throw new Error('No datatype selected')
        }
        updateCountryData(data);
        data.forEach(datum => {
            datum[propName] < min && (min = datum[propName])
            datum[propName] > max && (max = datum[propName])
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
                default:
                    dict[datum[countryName]] = datum[propName];
                    break; 
            }
        })
        setMaxValue(max)
        setMinValue(min)
        updateCountryData(data); 
        updateDictionary(dict);
     }

    useEffect(() => {
        
        /*const setInitialTemps = async () => {
            const temperatureData = await getAvgTemps(1000);
            const temps = {};
            let min = Number.MAX_VALUE
            let max = Number.MIN_VALUE
            temperatureData.forEach(temp => {
                temp.temperature < min && (min = temp.temperature)
                temp.temperature > max && (max = temp.temperature)
                switch(temp.country_name) {
                    case 'United States':
                        temps['United States of America'] = temp.temperature;
                        break;
                    case 'Cote d\'Ivoire':
                        temps['Ivory Coast'] = temp.temperature;
                        break;
                    case 'Serbia':
                        temps['Republic of Serbia'] = temp.temperature;
                        break;
                    case 'Congo, Rep.':
                        temps['Republic of the Congo'] = temp.temperature;
                        break;
                    case 'Tanzania':
                        temps['United Republic of Tanzania'] = temp.temperature;
                        break;
                    default:
                        temps[temp.country_name] = temp.temperature;
                        break;      
                }                         
            })
            setMaxValue(max)
            setMinValue(min)
            updateAvgTemps(temperatureData);
            updateTempDictionary(temps);
        }
        setInitialTemps();*/
        getData('Temp');
        
    }, [])



   /* const renderAvgTemps = () => {
        return currentData.map( (temp, index)=> {
            console.log(temp);
            return (
                <div key={index}>
                <h3>{temp.country_name}</h3>
                <p>{temp.temperature}</p>
                </div>
            )
        }

        )
    }*/
    return (
        <>
        {/*renderAvgTemps()*/}
        {renderMap()}
        <ReactTooltip fontSize='2px' place='right'/>
        <button onClick={() => {
            updateCurrentDataType('Temp');
            getData('Temp')
        }}>Temps</button>
        <button onClick={() => {
            updateCurrentDataType('Prec')
            getData('Prec')           
        }}>Precipitation</button>
         <button onClick={() => {
            updateCurrentDataType('TempChange')
            getData('TempChange', startYear, endYear)           
        }}>Get Temp Change</button>
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
        </>
    )
}




export default Overview
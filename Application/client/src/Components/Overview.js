import React, { useState, useEffect } from 'react'
import { getAvgTemps } from '../apiOperations'
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { scaleLinear } from "d3-scale"

const Overview = props => {
    const [avgtemps, updateAvgTemps] = useState([])
    const [tempDictionary, updateTempDictionary] = useState({})
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    useEffect(() => {
        
        const setInitialTemps = async () => {
            const temperatureData = await getAvgTemps(1000);
            const temps = {};
            let min = Number.MAX_VALUE
            let max = Number.MIN_VALUE
            temperatureData.forEach(temp => {
                console.log(temp)
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
        setInitialTemps();
        
    }, [])


const geoUrl =
"https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
 
const minColor = "#CFD8DC"
const maxColor = "#37474F"

const colorScale = scaleLinear()
  .domain([minValue,maxValue])
  .range([minColor,maxColor])
  
const MapChart = () => {
return (
  <ComposableMap projection="geoMercator" width={2000}>
    <Geographies geography={geoUrl}>
      {({ geographies }) => 
        geographies.map((geo) => 
          /*if(geo.properties.name === 'Yemen') {
             return <Geography key={geo.rsmKey} geography={geo} fill='#FF5533' />
          } else {
             return <Geography key={geo.rsmKey} geography={geo} />
          }*/
          <Geography key={geo.rsmKey} geography={geo} fill={tempDictionary[geo.properties.name]?colorScale(tempDictionary[geo.properties.name]):'#000000'}/>      
      )}
    </Geographies>
  </ComposableMap>
)
}

    const renderAvgTemps = () => {
        return avgtemps.map( (temp, index)=> {
            console.log(temp);
            return (
                <div key={index}>
                <h3>{temp.country_name}</h3>
                <p>{temp.temperature}</p>
                </div>
            )
        }

        )
    }
    return (
        <>
        {renderAvgTemps()}
        {MapChart()}
        </>
    )
}




export default Overview
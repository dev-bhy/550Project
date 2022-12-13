import React, {useState} from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { scaleLinear } from "d3-scale"
import ReactTooltip from 'react-tooltip'

const WorldMap = props => {
    const {minValue, maxValue, minColor, maxColor, defaultColor, dict} = props
    const [content, setContent] = useState('');
    const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

    const colorScale = scaleLinear()
        .domain([minValue,maxValue])
        .range([minColor,maxColor])

    return (
    <>
    <p data-tip data-for='tooltip'> hi</p>
    <ComposableMap projection="geoMercator" width={2000}>
    
    <ZoomableGroup>
        
    <Geographies geography={geoUrl}>
      {({ geographies }) => 
        geographies.map((geo) => 
          /*if(geo.properties.name === 'Yemen') {
             return <Geography key={geo.rsmKey} geography={geo} fill='#FF5533' />
          } else {
             return <Geography key={geo.rsmKey} geography={geo} />
          }*/
          <Geography onMouseEnter={() => setContent(`${geo.properties.name}: ${dict[geo.properties.name]}`)}
                    data-tip={`${geo.properties.name}: ${dict[geo.properties.name]}`}      
                    key={geo.rsmKey} 
                    geography={geo} 
                    fill={dict[geo.properties.name]?colorScale(dict[geo.properties.name]): defaultColor}/>      
      )}
    </Geographies>
    </ZoomableGroup>
  </ComposableMap>
  </>)
}

export default WorldMap
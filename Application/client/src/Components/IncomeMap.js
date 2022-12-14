import React, {useState, useEffect} from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { scaleLinear } from "d3-scale"
import ReactTooltip from 'react-tooltip'

const WorldMap = props => {
    const {minValue, maxValue, minColor, maxColor, defaultColor, dict} = props
    const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

    const colorScale = value => {
        switch(value) {
            case 'Low income':
                return '#de091b';
            case 'Lower middle income':
                return '#de6209'
            case 'Upper middle income':
                return '#ded009';
            case 'High income: nonOECD':
                return '#09de1b';
            case 'High income: OECD':
                return '#0985de';
            default:
                return defaultColor
        }
    }


    return (
    <div id='Map'>
    <ComposableMap projection="geoMercator" width={1000} >
    
    <ZoomableGroup>
        
    <Geographies geography={geoUrl}>
      {({ geographies }) => 
        geographies.map((geo) => 
          <Geography onMouseEnter={() => ReactTooltip.rebuild()}
                     id='tooltip' 
                     data-tip={`${geo.properties.name}: ${dict[geo.properties.name]}`}      
                     key={geo.rsmKey} 
                     geography={geo} 
                     fill={dict[geo.properties.name]?colorScale(dict[geo.properties.name]): defaultColor}/>      
      )}
    </Geographies>
    </ZoomableGroup>
  </ComposableMap>
  <ReactTooltip place='right'/>
  <div id='legend'>
    <div className='legend-item-container'>
            <p>Low Income </p>
            <div id='low' className='legend-item'></div>
    </div>
    <div className='legend-item-container'>
            <p>Lower Middle Income </p>
            <div id='lower-middle' className='legend-item'></div>
    </div>
    <div className='legend-item-container'>
            <p>Upper Middle Income</p>
            <div id='upper-middle' className='legend-item'></div>
    </div>
    <div className='legend-item-container'>
            <p>High Income: nonOECD</p>
            <div id='high-nonOECD' className='legend-item'></div>
    </div>
    <div className='legend-item-container'>
            <p>High Income: OECD</p>
            <div id='high-OECD' className='legend-item'></div>
    </div>
   
  </div>
  </div>)
}

export default WorldMap
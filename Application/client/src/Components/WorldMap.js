import React, {useState, useEffect} from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { scaleLinear, scaleLog} from "d3-scale"
import ReactTooltip from 'react-tooltip'

const WorldMap = props => {
    const {minValue, maxValue, minColor, maxColor, defaultColor, dict, units, colorScale, prefix} = props
    const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

    



    return (
    <div id='Map'>
    <ComposableMap projection="geoMercator" width={1000} >
    
    <ZoomableGroup>
        
    <Geographies geography={geoUrl}>
      {({ geographies }) => 
        geographies.map((geo) => 
          /*if(geo.properties.name === 'Yemen') {
             return <Geography key={geo.rsmKey} geography={geo} fill='#FF5533' />
          } else {
             return <Geography key={geo.rsmKey} geography={geo} />
          }*/
          <Geography onMouseEnter={() => {
                /*setContent(`${geo.properties.name}: ${dict[geo.properties.name]}`)}*/
                ReactTooltip.rebuild();
                }}
                    id='tooltip' 
                    data-tip={`${geo.properties.name}: ${(dict[geo.properties.name] > 0)?prefix + dict[geo.properties.name]:dict[geo.properties.name]}${units}`}      
                    key={geo.rsmKey} 
                    geography={geo} 
                    fill={dict[geo.properties.name]?colorScale(minValue, maxValue, minColor, maxColor, dict[geo.properties.name]): defaultColor}
                    style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" },
                      }}
          />      
      )}
    </Geographies>
    </ZoomableGroup>
  </ComposableMap>
  <ReactTooltip place='right'/>
  </div>)
}

export default WorldMap
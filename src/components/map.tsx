import React from 'react'
import {Map, Marker} from '@vis.gl/react-google-maps'
import { getGeodata } from '../utils/utils'

const CBRMMap = ()=>{
    const geodata = getGeodata()
    const markerLocations = geodata.map(gd=>{
        const latLng = {
            lat: Number(gd.coordinates.latitude),lng:Number(gd.coordinates.longitude)
        }
        return latLng
    })
    return (
        <div className="w-full " style={{ height: '400px' }}>
          {/* <arcgis-embedded-map style="height:600px;width:700px;" item-id="48908367c2d24cd9a2989bcc6b52e7c1" theme="light" portal-url="https://africageoportal.maps.arcgis.com" heading-enabled legend-enabled share-enabled></arcgis-embedded-map> */}
          {/* <Map
            defaultZoom={13}
            defaultCenter={markerLocations[1]}
            gestureHandling={"greedy"}
            disableDefaultUI
          >
            {geodata.map((gd,index)=>{
                return <Marker key={gd.name} position={markerLocations[index]} title={`${gd.name} - ${gd.value}`} />
            })}
            
          </Map> */}
        </div>
      );
}
export default CBRMMap;
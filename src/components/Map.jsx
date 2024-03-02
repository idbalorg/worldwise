import React, { useEffect, useState } from 'react'
import styles from '../components/Map.module.css'
import { useNavigate } from 'react-router-dom';
import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocate';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';

function Map() {
  const {cities} = useCities()

  const [mapPosition, setMapPosition] = useState([40, 0])
  const [mapLat, mapLng] = useUrlPosition()

  const {
    isLoading : isLoadingPosition,
    position : geolocationPosition,
    getPosition ,
  } = useGeolocation()

  useEffect(()=>{
    if(mapLat && mapLng) {
      setMapPosition([mapLat, mapLng])
    }
  },
  [mapLat, mapLng])

  useEffect(()=>{
    if(geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
  },[geolocationPosition])

  return (
    <div className={styles.mapContainer} >
       <MapContainer 
       className={styles.map} 
       center={mapPosition} 
       zoom={13} 
       scrollWheelZoom={true}>
      <Button onClick={getPosition} type='position'>{isLoadingPosition ? "...Loading" :'USE YOUR POSITION'}</Button>

    <TileLayer
    
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map((city)=>(
    <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
      <Popup>
        <span>{city.emoji}</span> <span>{city.cityName}</span>
      </Popup>
    </Marker>))}
    <ChangePosition
      position={mapPosition}
    />
    <PopUpform/>

  </MapContainer>

    </div>
  )
}

function ChangePosition({position}) {
 const map = useMap()
 map.setView(position)
 return null
}

function PopUpform() {
  const navigate = useNavigate()

  
  useMapEvents({
    click : (e)=>{
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }}
    
  )

  return null
}


export default Map
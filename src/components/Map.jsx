import React from 'react'
import styles from '../components/Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom';

function Map() {
  const [searchParams, setSearchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const navigate = useNavigate()
  return (
    <div className={styles.mapContainer} onClick={()=>{navigate('form')}}>
      <h1>Map</h1>
      <h2>Position : {lat}, {lng} </h2>
      <button onClick={()=>setSearchParams({lat : 30, lng : 50})}>location</button>
    </div>
  )
}

export default Map
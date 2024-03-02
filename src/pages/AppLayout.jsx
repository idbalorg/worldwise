import React from 'react'
import Sidebar from '../components/Sidebar'
import style from './AppLayout.module.css'
import Map from '../components/Map'
import User from '../components/User'



function AppLayout() {
  return (
    <div className={style.app}>
        <Sidebar/>
        <Map/>
        <User/>
    </div>
  )
}

export default AppLayout
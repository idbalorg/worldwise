import React from 'react'
import style from './CityItem.module.css'
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';


const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));


function CityItem({city}) {
    const {emoji, cityName, date, id, position} = city
    const {currentCity} = useCities()
    const {lat, lng} = position
  return (
    <li >
      <Link className={`${style.cityItem} ${id === currentCity.id ? style[`cityItem--active`] : ''}`} to={`${id}?lat=${lat}&lng=${lng}`}>
        <span className={style.emoji}>{emoji}</span>
        <h3 className={style.name}>{cityName}</h3>
        <time className={style.time}>{formatDate(date)}</time>
        <button className={style.deleteBtn}>&times;</button>
      </Link>
        
    </li>
  )
}

export default CityItem
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from './Message';
import Spinner from './Spinner';
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}


function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false)
  const [geoCodingError, setGeoCodingError] = useState('')
  const [lat, lng] = useUrlPosition()
  const [emoji, setEmoji] = useState(null)

  const {createCity, isLoading} = useCities()
  const navigate = useNavigate()

  useEffect(()=>{
    const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?"
    if(!lat || !lng) return
    
    async function fecthCityData(){
      try {
        setIsLoadingGeolocation(true)
        // setGeoCodingError("")
        const res = await fetch(`${BASE_URL}latitude=${lat}&longitude=${lng}`)
        const data = await res.json()
        if(!data.countryCode) throw new Error("The city you have entered seems not to exist, click on another city to continue 😉")

        setCityName(data.city || data.locality || "")
        setEmoji(convertToEmoji(data.countryCode))
        setCountry(data.countryName)
      }catch (err){
        setGeoCodingError(err.message)
        console.log(err)
      }finally{
        setIsLoadingGeolocation(false)

      }
    }
    fecthCityData()
  }
  ,[lat, lng])

  if(isLoadingGeolocation) return <Spinner/>

  if(!lat || !lng) return <Message message='start by clicking anywhere on the map'/>

  if(geoCodingError) return <Message message={geoCodingError} />

  async function handleFormSubmit(e) {
    e.preventDefault()
    if(!lat && !lng) return

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: lat,
        lng : lng
    }
    
  }
  await createCity(newCity)
  navigate('/app/cities')
}

  return (
    <form className={`${styles.form} ${isLoading ? styles.form.loadng : ""}`} onSubmit={handleFormSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker 
        id="date"
        selected={date}
        onChange={date=> setDate(date)}
        dateFormat={'dd/MM/yyyy'}
        />


      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>&rarr; Add</Button>
        <BackButton/>
      </div>
    </form>
  );
}

export default Form;

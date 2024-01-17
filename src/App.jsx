import React, { useEffect, useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'



const BASE_URL = "http://localhost:8000"
function App() {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    async function fetchCities(){

      try{

        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data)
      }catch{
        alert('There was error loading information')
      }finally{
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])

  return (
    
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='product' element={<Product/>}/>
        <Route path='pricing' element={<Pricing/>}/>
        <Route path='*' element={<PageNotFound/>} />
        <Route path='app' element={<AppLayout/>}>
          <Route path='cities' element={<CityList isLoading={isLoading} cities={cities} />}  />
          <Route path='cities/:id' element={<City/>} />
          <Route path='countries' element={<CountryList isLoading={isLoading} cities={cities} />} />
          <Route path='form' element={<Form/>} />

        </Route>
        <Route path='login' element={<Login/>} />
  
      </Routes>
    
    </BrowserRouter>
    
  )
}

export default App
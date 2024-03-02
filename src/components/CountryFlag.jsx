import React from 'react'
import Flags from 'react-flags-select';
// import 'react-flags-select/css/react-flags-select.css';

function CountryFlag({countryCode}) {
  return (
    <Flags selected={countryCode}/>
  )
}

export default CountryFlag
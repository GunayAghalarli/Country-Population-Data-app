import {useState} from 'react'
import Countries from './components/Countries'
import Chart from './components/Chart'


function App() {
  const [selectedCountries, setSelectedCountries] = useState([]); //

  return (
   <div>
   <Countries
   selectedCountries = {selectedCountries}
   setSelectedCountries = {setSelectedCountries}

   />
   <Chart 
   selectedCountries = {selectedCountries}
   />
   </div>
  )
}

export default App

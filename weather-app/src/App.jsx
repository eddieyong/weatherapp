import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import WeatherDisplay from './components/WeatherDisplay'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return (
    <div className="app">
      <h1>Weather App</h1>
      <SearchBar 
        setWeatherData={setWeatherData} 
        setLoading={setLoading} 
        setError={setError} 
      />
      {loading && <p className="loading">Loading weather data<span className="loading-dots">...</span></p>}
      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherDisplay weatherData={weatherData} />}
    </div>
  )
}

export default App 
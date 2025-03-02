import { useState } from 'react'
import axios from 'axios'

// WeatherAPI.com API key
const API_KEY = 'fd0306823aa947048af72354250203'
const API_URL = 'https://api.weatherapi.com/v1'

function SearchBar({ setWeatherData, setLoading, setError }) {
  const [location, setLocation] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    
    if (!location.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      console.log(`Fetching current weather for: ${location}`)
      // Get current weather and forecast in one call
      const response = await axios.get(
        `${API_URL}/forecast.json?key=${API_KEY}&q=${location}&days=1&aqi=no&alerts=no`
      )
      console.log('Weather data:', response.data)
      
      // Format the hourly data to match the expected structure in WeatherDisplay
      const hourlyData = response.data.forecast.forecastday[0].hour
        .slice(-6) // Get the last 6 hours of the day
        .map(item => ({
          dt: new Date(item.time).getTime() / 1000, // Convert to Unix timestamp
          temp: item.temp_c,
          weather: [{
            id: item.condition.code,
            main: item.condition.text,
            description: item.condition.text,
            icon: item.condition.icon
          }]
        }))
      
      // Format current data to match the expected structure
      const currentData = {
        name: response.data.location.name,
        sys: {
          country: response.data.location.country
        },
        weather: [{
          id: response.data.current.condition.code,
          main: response.data.current.condition.text,
          description: response.data.current.condition.text,
          icon: response.data.current.condition.icon
        }],
        main: {
          temp: response.data.current.temp_c,
          feels_like: response.data.current.feelslike_c,
          humidity: response.data.current.humidity,
          pressure: response.data.current.pressure_mb
        },
        wind: {
          speed: response.data.current.wind_kph / 3.6, // Convert km/h to m/s
          deg: response.data.current.wind_degree
        }
      }
      
      setWeatherData({
        current: currentData,
        hourly: hourlyData
      })
    } catch (error) {
      console.error('Error fetching weather data:', error)
      
      if (error.response) {
        console.error('Error response:', error.response.data)
        console.error('Status code:', error.response.status)
        
        if (error.response.status === 400 && error.response.data.error && error.response.data.error.code === 1006) {
          setError('Location not found. Please check the spelling and try again.')
        } else if (error.response.status === 401 || error.response.status === 403) {
          setError('API key error: Your API key is invalid or not activated yet.')
        } else {
          setError(`Failed to fetch weather data: ${error.response.data.error?.message || 'Unknown error'}`)
        }
      } else if (error.request) {
        console.error('No response received:', error.request)
        setError('No response from weather service. Please check your internet connection.')
      } else {
        console.error('Error message:', error.message)
        setError(`Error: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city or country name"
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  )
}

export default SearchBar 
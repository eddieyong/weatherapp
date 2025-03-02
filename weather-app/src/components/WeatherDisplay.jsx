import './WeatherDisplay.css'

function WeatherDisplay({ weatherData }) {
  const { current, hourly } = weatherData
  
  if (!current) return null
  
  // Format date
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="weather-display">
      <div className="current-weather">
        <h2>{current.name}, {current.sys.country}</h2>
        <div className="weather-main">
          <img 
            src={current.weather[0].icon.startsWith('//') ? `https:${current.weather[0].icon}` : current.weather[0].icon} 
            alt={current.weather[0].description} 
            className="weather-icon"
          />
          <div className="temperature">
            <h3>{Math.round(current.main.temp)}°C</h3>
            <p className="weather-description">{current.weather[0].description}</p>
          </div>
        </div>
        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Feels like:</span>
            <span className="detail-value">{Math.round(current.main.feels_like)}°C</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Humidity:</span>
            <span className="detail-value">{current.main.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wind:</span>
            <span className="detail-value">{current.wind.speed} m/s</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Pressure:</span>
            <span className="detail-value">{current.main.pressure} hPa</span>
          </div>
        </div>
      </div>
      
      {hourly && (
        <div className="hourly-forecast">
          <h3>Hourly Forecast</h3>
          <div className="hourly-container">
            {hourly.map((hour, index) => (
              <div key={index} className="hourly-item">
                <p className="hourly-time">{formatTime(hour.dt)}</p>
                <img 
                  src={hour.weather[0].icon.startsWith('//') ? `https:${hour.weather[0].icon}` : hour.weather[0].icon} 
                  alt={hour.weather[0].description} 
                  className="hourly-icon"
                />
                <p className="hourly-temp">{Math.round(hour.temp)}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default WeatherDisplay 
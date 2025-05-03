import { useState } from 'react'
import { FiSearch, FiMapPin, FiThermometer, FiDroplet, FiWind } from 'react-icons/fi'
import axios from 'axios'

const Weather = ({ location, setLocation }) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const API_KEY = '52b86f4836a75bf5dcf33c8f025e72e1' // You'll need to get this from OpenWeatherMap
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

  const fetchWeather = async (e) => {
    e.preventDefault()
    if (!location.trim()) {
      setError('Please enter a location')
      return
    }

    setLoading(true)
    setError('')
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: location.trim(),
          units: 'metric',
          appid: API_KEY
        }
      })
      setWeather(response.data)
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Location not found. Please check the spelling and try again.')
      } else {
        setError('An error occurred. Please try again later.')
      }
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={fetchWeather} className="flex gap-2 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name..."
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg"
          />
          <FiSearch className="absolute right-4 top-4 text-white/70 text-xl" />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors text-lg font-medium"
        >
          Search
        </button>
      </form>

      {loading && (
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-lg">Loading weather data...</p>
        </div>
      )}

      {error && (
        <div className="text-red-200 text-center p-6 bg-red-500/20 rounded-xl mb-8">
          <p className="text-lg">{error}</p>
        </div>
      )}

      {weather && (
        <div className="text-white">
          <div className="flex items-center gap-3 mb-8">
            <FiMapPin className="text-2xl text-white/80" />
            <h2 className="text-3xl font-bold">{weather.name}, {weather.sys.country}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-lg">
              <div className="flex items-center gap-3 mb-3">
                <FiThermometer className="text-2xl text-white/80" />
                <p className="text-lg text-white/70">Temperature</p>
              </div>
              <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
              <p className="text-white/70 mt-2">Feels like: {Math.round(weather.main.feels_like)}°C</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-lg">
              <div className="flex items-center gap-3 mb-3">
                <FiDroplet className="text-2xl text-white/80" />
                <p className="text-lg text-white/70">Humidity</p>
              </div>
              <p className="text-4xl font-bold">{weather.main.humidity}%</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-lg">
              <div className="flex items-center gap-3 mb-3">
                <FiWind className="text-2xl text-white/80" />
                <p className="text-lg text-white/70">Wind Speed</p>
              </div>
              <p className="text-4xl font-bold">{weather.wind.speed} m/s</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-lg">
              <div className="flex items-center gap-3 mb-3">
                <p className="text-lg text-white/70">Weather</p>
              </div>
              <p className="text-2xl font-bold capitalize">{weather.weather[0].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Weather 
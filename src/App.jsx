import { useState } from 'react'
import Weather from './components/Weather'
import './App.css'

function App() {
  const [location, setLocation] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4 md:mb-8">
          Weather Forecast
        </h1>
        <p className="text-white/80 text-center text-lg mb-8">
          Get real-time weather information for any location
        </p>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl">
          <Weather location={location} setLocation={setLocation} />
        </div>
      </div>
    </div>
  )
}

export default App

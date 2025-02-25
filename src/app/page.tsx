"use client";
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Modal from './components/Modal';

interface WeatherData {
  city: string;
  weather: string;
  temperature: number;
  windSpeed: number;
}

const Home: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSearch = async (city: string) => {
    // Primero, obtenemos las coordenadas (latitud y longitud) de la ciudad
    const GEOCODING_API = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
  
    try {
      const geoResponse = await fetch(GEOCODING_API);
      const geoData = await geoResponse.json();
  
      if (geoData.results && geoData.results.length > 0) {
        const { latitude, longitude } = geoData.results[0];
  
        // Luego, obtenemos el clima usando las coordenadas
        const WEATHER_API = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherResponse = await fetch(WEATHER_API);
        const weatherData = await weatherResponse.json();
  
        if (weatherData.current_weather) {
          const newWeatherData: WeatherData = {
            city: city,
            weather: `Código: ${weatherData.current_weather.weathercode}`,
            temperature: weatherData.current_weather.temperature,
            windSpeed: weatherData.current_weather.windspeed,
          };
          setWeatherData((prev) => [...prev, newWeatherData]);
        } else {
          setModalMessage(`No se pudo obtener el clima para "${city}".`);
          setIsModalOpen(true);
        }
      } else {
        setModalMessage(`La ciudad "${city}" no existe.`);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setModalMessage('Hubo un error al buscar el clima. Inténtalo de nuevo.');
      setIsModalOpen(true);
    }
  };

  const handleDelete = (index: number) => {
    setWeatherData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Luis Gerardo Juarez Garcia - A00836928</h1>
        <h1 className="text-2xl font-bold mb-6 text-center">Weather App</h1>
        <div className="flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="mt-4 flex flex-wrap gap-4 justify-center">
          {weatherData.map((data, index) => (
              <WeatherCard
                key={index}
                city={data.city}
                weather={data.weather}
                temperature={data.temperature}
                windSpeed={data.windSpeed}
                onDelete={() => handleDelete(index)}
              />
            ))}
        </div>
        
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message={modalMessage}
        />
      </div>
    </div>
  );
};

export default Home;
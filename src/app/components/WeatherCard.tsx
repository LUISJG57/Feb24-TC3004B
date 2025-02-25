"use client";
import React from 'react';

interface WeatherCardProps {
  city: string;
  weather: string;
  temperature: number;
  windSpeed: number;
  onDelete: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  weather,
  temperature,
  windSpeed,
  onDelete,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md relative w-64">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        ×
      </button>
      <h2 className="text-xl font-bold">{city}</h2>
      <p className="text-gray-600 capitalize">{weather}</p>
      <p className="text-gray-600">Temperatura: {temperature}°C</p>
      <p className="text-gray-600">Viento: {windSpeed} m/s</p>
    </div>
  );
};

export default WeatherCard;
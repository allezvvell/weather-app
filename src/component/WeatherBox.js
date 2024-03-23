import React from 'react';
const WeatherBox = ({weather}) => {
  let tempC = weather && weather.main.temp;
  let tempF = weather && (tempC*1.8 + 32).toFixed(2);

  return (
    <div className='weather-box'>
      <h2 className='city-name'>{weather?.name}</h2>
      <div className='city-temp'>      
        <span className='temp-c'>{weather && tempC}°C</span>
        <span className='temp-f hide'>{weather && tempF}℉</span>
      </div>
      <div className='switch-temp'>
        <input type='checkbox' id='switch-check'/>
        <label htmlFor='switch-check'></label>
      </div>
      <em className='city-sky'>{weather?.weather[0].description}</em>
      <div className='weather-icon'>{weather && <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='날씨아이콘'></img>}</div>
    </div>
  )
}

export default WeatherBox


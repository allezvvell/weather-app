import './App.css';
import { useEffect,useState } from 'react';
import WeatherBox from './component/WeatherBox.js';
import WeatherButton from './component/WeatherButton.js';

function App() {
  const [weather,setWeather] = useState(null);
  const [city,setCity] = useState('');
  const cities = ['new york','berlin','paris','rome','tokyo']; 
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=>{
    let lat = position.coords.latitude; 
    let lon = position.coords.longitude;
    getWeatherByCurrentLocation(lat,lon);
    },getLocationFail);
  }
  const getLocationFail = () => {
    alert('위치 정보를 알 수 없음')
  }
  const getWeatherByCurrentLocation = (lat,lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1288bf9e88a7a07e97258d60b86ab458&units=metric`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
      setWeather(data);
    })
    .catch(console.log)
  }
  const getWeatherByCity = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1288bf9e88a7a07e97258d60b86ab458&units=metric`;
    fetch(url)
    .then((res) => {
      if(!res.ok){
        throw new Error(`${res.status} 에러 발생`)
      }else{
        return res.json()
      }
    })
    .then((data) => {
      setWeather(data);
    })
    .catch((e) => {
      console.log(e);
      alert('정확한 도시명을 입력해주세요');
    })
   
  }
  useEffect(() => {
    //섭씨 화씨 변경 버튼
    const checkBox = document.querySelector('#switch-check');
    function switchTemp(){
      const tempC = document.querySelector('.temp-c');
      const tempF = document.querySelector('.temp-f');
      if(checkBox.checked){
        tempC.classList.add('hide');
        tempF.classList.remove('hide');
      }else{
        tempC.classList.remove('hide');
        tempF.classList.add('hide');
      }
    } 
    checkBox.addEventListener('change',switchTemp);
    //도시명 검색
    const searchForm = document.getElementById('search-form');
    const regex = /^[a-z]+$/;
    searchForm.addEventListener('submit',function(e){
      e.preventDefault();
      const cityName = document.getElementById('search-input').value;
      if(cityName && regex.test(cityName)){
        setCity(cityName)
      }
    })
  });
  useEffect(() => {
    if(city === ''){
      getCurrentLocation();
    }else {
      getWeatherByCity();
    }
  },[city,weather]);
  return (
    <div className='wrapper'>
      <video id="myVideo" autoPlay muted loop>
        <source src="./assets/clouds.mp4" type="video/mp4"/>
      </video>
      <div className='main'>
        <h1>How's the weather today?</h1>
        <WeatherBox weather={weather}/>
        <WeatherButton cities={cities} city={city} setCity={setCity}/>
      </div>
    </div>
  );
}

export default App;

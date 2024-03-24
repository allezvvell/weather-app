import React, { useEffect } from 'react'

const WeatherButton = ({cities,setCity,city}) => {
  useEffect(() => {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('submit',function(e){
      e.preventDefault();
      console.log(this.value)
    })
  },[])
  return (
    <div>
      <div className='search-wrap'>
        <form action='/' id='search-form'>
          <input type='text' id='search-input' placeholder='도시명을 영어로 검색해주세요'/>
        </form>
      </div>
      <div className='button-wrap'>
      <button className={city===''?'active':''} onClick={(e)=>{
        setCity('');
        }}><span>Current<br/>Location</span></button>
      {/* 버튼 리스트 생성 */}
      {cities.map((item,index) => {
        return <button key={index} className={city===item?'active':''} onClick={()=>{
            setCity(item);
        }}><span>{item}</span></button>
      })}
      </div>
    </div>
  )
}
// button key 부분

export default WeatherButton

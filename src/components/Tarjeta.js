import React, { useEffect, useState } from "react";
import axios from 'axios';

const Tarjeta = () => {
  
    const [ weather, setWeather ] = useState({})
    const [isFarhenheit, setIsFarhenheit] = useState(true);
    const [temperature, setTemperature] = useState(0);

    const success = pos => {

       const latitude = pos.coords.latitude;
       const longitude = pos.coords.longitude;
       
       axios.get (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=fcf285ad1187e7cf2dabbeeaaacab337`)
      .then(res =>  { 
                    setWeather(res.data)
                    setTemperature(((res.data.main?.temp -273.15)*9/5)+32);                 
      });
    }
    // console.log(weather);
    
    useEffect(() => {
       navigator.geolocation.getCurrentPosition(success);  //  error, options
       
    }, []);  
  

    const convertTemperature = () => {
      
      if (isFarhenheit) {
        setTemperature(((temperature-32)*5)/ 9);
        setIsFarhenheit(false);
      } else {
        setTemperature(((temperature*9)/5)+32);
        setIsFarhenheit(true);
      }
    };


  return (
    <div className="card" >
       

       <h1>{weather.name}, {weather.sys?.country}</h1> 

          <img src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@4x.png`} alt="" /> 
          
          <h1>{weather.weather?.[0].description}</h1> 
          
          <div>
                <b>Temperature: </b> {temperature.toFixed(1)} {isFarhenheit ? "º Farhenheit" : "º Celsius"}{" "} 
          </div>

        <button onClick={convertTemperature}>
            Convert to {isFarhenheit ?  "Celsius" : "Farhenheit"}
        </button>
      
       <h4><b>Wind speed: </b>{weather.wind?.speed} m/s</h4> 
       <h4><b>Humidity on air: </b>{weather.main?.humidity} %</h4>  
    </div>
  );
}

export default Tarjeta;

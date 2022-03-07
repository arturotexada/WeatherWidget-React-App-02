import React, { useEffect, useState } from "react";
import axios from 'axios';




const Tarjeta = () => {
  
    const [ weather, setWeather ] = useState({})
    const [isFarhenheit, setIsFarhenheit] = useState(true);
    const [temperature, setTemperature] = useState(1);


    const success = pos => {

       const latitude = pos.coords.latitude;
       const longitude = pos.coords.longitude;
       
      
       axios.get (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=fcf285ad1187e7cf2dabbeeaaacab337`)
      .then(res =>  { 
                    setWeather(res.data)
                    
      });
    }
    
  
    useEffect(() => {
       navigator.geolocation.getCurrentPosition(success);  //  error, options
       setTemperature(weather.main?.temp);  
    }, []);  
  

  


    const convertTemperature = () => {
      if (isFarhenheit) {
        setTemperature(((temperature-32)*5)/ 9);
        setIsFarhenheit(false);
      } else {
        setTemperature(((temperature*9)/5)-32);
        setIsFarhenheit(true);
      }
    };


  

  return (
    <div className="card" >
      
      {/* <img src='https://openweathermap.org/img/wn/10d@2x.png' alt="" /> */}
      <h1>{weather.name}, {weather.sys.country}</h1>
       {/* <h3>{weather.sys.country}</h3>  */}
      <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />

      
            <b>Temperature: </b> {temperature} {isFarhenheit ? "Farhenheit" : "Celsius"}{" "}
      
       {/* <h1>{weather.main?.temp}ºF</h1>   */}
      <h1>{weather.weather?.[0].description}</h1> 
      
      <button onClick={convertTemperature}>
          Convert to {isFarhenheit ?  "Celsius" : "Farhenheit"}
      </button>
      
      {/* <h3>Wind speed:{weather.wind.speed} m/s</h3> */}
      <h3>Humidity on air: {weather.main?.humidity} %</h3>
    </div>
  );
}


export default Tarjeta;
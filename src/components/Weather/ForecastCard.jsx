/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UnitContext } from "../Context/UnitContext";

export const ForecastCard = ({ lon, lat }) => {
  const {unit} = useContext(UnitContext)
  const [forecastData, setForecastData] = useState(null);
  const [forecastList, setForecastList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unitString = ['', '&units=metric', '&units=imperial'][unit]
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=526c0f74c869536bf114aa74ba0955dd${unitString}`
      )
      .then((res) => {
        setForecastData(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [lat, lon, unit]);

  useEffect(() => {
    if (forecastData) {
      groupForecast();
    }
  }, [forecastData]);

  const groupForecast = () => {
    const newList = [];
    for (let i = 0; i < forecastData.list.length; i += 8) {
      const slicedList = forecastData.list.slice(i, i + 8);

      const dayIndex = new Date(slicedList[0].dt * 1000).getDay();
      const day = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"][dayIndex];

      const temp = [];
      const weatherObject = {};

      slicedList.forEach((item) => {
        temp.push(item.main.temp);
        weatherObject[item.weather[0].icon] =
          (weatherObject[item.weather[0].icon] || 0) + 1;
      });

      const maxTemp = Math.max(...temp);
      const minTemp = Math.min(...temp);
      const mainWeather = Object.entries(weatherObject).reduce((prev, curr) => {
        return prev[1] > curr[1] ? prev : curr;
      })[0];

      newList.push({ day, maxTemp, minTemp, mainWeather });
    }
    setForecastList(newList);
  };

  return (
    <div className="flex flex-row w-full rounded p-4">
      {!loading &&
        forecastList.map((item, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col items-center justify-center p-2 border-x border-white"
          >
            <p><b>{item.day}</b></p>
            <img src={`https://openweathermap.org/img/wn/${item.mainWeather}.png`} alt={item.mainWeather} />
            <p><b>{item.maxTemp}{["K", "°C", "°F"][unit]}</b></p>
            <p>{item.minTemp}{["K", "°C", "°F"][unit]}</p>
          </div>
        ))}
    </div>
  );
};

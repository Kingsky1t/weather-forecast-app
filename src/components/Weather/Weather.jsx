import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ForecastCard } from "./ForecastCard";
import { images } from "../../assets";
import { ChangeUnit } from "./ChangeUnit";
import { UnitContext } from "../Context/UnitContext";

export const Weather = () => {
  const { unit } = useContext(UnitContext);
  const { state } = useLocation();
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unitString = ["", "&units=metric", "&units=imperial"][unit];
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${state.lat}&lon=${state.lon}&appid=526c0f74c869536bf114aa74ba0955dd${unitString}`
      )
      .then((res) => {
        setWeather(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [state, unit]);

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-br from-cyan-400 to-blue-700">
      <ChangeUnit />
      <div className="flex flex-col w-1/2 p-4 shadow-3xl bg-blue-500 text-white">
        {/* weather  */}
        {loading ? (
          <h1>loading...</h1>
        ) : (
          <div className="flex flex-row justify-evenly my-4 mx-auto w-full ">
            <div className="flex flex-row  items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt=""
              />

              <p className=" font-bold text-5xl text-center">{state.name}</p>

              {/* google location */}
              <div className="self-start">
                <a
                  href={`https://www.google.com/maps/@${state.lat},${state.lon},10z?entry=ttu`}
                  target="_blank"
                >
                  <img
                    src={images.map}
                    alt="location"
                    className="w-6 h-6 m-1"
                  />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-1 ">
              <p className=" text-6xl text-center flex gap-1">
                {weather.main.temp}
                <sup className="text-4xl">{["K", "°C", "°F"][unit]}</sup>
              </p>

              <p className=" text-xl">
                <b>{weather.weather[0].description.toUpperCase()}</b>
              </p>

              <p className=" text-xl flex gap-2 items-center">
                <img src={images.humidity} className="w-6 inline" />
                Humidity: {weather.main.humidity}%
              </p>

              <p className=" text-xl flex gap-2 items-center">
                <img src={images.wind} className="w-6 inline " />
                Wind Speed: {weather.wind.speed} {["m/s", "m/s", "mph"][unit]}
              </p>

              <p className=" text-xl flex gap-2 items-center">
                <img src={images.pressure} className="w-6 inline" />
                Atm. Pressure: {weather.main.pressure} hPa
              </p>
            </div>
          </div>
        )}

        <ForecastCard {...state} />
      </div>
    </div>
  );
};

import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ForecastCard } from "./ForecastCard";
import { images } from "../../assets"

export const Weather = () => {
    const { state } = useLocation();
    const [weather, setWeather] = useState({});
    const [forecast, setForecast] = useState({});

    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    useEffect(() => {
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${state.lat}&lon=${state.lon}&appid=526c0f74c869536bf114aa74ba0955dd&units=metric`
            )
            .then((res) => {
                setWeather(res.data);
                setLoading1(false);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${state.lat}&lon=${state.lon}&appid=526c0f74c869536bf114aa74ba0955dd&units=metric`
            )
            .then((res) => {
                setForecast(res.data);
                setLoading2(false);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className=" flex h-screen justify-center items-center bg-gradient-to-br from-cyan-400 to-blue-700">

            <div className='relative w-4/5 p-4 shadow-3xl'>
                <div className="absolute top-4 right-4 w-12 h-12 bg-white p-2 rounded-full">
                    <a className="" href={`https://www.google.com/maps/@${state.lat},${state.lon},8z?entry=ttu`} target="_blank">

                        <img src={images.map} alt="location" />
                    </a>
                </div>
                {loading1 ? (
                    <h1>loading...</h1>
                ) : (
                    <div id='current-weather' className='flex-col w-1/3 my-4 mx-auto '>
                        <div>
                            <p className="text-white font-bold text-6xl text-center">{state.name}</p>
                        </div>
                        <div className='flex flex-row justify-evenly items-center'>
                            <div className="p-2">
                                <p className="text-white text-4xl ">{weather.main.temp} °C</p>
                            </div>
                            <div className='flex flex-col p-2'>
                                <p className="text-white text-2xl">{weather.weather[0].description.toUpperCase()}</p>
                                <p className="text-white text-2xl">Humidity: {weather.main.humidity}%</p>
                                <p className="text-white text-2xl">Wind Speed: {weather.wind.speed} m/s</p>
                                <p className="text-white text-2xl">Atm. Pressure: {weather.main.pressure} hPa</p>
                            </div>
                        </div>
                    </div>
                )}

                {loading2 ? (
                    <h1>Loading...</h1>
                ) : (
                    <div id="weather-forecast" className='scrollbar flex overflow-x-auto w-full mx-auto px-4 bg-white rounded-md'>
                        {forecast.list.map((item, index) => (
                            <ForecastCard key={index} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

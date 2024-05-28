/* eslint-disable react/prop-types */


export const ForecastCard = ({ item }) => {
    const findTime = () => {
        var hours = parseInt(item.dt_txt.substring(11, 13));
        const ampm = hours > 12 ? "pm" : "am";
        hours %= 12;
        if (hours === 0) {
            hours = 12;
        }
        return hours + " " + ampm;
    };

    const time = findTime(item.dt_txt);
    const dayIndex = new Date(item.dt * 1000).getDay();
    const day = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"][dayIndex];
    // https://www.google.com/maps/@40.7128,-74.006,18z?entry=ttu
    return (
        <div className='flex flex-col m-2 p-2 justify-evenly items-center bg-sky-700'>

            <div><p className="text-white text-2xl">{time}</p></div>
            <div className='flex flex-col justify-evenly items-center'>
                <div><p className="text-white text-xl">{day}</p></div>
                <div>
                    <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt={item.weather[0].description}
                        className='w-full'
                    />
                </div>
                <div className='flex gap-2'>
                    <p className="text-white text-lg">
                        <b>{item.main.temp_max}°C</b>
                    </p>
                    <p className="text-white text-lg">
                        <small>{item.main.temp_min}°C</small>
                    </p>
                </div>
            </div>
        </div>
    );
};

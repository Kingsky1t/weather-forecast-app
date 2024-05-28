import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SearchContext } from "../context";

export const Search = () => {
    const { setSearchedCities } = useContext(SearchContext);
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const res = await axios.get(
                    `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=name%20like%20%22${search}%22`
                );
                setSearchedCities(res.data.results);
            } catch (err) {
                console.error(err);
            }
        }, 1300);
        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    return (
        <div className='py-4 bg-sky-950 flex'>
            <input
            className="m-auto h-10 w-1/3 outline-none text-lg bg-white px-2"
                type='text'
                value={search}
                onChange={(e) => {
                    handleChange(e);
                }}
                placeholder="Search for a city..."
            />
        </div>
    );
};

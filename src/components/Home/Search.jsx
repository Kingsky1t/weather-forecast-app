import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SearchContext } from "../Context/SearchContext";
import { HistoryContext } from "../Context/HistoryContext";
import { Link } from "react-router-dom";

export const Search = () => {
  const { history } = useContext(HistoryContext);
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

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" py-4 flex flex-row w-1/2 mx-auto  items-center">
      <div className="flex-1 flex justify-center">
        <input
          className="rounded m-auto h-10 outline-none text-lg bg-white"
          type="text"
          value={search}
          onChange={(e) => {
            handleChange(e);
          }}
          placeholder="Search for a city..."
        />
      </div>

      <div className="ml-auto">
        <button
          id="dropdownDefaultButton"
          onClick={toggleDropdown}
          className="text-white bg-blue-600 hover:bg-blue-700 text-lg font-bold rounded-lg px-5 py-2.5 text-center inline-flex items-center "
          type="button"
        >
          History{" "}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            id="dropdown"
            className="z-10 bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 absolute mt-2"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              {history.length === 0 ? (
                <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  No history
                </li>
              ) : (
                history.map((item, index) => (
                  <li key={index}>
                    <Link
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      to="/weather"
                      state={{ ...item }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

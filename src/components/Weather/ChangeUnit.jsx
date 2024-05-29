import React, { useContext, useState } from "react";
import { UnitContext } from "../Context/UnitContext";

export const ChangeUnit = () => {
  const { setUnit } = useContext(UnitContext);

  const handleClick = (val) => {
    setUnit(val);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-1/2 my-2 mx-auto flex">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-white bg-blue-600 hover:bg-blue-700 text-lg font-bold rounded-lg px-5 py-2.5 text-center inline-flex items-center "
        type="button"
      >
        Change Unit
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
          className="z-10 bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 absolute mt-14"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li
              onClick={() => handleClick(0)}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Standard (K)
            </li>
            <li
              onClick={() => handleClick(1)}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Metric (°C)
            </li>
            <li
              onClick={() => handleClick(2)}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Imperial (°F)
            </li>
          </ul>
        </div>
      )}

      {/* <select
        defaultValue={1}
        className="bg-sky-500 shadow-3xl text-white p-2"
        onChange={handleChange}
      >
        <option value="0">Standard (K)</option>
        <option value="1">Metric (°C)</option>
        <option value="2">Imperial (°F)</option>
      </select> */}
    </div>
  );
};

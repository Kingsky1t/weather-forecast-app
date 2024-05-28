import React, { useContext } from "react";
import { UnitContext } from "../Context/UnitContext";

export const ChangeUnit = () => {
  const { setUnit } = useContext(UnitContext);

  const handleChange = (e) => {
    setUnit(e.target.value);
  };
  return (
    <div className="w-1/2 my-2 mx-auto flex flex-row-reverse">
      <select
        defaultValue={1}
        className="bg-sky-500 shadow-3xl text-white p-2"
        onChange={handleChange}
      >
        <option value="0">Standard (K)</option>
        <option value="1">Metric (°C)</option>
        <option value="2">Imperial (°F)</option>
      </select>
    </div>
  );
};

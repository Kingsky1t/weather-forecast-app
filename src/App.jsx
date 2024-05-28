import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Weather } from "./components/Weather/Weather";
import {  UnitContextProvider } from "./components/Context/UnitContext";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/weather"
        element={
          <UnitContextProvider>
            <Weather />
          </UnitContextProvider>
        }
      />
    </Routes>
  );
}

export default App;

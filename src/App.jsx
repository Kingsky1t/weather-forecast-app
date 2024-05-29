import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Weather } from "./components/Weather/Weather";
import { UnitContextProvider } from "./components/Context/UnitContext";
import { HistoryContextProvider } from "./components/Context/HistoryContext";

function App() {
  return (
    <HistoryContextProvider>
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
    </HistoryContextProvider>
  );
}

export default App;

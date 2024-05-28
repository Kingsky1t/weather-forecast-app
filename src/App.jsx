import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Weather } from "./components/Weather/Weather";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/weather' element={<Weather />} />
        </Routes>
    );
}

export default App;

// Import utilities
import React from "react";
import {Routes, Route} from "react-router-dom";

// Import pages
import MainPage from "./pages/MainPage";
import ResumePage from "./pages/ResumePage";

function App() {
    return (
        <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='resume' element={<ResumePage/>}/>
        </Routes>
    );
}

export default App;

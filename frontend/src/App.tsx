// Import React from "react";
import {Routes, Route, useLocation} from "react-router-dom";
import 'react-quill/dist/quill.snow.css';

// Import pages & components
import MainPage from "./pages/MainPage";
import ResumePage from "./pages/ResumePage";
import LoginModal from "./components/LoginModal";

function App() {
    const location = useLocation();
    const isLoginRoute = location.pathname =="/login";

    return (
        <div className="relative min-h-screen">

            {/* Your main routes */}
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/resume" element={<ResumePage />} />
            </Routes>

            {/* Conditional Render */}
            {isLoginRoute && <LoginModal />}
            
        </div>
    );
}

export default App;

// Import React from "react";
import {Routes, Route, useLocation} from "react-router-dom";
import 'react-quill/dist/quill.snow.css';

// Import pages & components
import MainPage from "./pages/MainPage";
import ResumePage from "./pages/ResumePage";
import LoginModal from "./components/LoginModal";

// Import Layouts
import MainLayout from './layouts/MainLayout'

function App() {
    const location = useLocation();
    const isLoginRoute = location.pathname =="/login";

    return (
        <div className="relative min-h-screen">

            {/* Your main routes */}
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/resume" element={<ResumePage />} />
                </Route>
            </Routes>

            {/* Conditional Render */}
            {isLoginRoute && <LoginModal />}
            
        </div>
    );
}

export default App;

import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login-Page/LoginPage";
import HomePage  from "./pages/home-page/HomePage";
import RegistrationPage from "./pages/registration-page/RegistrationPage";

function App() {

    // To add a route: Create a new <Route />, Set the path to the URL Address, Set the element to the pages default function. (Peter 07/11/23)   

    return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path ="/register" element={<RegistrationPage />} />
    </Routes>
    )
}

export default App
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login-Page/LoginPage";
import HomePage  from "./pages/homepage/HomePage";

function App() {

    // To add a route: Create a new <Route />, Set the path to the URL Address, Set the element to the pages default function. (Peter 07/11/23)   

    return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
    </Routes>
    )
}

export default App
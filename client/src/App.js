import { Route, Routes } from "react-router-dom";
import LoginPage from "./login-Page/LoginPage";
import HomePage  from "./homepage/HomePage";

function App() {
    return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
    </Routes>
    )
}

export default App
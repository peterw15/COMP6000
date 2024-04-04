import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login-Page/LoginPage";
import HomePage from "./pages/home-page/HomePage";
import RegistrationPage from "./pages/registration-page/RegistrationPage";
import SocietiesPage from "./pages/societies-page/SocietiesPage";
import EventsPage from "./pages/events-page/EventsPage";
import JoinedEvents from "./pages/joinedEvents-page/JoinedEvents";
import CreateEventPage from "./pages/createEvent-page/CreateEventPage";
import SearchPage from "./pages/search-page/searchPage";
import CreateSocietiesPage from "./pages/createSocieties-page/CreateSocietiesPage";
import SocietyPage from "./pages/society-Page/SocietyPage";
import ManageEvents from "./pages/manageEvents-page/ManageEvents";
import ManageSocietiesPage from "./pages/manageSocieties-page/ManageSocietiesPage";
import JoinedSocietiesPage from "./pages/joinedSocieties-page/JoinedSocieties";


function App() {

    // To add a route: Create a new <Route />, Set the path to the URL Address, Set the element to the pages default function. (Peter 07/11/23)   

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/societies" element={<SocietiesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/joinedevents" element={<JoinedEvents />} />
            <Route path="/createevent" element={<CreateEventPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/createSocieties" element={<CreateSocietiesPage />} />
            <Route path="/society" element={<SocietyPage />} />
            <Route path="/manageevents" element={<ManageEvents />} />
            <Route path="/manageSocieties" element={<ManageSocietiesPage />} />
            <Route path="/joinedSocieties" element={<JoinedSocietiesPage />} />
        </Routes>
    )
}

export default App
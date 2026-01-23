import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ChatBot from "./components/ChatBot";
import TripPlanPage from "./pages/TripPlanPage";
import TripLoading from "./pages/TripLoading";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chatbot" element={<ChatBot/>}/>
        <Route path="/plan" element={<TripPlanPage/>}/>
        <Route path="/loading" element={<TripLoading/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

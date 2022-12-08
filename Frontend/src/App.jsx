import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import Home from "./pages/Home";
import OTPinput from "./pages/OTPinput";
import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/userContext.jsx";

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/new-user" element={<CreateUser />} />
                <Route path="/home" element={<Home />} />
                <Route path="/enterOtp" element={<OTPinput />} />
            </Routes>
        </UserContextProvider>
    );
}

export default App;

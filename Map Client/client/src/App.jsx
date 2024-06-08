import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import About from "./pages/about";
import Verify from "./pages/verify";
import Map from "./pages/map";
import Header from "./components/header";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}

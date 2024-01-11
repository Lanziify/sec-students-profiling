import React from "react";
import { Route, Routes } from "react-router-dom";
import Protected from "./routes/Protected";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Public from "./routes/Public";
import Register from "./pages/Register";
import Records from "./pages/Records";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import ChangePassword from "./pages/ChangePassword";
import About from "./pages/About";
import Hero from "./pages/Hero";

function App() {
  return (
    <Routes>
      <Route element={<Protected />}>
        <Route path="form" index element={<Home />} />
        <Route path="records" element={<Records />} />
        <Route path="settings" element={<Settings />} />
        <Route path="settings/change_password" element={<ChangePassword />} />
        <Route path="records/student/:lrn" element={<Profile />} />
      </Route>

      <Route element={<Public />}>
        <Route path="" index element={<Hero />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

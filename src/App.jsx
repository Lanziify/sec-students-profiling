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

function App() {
  return (
    <Routes>
      <Route element={<Protected />}>
        <Route path="" index element={<Home />} />
        <Route path="records" element={<Records />} />
        <Route path="records/student/:lrn" element={<Profile />} />
      </Route>

      <Route element={<Public />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

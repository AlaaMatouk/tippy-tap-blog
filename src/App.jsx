import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MyPosts from "./pages/MyPosts";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import AddPost from "./pages/AddPost";
import LoginAndRegister from "./pages/LoginAndRegister";
import Favourite from "./pages/Favourite";
import Post from "./pages/Post";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];
  return (
    <>
      <div>
        {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginAndRegister />} />
          <Route path="register" element={<Register />} />
          <Route path="my-posts" element={<MyPosts />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="favorites" element={<Favourite />} />
          <Route path="/edit-post/:id" element={<AddPost isEdit={true} />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

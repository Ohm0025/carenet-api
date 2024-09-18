import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Header />
          <div
            style={{ maxWidth: "1000px", margin: "0 auto", minWidth: "320px" }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email/:token" element={<VerifyEmail />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;

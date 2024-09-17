// src/pages/Register.js
import React, { useState } from "react";
import { Box, Button, Input, VStack } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      // Show error message to user
    }
  };

  return (
    <Box maxWidth="400px" margin="auto">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Register</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;

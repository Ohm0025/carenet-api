// src/pages/Register.js
import React, { useState } from "react";
import { Box, Button, Input, VStack, useToast, Image } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" paddingTop={8}>
      <Image
        src="../../public/vite.png"
        alt="carenet-icon"
        boxSize="200px"
        objectFit="cover"
        marginX={"auto"}
      />
      <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
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

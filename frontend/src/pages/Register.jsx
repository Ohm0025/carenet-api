// src/pages/Register.js
import React, { useState } from "react";
import { Box, Button, VStack, Image } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useToastContext } from "../contexts/ToastContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();
  const showToast = useToastContext();

  const validateError = async () => {
    const errorObj = {
      username: "",
      email: "",
      password: "",
    };
    if (!username) {
      errorObj.username = "Username is required.";
    } else {
      errorObj.username = "";
    }
    if (!email) {
      errorObj.email = "Email is required.";
    } else {
      errorObj.email = "";
    }
    if (!password) {
      errorObj.password = "Password is required.";
    } else {
      errorObj.password = "";
    }
    if (errorObj.username || errorObj.email || errorObj.password) {
      setErrors(() => {
        return { ...errorObj };
      });
      showToast(
        "Register Failed",
        errorObj.username + "\n" + errorObj.email + "\n" + errorObj.password,
        "error"
      );
    } else {
      setErrors(() => {
        return {};
      });
      try {
        await register(username, email, password);
        showToast("Register Successful", "Congraturation", "success");
        navigate("/login");
      } catch (error) {
        showToast("Register Failed", error.response?.data?.error, "error");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateError();
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
          <FormInput
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isInvalid={!!errors.username}
            errorMessage={errors.username}
          />
          <FormInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
            errorMessage={errors.email}
          />
          <FormInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors.password}
            errorMessage={errors.password}
          />

          <Button type="submit">Register</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;

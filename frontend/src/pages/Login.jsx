import React, { useEffect, useState } from "react";
import { Box, Button, VStack, Image } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToastContext } from "../contexts/ToastContext";
import FormInput from "../components/FormInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();
  const showToast = useToastContext();

  const validateError = async () => {
    const errorObj = {
      email: "",
      password: "",
    };
    if (!email) {
      errorObj.email = "Email is required";
    } else {
      errorObj.email = "";
    }
    if (!password) {
      errorObj.password = "Password is required";
    } else {
      errorObj.password = "";
    }
    if (errorObj.email || errorObj.password) {
      setErrors(() => {
        return { ...errorObj };
      });
      showToast(
        "Login Failed",
        errorObj.email + "\n" + errorObj.password,
        "error"
      );
    } else {
      setErrors(() => {
        return {};
      });
      try {
        await login(email, password);
        showToast("Login Successful", "Welcome back!", "success");
        navigate("/");
      } catch (error) {
        console.error("Login failed:", error);
        showToast("Login Failed", error.response?.data?.message, "error");
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
          <Button type="submit">Login</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;

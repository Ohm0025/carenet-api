import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { verifyEmail } from "../utils/api";

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);
        setIsVerified(true);
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        console.error("Verification failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    verify();
  }, [token, navigate]);

  if (isLoading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={4}>Verifying your email...</Text>
      </Box>
    );
  }

  return (
    <Box textAlign="center" mt={10}>
      <Heading>
        {isVerified ? "Email Verified Successfully!" : "Verification Failed"}
      </Heading>
      <Text mt={4}>
        {isVerified
          ? "You can now log in to your account. Redirecting to login page..."
          : "There was an error verifying your email. Please try again or contact support."}
      </Text>
    </Box>
  );
};

export default VerifyEmail;

import { Box, Flex, Button, Heading } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Box bg="green.500" px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        color={"white"}
      >
        <Heading as={"h1"} size="lg" letterSpacing={"0.1rem"}>
          <Link to="/">CareNet</Link>
        </Heading>
        <Flex>
          {user ? (
            <>
              <Button
                as={Link}
                to="/create-post"
                mr={4}
                w={{ base: "70px", md: "100px", lg: "120px" }}
                fontSize={{ base: "0.7rem", md: "1rem" }}
              >
                Create Post
              </Button>
              <Button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                w={{ base: "70px", md: "100px", lg: "120px" }}
                fontSize={{ base: "0.7rem", md: "1rem" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                as={Link}
                to="/login"
                mr={4}
                w={{ base: "70px", md: "100px", lg: "120px" }}
                fontSize={{ base: "0.7rem", md: "1rem" }}
              >
                Login
              </Button>
              <Button
                as={Link}
                to="/register"
                w={{ base: "70px", md: "100px", lg: "120px" }}
                fontSize={{ base: "0.7rem", md: "1rem" }}
              >
                Register
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;

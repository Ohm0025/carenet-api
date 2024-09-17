import { Box, Flex, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <Box bg="gray.100" px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Heading as={"h1"} size="lg">
          <Link to="/">BlogSite</Link>
        </Heading>
        <Flex>
          {user ? (
            <>
              <Button as={Link} to="/create-post" mr={4}>
                Create Post
              </Button>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button as={Link} to="/login" mr={4}>
                Login
              </Button>
              <Button as={Link} to="/register">
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

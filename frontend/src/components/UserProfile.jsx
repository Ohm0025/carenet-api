import { Box, Heading, Text, VStack, Button, HStack } from "@chakra-ui/react";
import useLoginAlert from "./AlertLogin";
import { useAuth } from "../contexts/AuthContext";

const UserProfile = ({ user }) => {
  const { LoginAlertModal, showLoginAlert } = useLoginAlert();
  const { user_self } = useAuth();
  const onSubscribe = () => {
    if (!user_self) {
      return showLoginAlert();
    }
  };
  return (
    <>
      <Box borderWidth={"1px"} borderRadius={"lg"} p={4}>
        <VStack align={"start"} spacing={4}>
          <HStack justifyContent={"space-between"} w={"full"}>
            <Heading size={"md"}>{user.username}</Heading>
            <Button onClick={() => onSubscribe(user._id)}>Subscribe</Button>
          </HStack>
          <Text>{user.bio}</Text>
        </VStack>
      </Box>
      <LoginAlertModal />
    </>
  );
};

export default UserProfile;

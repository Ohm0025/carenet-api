import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  HStack,
  Flex,
} from "@chakra-ui/react";
import useLoginAlert from "./AlertLogin";
import { useAuth } from "../contexts/AuthContext";
import UserAvatar from "./UserAvatar";
import { subscribeUser } from "../utils/api";

const UserProfile = ({ user }) => {
  const { LoginAlertModal, showLoginAlert } = useLoginAlert();
  const { user: user_self, updateUser } = useAuth();
  const onSubscribe = async (targetId) => {
    if (!user_self) {
      return showLoginAlert();
    }
    await subscribeUser(targetId);
    updateUser("subscribers", [...user_self["subscribers"], targetId]);
  };
  console.log(user);
  console.log(user_self);
  return (
    <>
      <Box borderWidth={"1px"} borderRadius={"lg"} p={4}>
        <VStack align={"start"} spacing={4}>
          <HStack justifyContent={"space-between"} w={"full"}>
            <Flex align={"center"} gap={4}>
              <UserAvatar name={user.username} src={user.avatarUrl} />
              <Heading size={"md"}>{user.username}</Heading>
            </Flex>
            <Button onClick={() => onSubscribe(user._id)}>
              {user_self.subscribers?.includes(user._id)
                ? "Unscribe"
                : "Subscribe"}
            </Button>
          </HStack>
          <Text>{user.bio}</Text>
        </VStack>
      </Box>
      <LoginAlertModal />
    </>
  );
};

export default UserProfile;

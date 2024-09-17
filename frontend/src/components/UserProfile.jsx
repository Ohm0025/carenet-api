import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";

const UserProfile = ({ user, onSubscribe }) => {
  return (
    <Box borderWidth={"1px"} borderRadius={"lg"} p={4}>
      <VStack align={"start"} spacing={4}>
        <Heading size={"md"}>{user.username}</Heading>
        <Text>{user.bio}</Text>
        <Button onClick={() => onSubscribe(user._id)}>Subscribe</Button>
      </VStack>
    </Box>
  );
};

export default UserProfile;

import {
  Box,
  Heading,
  Flex,
  Text,
  VStack,
  Button,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaHeart, FaBookmark, FaShare, FaStar } from "react-icons/fa";

const UserProfile = ({ user, onSubscribe, post }) => {
  return (
    <Box borderWidth={"1px"} borderRadius={"lg"} p={4}>
      <VStack align={"start"} spacing={4}>
        <HStack justifyContent={"space-between"} w={"full"}>
          <Heading size={"md"}>{user.username}</Heading>
          <Button onClick={() => onSubscribe(user._id)}>Subscribe</Button>
        </HStack>
        <Text>{user.bio}</Text>
      </VStack>
    </Box>
  );
};

export default UserProfile;

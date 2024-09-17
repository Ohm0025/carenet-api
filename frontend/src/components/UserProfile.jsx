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
        <Flex mt={4} justify={"space-between"} align={"center"}>
          <Flex>
            <Button
              leftIcon={<Icon as={FaHeart} />}
              onClick={() => onLike(post._id)}
              mr={2}
            >
              {post.likes.length}
            </Button>
            <Button
              leftIcon={<Icon as={FaBookmark} />}
              onClick={() => onSave(post._id)}
              mr={2}
            >
              Save
            </Button>
            <Button
              leftIcon={<Icon as={FaShare} />}
              onClick={() => onShare(post._id)}
            >
              Share
            </Button>
          </Flex>
        </Flex>
      </VStack>
    </Box>
  );
};

export default UserProfile;

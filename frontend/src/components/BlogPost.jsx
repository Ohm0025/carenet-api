import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaHeart, FaBookmark, FaShare, FaStar } from "react-icons/fa";

const BlogPost = ({ post, onLike, onSave, onShare, onRate }) => {
  return (
    <Box
      borderWidth={"1px"}
      borderRadius={"lg"}
      overflow={"hidden"}
      p={4}
      mb={4}
    >
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        align={"center"}
        gap={{ base: "10px", md: "0px" }}
        justifyContent={"space-between"}
      >
        <Heading
          as={"h2"}
          fontSize={{ base: "1rem", md: "1.5rem", lg: "2rem" }}
        >
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </Heading>

        <Flex align={"center"}>
          <Text mr={2}>Rate:</Text>
          {[1, 2, 3, 4, 5].map((rating) => (
            <Icon
              key={rating}
              as={FaStar}
              color={rating <= post.rating ? "yellow.500" : "gray.300"}
            />
          ))}
        </Flex>
      </Flex>

      <Flex mt={4} justify={"space-between"} align={"center"}>
        <Text>By: {post.author.username}</Text>
        <Badge colorScheme={post.isPublic ? "green" : "red"}>
          {post.isPublic ? "Public" : "Private"}
        </Badge>
      </Flex>
    </Box>
  );
};

export default BlogPost;

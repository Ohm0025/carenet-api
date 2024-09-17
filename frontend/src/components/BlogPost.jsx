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
      <Heading as={"h2"} size={"xl"}>
        <Link to={`/post/${post._id}`}>{post.title}</Link>
      </Heading>
      <Text mt={2}>{post.excerpt}</Text>
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
        <Flex align={"center"}>
          <Text mr={2}>Rate:</Text>
          {[1, 2, 3, 4, 5].map((rating) => (
            <Icon
              key={rating}
              as={FaStar}
              color={rating <= post.rating ? "yellow.500" : "gray.300"}
              onClick={() => onRate(post._id, rating)}
              cursor={"pointer"}
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

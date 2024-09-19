import { Flex, Button, Icon, Text } from "@chakra-ui/react";
import { FaBookmark, FaShare, FaStar } from "react-icons/fa";
import { ratePost } from "../utils/api";
import useLoginAlert from "./AlertLogin";
import { useAuth } from "../contexts/AuthContext";

const PostButton = ({ post }) => {
  const { user } = useAuth();

  const { LoginAlertModal, showLoginAlert } = useLoginAlert();

  const onLike = async (postId) => {
    if (!user) {
      return showLoginAlert();
    }
    await likePost(postId);
    fetchPosts();
  };

  const onShare = (postId) => {
    if (!user) {
      return showLoginAlert();
    }
    console.log("share post ", postId);
  };

  const onRate = async (postId, rating) => {
    if (!user) {
      return showLoginAlert();
    }
    await ratePost(postId, rating);
    fetchPosts();
  };

  return (
    <>
      <Flex mt={4} justify={"space-between"} align={"center"}>
        <Flex>
          <Button
            leftIcon={<Icon as={FaBookmark} />}
            onClick={() => onLike(post._id)}
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
        <Flex align="center">
          <Text mr={2}>Rate:</Text>
          {[1, 2, 3, 4, 5].map((rating) => (
            <Icon
              key={rating}
              as={FaStar}
              color={rating <= post.rating ? "yellow.500" : "gray.300"}
              onClick={() => onRate(post._id, rating)}
              cursor="pointer"
            />
          ))}
        </Flex>
      </Flex>
      <LoginAlertModal />
    </>
  );
};

export default PostButton;

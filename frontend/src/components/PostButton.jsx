import { Flex, Button, Icon, Text } from "@chakra-ui/react";
import { FaBookmark, FaShare, FaStar } from "react-icons/fa";
import useLoginAlert from "./AlertLogin";
import { useAuth } from "../contexts/AuthContext";
import { likePost, ratePost } from "../utils/api";
import { useState } from "react";

const PostButton = ({ post, fetchPost }) => {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(
    user ? post.likes?.includes(user._id) : false
  );

  const { LoginAlertModal, showLoginAlert } = useLoginAlert();

  const onLike = async (postId) => {
    if (!user) {
      return showLoginAlert();
    }
    await likePost(postId);
    setIsSaved((prev) => !prev);
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
    await fetchPost();
  };

  return (
    <>
      <Flex mt={4} justify={"space-between"} align={"center"}>
        <Flex>
          <Button
            color={isSaved && "white"}
            bg={isSaved && "green.500"}
            leftIcon={<Icon as={FaBookmark} />}
            onClick={() => onLike(post._id)}
            mr={2}
          >
            {isSaved ? "Unsave" : "Save"}
          </Button>
          <Button
            leftIcon={<Icon as={FaShare} />}
            onClick={() => onShare(post._id)}
          >
            Share
          </Button>
        </Flex>
        <Flex align="center" flexDirection={"column"}>
          <Text mr={2}>you rated this post :</Text>

          <Flex>
            {[1, 2, 3, 4, 5].map((rating) => (
              <Icon
                key={rating}
                as={FaStar}
                color={
                  user &&
                  rating <=
                    post.ratingArr?.find((e) => e.user === user._id).value
                    ? "yellow.500"
                    : "gray.300"
                }
                onClick={() => onRate(post._id, rating)}
                cursor="pointer"
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
      <LoginAlertModal />
    </>
  );
};

export default PostButton;

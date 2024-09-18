import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Heading, HStack, Text, VStack, Box } from "@chakra-ui/react";
import DonationForm from "../components/DonationForm";
import UserProfile from "../components/UserProfile";
import { getPost, donateToAuthor } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import RichTextEditor from "../components/RichTextEditor";
import FormatContent from "../components/FormatContent";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useAuth();

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    const fetchedPost = await getPost(id);
    setPost(fetchedPost);
  };

  const handleDonate = async (amount, paymentMethod) => {
    await donateToAuthor(post.author._id, amount, paymentMethod);
    // Show success message to user
  };

  if (!post) return <div>Loading...</div>;

  return (
    <VStack spacing={8} align="stretch" padding={5}>
      {isEdit ? (
        <Box>
          <VStack spacing={4}>
            <RichTextEditor
              editedPost={post}
              closeEdit={() => {
                setIsEdit(false);
                fetchPost();
              }}
            />
          </VStack>
        </Box>
      ) : (
        <>
          {" "}
          <HStack justifyContent={"space-between"}>
            <Heading fontSize={{ base: "1rem", md: "1.5rem", lg: "2rem" }}>
              {post.title}
            </Heading>
            {user && user._id === post.author?._id && (
              <Button onClick={() => setIsEdit(true)}>Edit</Button>
            )}
          </HStack>
          <FormatContent content={post.content} />
          <UserProfile user={post.author} post={post} />
          <DonationForm onDonate={handleDonate} />
        </>
      )}
    </VStack>
  );
};

export default PostDetail;

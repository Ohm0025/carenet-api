import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heading, Text, VStack } from "@chakra-ui/react";
import DonationForm from "../components/DonationForm";
import UserProfile from "../components/UserProfile";
import { getPost, donateToAuthor } from "../utils/api";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

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
      <Heading>{post.title}</Heading>
      <Text dangerouslySetInnerHTML={{ __html: post.content }}></Text>

      <UserProfile user={post.author} post={post} />
      <DonationForm onDonate={handleDonate} />
    </VStack>
  );
};

export default PostDetail;

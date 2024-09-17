import React, { useEffect, useState } from "react";
import { VStack, Heading } from "@chakra-ui/react";
import BlogPost from "../components/BlogPost";
import Advertisement from "../components/Advertisement";
import {
  getPosts,
  likePost,
  savePost,
  sharePost,
  ratePost,
} from "../utils/api";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const fetchPosts = await getPosts();
    setPosts(fetchPosts);
  };

  const handleLike = async (postId) => {
    await likePost(postId);
    fetchPosts();
  };

  const handleSave = async (postId) => {
    await savePost(postId);
  };

  const handleShare = (postId) => {
    sharePost(postId);
  };

  const handleRate = async (postId, rating) => {
    await ratePost(postId, rating);
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <VStack spacing={8} align={"stretch"} paddingX={6}>
      <Heading fontSize={"1.5rem"} mt={8} ml={5}>
        Latest Posts
      </Heading>
      {posts.map((post, index) => (
        <React.Fragment key={post._id}>
          <BlogPost
            post={post}
            onLike={handleLike}
            onSave={handleSave}
            onShare={handleShare}
            onRate={handleRate}
          />
          {index % 5 === 4 && <Advertisement adCode={<>google ads</>} />}
        </React.Fragment>
      ))}
    </VStack>
  );
};

export default Home;

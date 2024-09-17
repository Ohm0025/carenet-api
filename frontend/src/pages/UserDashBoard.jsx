import React, { useEffect, useState } from "react";
import { VStack, Heading, Text, Button } from "@chakra-ui/react";
import BlogPost from "../components/BlogPost";
import { getUserPosts, getUserStats } from "../utils/api";

const UserDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const [fetchedPosts, fetchedStats] = await Promise.all([
      getUserPosts(),
      getUserStats(),
    ]);
    setPosts(fetchedPosts);
    setStats(fetchedStats);
  };

  return (
    <VStack spacing={8} align="stretch">
      <Heading>Your Dashboard</Heading>
      {stats && (
        <VStack align="start">
          <Text>Total Posts: {stats.totalPosts}</Text>
          <Text>Total Likes: {stats.totalLikes}</Text>
          <Text>Total Subscribers: {stats.totalSubscribers}</Text>
        </VStack>
      )}
      <Button as={Link} to="/create-post">
        Create New Post
      </Button>
      <Heading size="md">Your Posts</Heading>
      {posts.map((post) => (
        <BlogPost key={post._id} post={post} />
      ))}
    </VStack>
  );
};

export default UserDashboard;

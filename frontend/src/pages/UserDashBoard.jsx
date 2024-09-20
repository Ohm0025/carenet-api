import React, { useEffect, useState } from "react";
import { VStack, Heading, Text, Button } from "@chakra-ui/react";
import BlogPost from "../components/BlogPost";
import { getUserPosts, getUserStats } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ProfilePictureEditor from "../components/ProfilePictureEditor";

const UserDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

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
    <VStack spacing={8} align="stretch" padding={5}>
      <Heading>Your Dashboard</Heading>
      {stats && (
        <VStack align="start">
          <ProfilePictureEditor />
          <Text>Total Posts: {stats.totalPosts}</Text>
          <Text>Total Likes: {stats.totalLikes}</Text>
          <Text>Total Subscribers: {stats.totalSubscribers}</Text>
        </VStack>
      )}

      <Button
        onClick={async () => {
          await logout();
          navigate("/login");
        }}
        fontSize={{ base: "0.7rem", md: "1rem" }}
      >
        Logout
      </Button>
      <Heading size="md">Your Posts</Heading>
      {posts.map((post) => (
        <BlogPost key={post._id} post={post} />
      ))}
    </VStack>
  );
};

export default UserDashboard;

import React, { useEffect, useState } from "react";
import { VStack, Heading, Text, Button } from "@chakra-ui/react";
import BlogPost from "../components/BlogPost";
import { getUserPosts, getUserStats } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ProfilePictureEditor from "../components/ProfilePictureEditor";
import { useToastContext } from "../contexts/ToastContext";
import SpinnerMod from "../components/Spinner";

const UserDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState(null);
  const { user, updateUser, logout, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const showToast = useToastContext();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [fetchedPosts, fetchedStats] = await Promise.all([
        getUserPosts(),
        getUserStats(),
      ]);
      setPosts(fetchedPosts);
      setStats(fetchedStats);
    } catch (err) {
      showToast("Fail to fetch user", err.message || "please login", "error");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) {
    return <SpinnerMod />;
  }

  return (
    <VStack spacing={8} align="stretch" padding={5}>
      <Heading>Your Dashboard</Heading>
      {stats && (
        <VStack align="start">
          <ProfilePictureEditor
            currentAvatarUrl={user.avatarUrl}
            onUpdate={(value) => updateUser("avatarUrl", value)}
          />
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

import React, { useEffect, useState } from "react";
import { VStack, Heading } from "@chakra-ui/react";
import BlogPost from "../components/BlogPost";
import Advertisement from "../components/Advertisement";
import { getPosts } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import SpinnerMod from "../components/Spinner";
import { useToastContext } from "../contexts/ToastContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { loading, setLoading } = useAuth();
  const showToast = useToastContext();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const fetchPosts = await getPosts();
      setPosts(fetchPosts);
    } catch (err) {
      showToast(
        "Fail to fetch post",
        err.message || "fetch post error",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <SpinnerMod />;
  return (
    <VStack spacing={8} align={"stretch"} paddingX={6}>
      <Heading fontSize={"1.5rem"} mt={8} ml={5}>
        Latest Posts
      </Heading>
      {posts.map((post, index) => (
        <React.Fragment key={post._id}>
          <BlogPost post={post} />
          {index % 5 === 4 && <Advertisement adCode={<>google ads</>} />}
        </React.Fragment>
      ))}
    </VStack>
  );
};

export default Home;

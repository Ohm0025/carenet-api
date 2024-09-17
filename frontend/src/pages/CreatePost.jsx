import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import RichTextEditor from "../components/RichTextEditor";
import { createPost } from "../utils/api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const newPost = await createPost({ title, content, isPublic });
    navigate(`/post/${newPost._id}`);
  };

  return (
    <Box>
      <VStack spacing={4}>
        <Input
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <RichTextEditor value={content} onChange={setContent} />
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="is-public" mb="0">
            Make post public?
          </FormLabel>
          <Switch
            id="is-public"
            isChecked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </FormControl>
        <Button onClick={handleSubmit}>Publish</Button>
      </VStack>
    </Box>
  );
};

export default CreatePost;

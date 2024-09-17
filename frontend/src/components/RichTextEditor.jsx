import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quill.css";
import {
  Box,
  Button,
  VStack,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { createPost } from "../utils/api";

const PostEditor = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const newPost = await createPost({ title, content, isPublic });
    navigate(`/post/${newPost._id}`);
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      boxShadow="lg"
      bg="white"
      w={"full"}
      margin="auto"
      mt={8}
    >
      <VStack spacing={6} align="stretch">
        <Heading as="h2" size="xl" textAlign="center" color="green.500">
          Create New Post
        </Heading>

        <FormControl>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            size="lg"
            focusBorderColor="green.400"
          />
        </FormControl>

        <Box
          className="quill-editor"
          borderWidth="1px"
          borderRadius="md"
          overflow="hidden"
        >
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
          />
        </Box>
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

        <Button
          colorScheme="green"
          size="lg"
          onClick={handleSubmit}
          isDisabled={!title || !content}
        >
          Submit Post
        </Button>
      </VStack>
    </Box>
  );
};

export default PostEditor;

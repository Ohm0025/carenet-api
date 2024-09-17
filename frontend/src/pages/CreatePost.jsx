import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import RichTextEditor from "../components/RichTextEditor";

const CreatePost = () => {
  return (
    <Box>
      <VStack spacing={4}>
        <RichTextEditor />
      </VStack>
    </Box>
  );
};

export default CreatePost;

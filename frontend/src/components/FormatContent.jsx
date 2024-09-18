import React from "react";
import DOMPurify from "dompurify";
import { Box } from "@chakra-ui/react";

const FormatContent = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  });
  return (
    <Box
      className="formatted-content"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      sx={{
        "& > *:first-of-type": { marginTop: 0 },
        "& > *:last-child": { marginBottom: 0 },
        "& p": { marginBottom: "1em" },
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          marginTop: "1.5em",
          marginBottom: "0.5em",
        },
        "& ul, & ol": { paddingLeft: "2em", marginBottom: "1em" },
        "& li": { marginBottom: "0.5em" },
        "& pre": {
          backgroundColor: "gray.100",
          padding: "1em",
          borderRadius: "md",
          overflowX: "auto",
          marginBottom: "1em",
        },
        "& code": {
          fontFamily: "monospace",
          backgroundColor: "gray.100",
          padding: "0.2em 0.4em",
          borderRadius: "sm",
        },
        "& blockquote": {
          borderLeft: "4px solid",
          borderColor: "gray.300",
          paddingLeft: "1em",
          fontStyle: "italic",
          marginBottom: "1em",
        },
        "& img": { maxWidth: "100%", height: "auto", marginBottom: "1em" },
        "& table": {
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "1em",
        },
        "& th, & td": {
          border: "1px solid",
          borderColor: "gray.300",
          padding: "0.5em",
        },
        "& th": { backgroundColor: "gray.100" },
      }}
    />
  );
};

export default FormatContent;

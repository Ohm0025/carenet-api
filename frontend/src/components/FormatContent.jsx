import React from "react";
import DOMPurify from "dompurify";
import { Box, Heading } from "@chakra-ui/react";

const FormattedContent = ({ content }) => {
  const sanitizeConfig = {
    ALLOWED_TAGS: [
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "br",
      "strong",
      "em",
      "u",
      "ol",
      "ul",
      "li",
      "a",
      "img",
      "blockquote",
      "code",
      "pre",
      "hr",
    ],
    ALLOWED_ATTR: ["href", "src", "alt"],
  };

  const sanitizedContent = DOMPurify.sanitize(content, sanitizeConfig);

  const createMarkup = () => ({ __html: sanitizedContent });

  return (
    <Box
      className="formatted-content"
      dangerouslySetInnerHTML={createMarkup()}
      sx={{
        "& > *:first-of-type": { marginTop: 0 },
        "& > *:last-child": { marginBottom: 0 },
        "& p": { marginBottom: "1em" },
        "& h1": {
          fontSize: "2rem",
          fontWeight: "bold",
          marginTop: "1.5em",
          marginBottom: "0.5em",
        },
        "& h2": {
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginTop: "1.5em",
          marginBottom: "0.5em",
        },
        "& h3": {
          fontSize: "lg",
          fontWeight: "bold",
          marginTop: "1.5em",
          marginBottom: "0.5em",
        },
        "& h4": {
          fontSize: "md",
          fontWeight: "bold",
          marginTop: "1.5em",
          marginBottom: "0.5em",
        },
        "& h5": {
          fontSize: "sm",
          fontWeight: "bold",
          marginTop: "1.5em",
          marginBottom: "0.5em",
        },
        "& h6": {
          fontSize: "xs",
          fontWeight: "bold",
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
        "& a": { color: "blue.500", textDecoration: "underline" },
      }}
    />
  );
};

export default FormattedContent;

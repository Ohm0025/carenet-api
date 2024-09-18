import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box } from "@chakra-ui/react";

const MediumStyleEditor = ({ value, onChange }) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const quillRef = useRef(null);

  useEffect(() => {
    const handleSelection = () => {
      const selection = quillRef.current.getEditor().getSelection();
      setShowToolbar(!!selection && selection.length > 0);
    };

    const quill = quillRef.current.getEditor();
    quill.on("selection-change", handleSelection);

    return () => {
      quill.off("selection-change", handleSelection);
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic"],
        ["link", "blockquote"],
        [{ header: 1 }, { header: 2 }],
        ["clean"],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = ["bold", "italic", "link", "blockquote", "header", "clean"];

  return (
    <Box position="relative">
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        theme="snow"
      />
      <Box
        className="ql-toolbar ql-snow"
        position="absolute"
        top="-40px"
        left="50%"
        transform="translateX(-50%)"
        backgroundColor="white"
        boxShadow="md"
        borderRadius="md"
        transition="opacity 0.3s"
        opacity={showToolbar ? 1 : 0}
        pointerEvents={showToolbar ? "auto" : "none"}
        zIndex={1000}
      />
      <style jsx global>{`
        .ql-toolbar.ql-snow {
          border: none;
          padding: 8px;
        }
        .ql-container.ql-snow {
          border: none;
        }
        .ql-editor {
          padding: 20px 0;
        }
      `}</style>
    </Box>
  );
};

export default MediumStyleEditor;

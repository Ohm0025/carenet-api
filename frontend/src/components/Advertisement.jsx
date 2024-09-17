import { Box } from "@chakra-ui/react";

const Advertisement = ({ adCode }) => {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: adCode }}
      borderWidth={"1px"}
      borderRadius={"lg"}
      p={4}
      my={4}
    ></Box>
  );
};

export default Advertisement;

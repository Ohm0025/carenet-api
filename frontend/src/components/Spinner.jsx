import { Flex, Spinner } from "@chakra-ui/react";

const SpinnerMod = () => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      minH={"80vh"}
    >
      <Spinner size="xl" color="green.500" />
    </Flex>
  );
};

export default SpinnerMod;

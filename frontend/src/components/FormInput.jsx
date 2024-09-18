import { Input, FormControl, FormErrorMessage } from "@chakra-ui/react";

const FormInput = ({ isInvalid, errorMessage, ...props }) => {
  return (
    <FormControl>
      <Input
        {...props}
        borderColor={isInvalid ? "red.500" : "inherit"}
        _hover={{ borderColor: isInvalid ? "red.500" : "inherit" }}
        _focus={{ borderColor: isInvalid ? "red.500" : "blue.500" }}
      ></Input>
      {isInvalid && (
        <div
          style={{
            fontSize: "12px",
            color: "red",
            paddingLeft: "10px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          {errorMessage}
        </div>
      )}
    </FormControl>
  );
};

export default FormInput;

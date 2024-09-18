import { createContext, useContext } from "react";
import { useToast } from "@chakra-ui/react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toast = useToast();

  const showToast = (title, description, status = "info") => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };
  return (
    <ToastContext.Provider value={showToast}>{children}</ToastContext.Provider>
  );
};

export const useToastContext = () => useContext(ToastContext);

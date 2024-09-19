import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const useLoginAlert = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const LoginAlertModal = () => (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login Required</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Please log in to access this feature.</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              navigate("/login");
              onClose();
            }}
          >
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
  return { LoginAlertModal, showLoginAlert: onOpen };
};

export default useLoginAlert;

import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Input,
  Avatar,
} from "@chakra-ui/react";
import Cropper from "react-easy-crop";
import { updateProfilePicture } from "../utils/api";

const ProfilePictureEditor = ({ currentAvatarUrl, onUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImage(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      onOpen();
    }
  };

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (err) => reject(err));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const handleSave = async () => {
    try {
      if (!croppedAreaPixels) return;

      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      const formData = new FormData();
      formData.append("profilePicture", croppedImage, "profile.jpg");

      const response = await updateProfilePicture(formData);
      onUpdate(response.avatarUrl);
      onClose();
    } catch (err) {
      console.error("Error updating profile picture: ", err);
    }
  };

  return (
    <>
      <VStack spacing={4} align="center">
        <Avatar size="2xl" src={currentAvatarUrl} />
        <Button as="label" htmlFor="profile-picture-upload" colorScheme="green">
          Change Profile Picture
          <Input
            id="profile-picture-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </Button>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crop Profile Picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box position="relative" height="400px">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePictureEditor;

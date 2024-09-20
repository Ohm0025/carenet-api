import { Avatar } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

const UserAvatar = ({ name, src }) => {
  return <Avatar name={name} src={src} size="md" borderRadius="full" />;
};

export default UserAvatar;

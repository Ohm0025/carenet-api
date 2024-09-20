import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";

const ProfileButton = ({ user }) => {
  const navigate = useNavigate();
  return (
    <Button
      bg={"none"}
      borderRadius={"full"}
      w={"10"}
      onClick={() => {
        navigate("/dashboard");
      }}
    >
      <UserAvatar name={user.username} src={user.avatarUrl} />
    </Button>
  );
};

export default ProfileButton;

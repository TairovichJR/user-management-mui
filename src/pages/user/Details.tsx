// src/components/UserDetails.tsx
import {Box} from "@mui/material";
import UserForm from "../../components/UserForm";

const UserDetailPage = () => {
  return (
    <Box display="flex" gap={3}>
      <UserForm formType="editUser" />
    </Box>
  );
};

export default UserDetailPage;

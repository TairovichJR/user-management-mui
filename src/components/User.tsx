import {
  Avatar,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { IUser } from "../model";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import {
  toggleUserRowCheckbox,
  deleteUserById,
  openSnackbar,
  setSnackbarText,
} from "../app/features/userSlice";
import MoreVert from "@mui/icons-material/MoreVert";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomDialog from "./CustomDialog";

interface UserItemProps {
  user: IUser;
  onEdit: () => void;
}

const User = ({ user, onEdit }: UserItemProps) => {
  const isUserSelected =
    useSelector((state: RootState) => state.users.selectedUserIds).indexOf(
      user.id
    ) !== -1;
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [delModal, setDelModal] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    dispatch(toggleUserRowCheckbox(id));
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteUserById(user.id));
    dispatch(setSnackbarText("Delete Success!"));
    dispatch(openSnackbar());
    setDelModal(false);
  };

  const handleDeleteButtonClick = () => {
    setDelModal(true);
    setAnchorEl(null);
  };

  return (
    <>
      <TableRow key={user.id}>
        <TableCell sx={{ width: "10px" }}>
          <Checkbox
            checked={isUserSelected}
            onChange={(e) => handleCheckboxChange(e, user.id)}
          />
        </TableCell>
        <TableCell
          sx={{
            display: "flex",
            justifyContent: "start",
            gap: 2,
            alignItems: "center",
            alignContent: "center",
          }}
        >

          <Avatar alt={user.name} src={user.imgSource} />
          <Box component="div">
            <Typography
              component={Link}
              to={`/users/${user.id}/edit`}
              sx={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {user.name}
            </Typography>
            <Typography
              component="div"
              sx={{ color: "#919eab", fontSize: "14px" }}
            >
              {user.email}
            </Typography>
          </Box>
        </TableCell>
        <TableCell>{user.phoneNumber}</TableCell>
        <TableCell>{user.company}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>{user.status}</TableCell>
        <TableCell>
          <Tooltip title="Quick Edit">
            <IconButton onClick={onEdit}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <IconButton
            onClick={(event: React.MouseEvent<HTMLElement>) =>
              setAnchorEl(event.currentTarget)
            }
          >
            <MoreVert />
          </IconButton>
          <Menu
            id="menu-actions"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleDeleteButtonClick} sx={{ color: "red" }}>
              <Delete fontSize="small" sx={{ marginRight: 1 }} /> Delete
            </MenuItem>
            <MenuItem onClick={(e) => navigate(`/users/${user.id}/edit`)}>
              <Edit fontSize="small" sx={{ marginRight: 1 }} /> Edit
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
      <CustomDialog
        open={delModal}
        onClose={() => setDelModal(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default User;

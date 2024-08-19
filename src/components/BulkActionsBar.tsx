import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Typography,
} from "@mui/material";
import {
  deleteUsersByIds,
  toggleHeaderCheckbox,
  openSnackbar,
  setSnackbarText,
} from "../app/features/userSlice";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "./CustomDialog";
import { AppDispatch } from "../app/store";
import { useState } from "react";

interface BulkActionsBarProps {
  selectedUsersCount: number;
  sortedUsersCount: number;
}

const BulkActionsBar = ({
  selectedUsersCount,
  sortedUsersCount,
}: BulkActionsBarProps) => {
  
  const [delModal, setDelModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteConfirm = () => {
    handleDeleteSelectedUsers();
    dispatch(setSnackbarText("Delete Success!"));
    dispatch(openSnackbar());
    setDelModal(false);
  };

  const handleHeaderCheckboxChange = () => {
    dispatch(toggleHeaderCheckbox());
  };

  const handleDeleteSelectedUsers = () => {
    dispatch(deleteUsersByIds());
  };

  return (
    <>
      <DeleteDialog
        open={delModal}
        onClose={() => setDelModal(false)}
        onConfirm={handleDeleteConfirm}
      />
      <TableHead sx={{}}>
        <TableRow
          sx={{ borderBottom: "1px solid gray", backgroundColor: "#c8fad6" }}
        >
          <TableCell sx={{ border: "none" }}>
            <Checkbox
              indeterminate={
                selectedUsersCount > 0 && selectedUsersCount < sortedUsersCount
              }
              checked={
                selectedUsersCount !== 0 &&
                selectedUsersCount === sortedUsersCount
              }
              onChange={handleHeaderCheckboxChange}
            />
          </TableCell>
          <TableCell sx={{ border: "none" }}>
            <Typography>{selectedUsersCount} selected</Typography>
          </TableCell>
          <TableCell sx={{ border: "none" }}></TableCell>
          <TableCell sx={{ border: "none" }}></TableCell>
          <TableCell sx={{ border: "none" }}></TableCell>
          <TableCell sx={{ border: "none" }}></TableCell>
          <TableCell sx={{ border: "none" }}>
            <DeleteIcon
              sx={{ color: "green", cursor: "pointer" }}
              onClick={() => setDelModal(true)}
            />
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  );
};

export default BulkActionsBar;

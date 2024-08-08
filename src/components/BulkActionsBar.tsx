import { TableHead, TableRow, TableCell, Checkbox, Typography } from '@mui/material'
import { deleteSelectedUsers, toggleHeaderCheckbox, openDialog, closeDialog } from '../app/features/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import DeleteDialog from './DeleteDialog';
import { RootState } from '../app/store';

interface BulkActionsBarProps{
    selectedUsersCount: number;
    filteredUsersCount: number; 
}

const BulkActionsBar = ({selectedUsersCount, filteredUsersCount} : BulkActionsBarProps) => {

    const dispatch = useDispatch();

    const dialog = useSelector((state:RootState) => state.users.dialogOpen);

    const handleDeleteButtonClick = () => {
      dispatch(openDialog());
    };
  
    const handleDeleteDialogClose = () => {
        dispatch(closeDialog());
    };
  
    const handleDeleteConfirm = () => {
        handleDeleteSelectedUsers();
        dispatch(closeDialog());
    };

    const handleHeaderCheckboxChange = () => {
        dispatch(toggleHeaderCheckbox());
    }

    const handleDeleteSelectedUsers = () => {
        dispatch(deleteSelectedUsers());

    }

  return (
    <>  
    <DeleteDialog
        open={dialog}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirm}
    />
    <TableHead sx={{}}>
        <TableRow sx={{borderBottom:'1px solid gray', backgroundColor:'#c8fad6'}}>
            <TableCell sx={{border:'none'}}>
                <Checkbox  
                indeterminate={selectedUsersCount > 0 && selectedUsersCount < filteredUsersCount}
                checked={selectedUsersCount !== 0 && selectedUsersCount === filteredUsersCount}
                onChange={handleHeaderCheckboxChange}/>
            </TableCell>
            <TableCell sx={{border:'none'}}>
                <Typography>{selectedUsersCount} selected</Typography>
            </TableCell>
            <TableCell sx={{border:'none'}}></TableCell>
            <TableCell sx={{border:'none'}}></TableCell>
            <TableCell sx={{border:'none'}}></TableCell>
            <TableCell sx={{border:'none'}}></TableCell>
            <TableCell sx={{border:'none'}}>
                <DeleteIcon sx={{color: 'green', cursor: 'pointer'}} onClick={handleDeleteButtonClick}/>
            </TableCell>
        </TableRow>
    </TableHead>
    </>
    
  )
}

export default BulkActionsBar
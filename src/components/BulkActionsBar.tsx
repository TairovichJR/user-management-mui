import { TableHead, TableRow, TableCell, Checkbox, Typography } from '@mui/material'
import { deleteUsersByIds, toggleHeaderCheckbox, openDialog, closeDialog, openSnackbar, setSnackbarText } from '../app/features/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from './CustomDialog';
import { AppDispatch, RootState } from '../app/store';

interface BulkActionsBarProps{
    selectedUsersCount: number;
    sortedUsersCount: number; 
}

const BulkActionsBar = ({selectedUsersCount, sortedUsersCount} : BulkActionsBarProps) => {

    const dispatch = useDispatch<AppDispatch>();

    const dialog = useSelector((state:RootState) => state.users.dialog);

    const handleDeleteButtonClick = () => {
      dispatch(openDialog());
    };
  
    const handleDeleteDialogClose = () => {
        dispatch(closeDialog());
    };
  
    const handleDeleteConfirm = () => {
        handleDeleteSelectedUsers();
        dispatch(closeDialog());
        dispatch(setSnackbarText('Delete Success!'));
        dispatch(openSnackbar());
    };

    const handleHeaderCheckboxChange = () => {
        dispatch(toggleHeaderCheckbox());
    }

    const handleDeleteSelectedUsers = () => {
        dispatch(deleteUsersByIds());
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
                indeterminate={selectedUsersCount > 0 && selectedUsersCount < sortedUsersCount}
                checked={selectedUsersCount !== 0 && selectedUsersCount === sortedUsersCount}
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

export default BulkActionsBar;
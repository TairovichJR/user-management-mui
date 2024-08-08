import { TableHead, TableRow, TableCell, Checkbox } from '@mui/material'
import { useDispatch } from 'react-redux';
import { toggleHeaderCheckbox } from '../app/features/userSlice';

interface UserTableHeaderProps{
    selectedUsersCount: number;
    filteredUsersCount: number; 
}

const UserTableHeader = ({selectedUsersCount, filteredUsersCount} : UserTableHeaderProps) => {

    const dispatch = useDispatch();

    const handleHeaderCheckboxChange = () => {
        dispatch(toggleHeaderCheckbox());
    }

  return (
    <TableHead>
        <TableRow sx={{backgroundColor: 'rgb(145 158 171 / 20%)'}}>
            <TableCell sx={{ width: '10px' }}>
                <Checkbox 
                    indeterminate={selectedUsersCount > 0 && selectedUsersCount < filteredUsersCount}
                    checked={selectedUsersCount !== 0 && selectedUsersCount === filteredUsersCount}
                    onChange={handleHeaderCheckboxChange} 
                />
            </TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Name</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Phone Number</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Company</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Role</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Status</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}></TableCell>
        </TableRow>
    </TableHead>
  )
}

export default UserTableHeader

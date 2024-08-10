import { TableHead, TableRow, TableCell, Checkbox, Box } from '@mui/material'
import { useDispatch } from 'react-redux';
import { toggleHeaderCheckbox } from '../app/features/userSlice';
import { IUser } from '../model';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

interface UserTableHeaderProps{
    selectedUsersCount: number;
    sortedUsersCount: number; 
    requestSort: (key: keyof IUser) => void;
    sortConfig: { key: keyof IUser; direction: 'asc' | 'desc' } | null;
}

const UserTableHeader = ({selectedUsersCount, sortedUsersCount, requestSort, sortConfig} : UserTableHeaderProps) => {

    const dispatch = useDispatch();

    const handleHeaderCheckboxChange = () => {
        dispatch(toggleHeaderCheckbox());
    }

  return (
    <TableHead>
        <TableRow sx={{backgroundColor: 'rgb(145 158 171 / 20%)'}}>
            <TableCell sx={{ width: '10px', cursor: 'pointer' }}>
                <Checkbox 
                    indeterminate={selectedUsersCount > 0 && selectedUsersCount < sortedUsersCount}
                    checked={selectedUsersCount !== 0 && selectedUsersCount === sortedUsersCount}
                    onChange={handleHeaderCheckboxChange} 
                />
            </TableCell>
            <TableCell onClick={e=> requestSort('name')}  
                sx={{fontWeight: 'bold', cursor: 'pointer'}}>
                <Box display='flex' gap={1}>
                    Name
                    {sortConfig?.key === 'name' ? 
                    (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />) : null}
                </Box>    
            </TableCell>
            <TableCell onClick={e=> requestSort('phoneNumber')} sx={{fontWeight: 'bold', cursor: 'pointer'}}>
                <Box display='flex' gap={1}>
                    Phone Number
                    {sortConfig?.key === 'phoneNumber' ? 
                    (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />) : null}
                </Box>
            </TableCell>
            <TableCell onClick={e=> requestSort('company')} sx={{fontWeight: 'bold', cursor: 'pointer'}}>
            <Box display='flex' gap={1}>
                    Company
                    {sortConfig?.key === 'company' ? 
                    (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />) : null}
                </Box>
            </TableCell>
            <TableCell onClick={e=> requestSort('role')} sx={{fontWeight: 'bold', cursor: 'pointer'}}>
            <Box display='flex' gap={1}>
                    Role
                    {sortConfig?.key === 'role' ? 
                    (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />) : null}
                </Box>
            </TableCell>
            <TableCell onClick={e=> requestSort('status')} sx={{fontWeight: 'bold', cursor: 'pointer'}}>
                <Box display='flex' gap={1}>
                    Status
                    {sortConfig?.key === 'status' ? 
                    (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />) : null}
                </Box>
            </TableCell>
            <TableCell sx={{fontWeight: 'bold'}}></TableCell>
        </TableRow>
    </TableHead>
  )
}

export default UserTableHeader

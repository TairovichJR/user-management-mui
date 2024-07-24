// src/components/UserTable.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper } from '@mui/material';
import { useUsers } from '../context/UsersContext';
import UserItem from './UserItem';


interface UserTableProps {
    
}

const UserTable: React.FC<UserTableProps> = () => {

  const{filteredUsers} = useUsers();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{backgroundColor: 'rgb(145 158 171 / 20%)'}}>
            <TableCell sx={{ width: '10px' }}><Checkbox /></TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Name</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Phone Number</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Company</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Role</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredUsers.map((user) => (
            <UserItem user={user} key={user.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;

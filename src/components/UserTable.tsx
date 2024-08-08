// src/components/UserTable.tsx
import React from 'react';
import { Table, TableBody, TableContainer, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import UserRow from './UserRow';
import { RootState } from '../app/store';
import BulkActionsBar from './BulkActionsBar';
import UserTableHeader from './UserTableHeader';
import EditModal from './ModalEdit';

interface UserTableProps {
  setSnackbarOpen : (value: boolean) => void
}

const UserTable: React.FC<UserTableProps> = ({setSnackbarOpen}) => {

  const filteredUsers = useSelector((state: RootState) => state.users.filteredUsers);
  const selectedUserIds = useSelector((state: RootState) => state.users.selectedUserIds);

  return (
    <TableContainer component={Paper}>
      <Table>
        {selectedUserIds.length === 0 && 
            <UserTableHeader 
                selectedUsersCount={selectedUserIds.length} 
                filteredUsersCount={filteredUsers.length} 

              />}
        {selectedUserIds.length > 0 && 
            <BulkActionsBar 
                selectedUsersCount={selectedUserIds.length} 
                filteredUsersCount={filteredUsers.length}

              />}
        <TableBody>
          {filteredUsers.map((user) => (
            <UserRow setSnackbarOpen={setSnackbarOpen}  user={user} key={user.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;

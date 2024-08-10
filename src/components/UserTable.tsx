// src/components/UserTable.tsx
import React, { useMemo, useState } from 'react';
import { Table, TableBody, TableContainer, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import UserRow from './UserRow';
import { RootState } from '../app/store';
import BulkActionsBar from './BulkActionsBar';
import UserTableHeader from './UserTableHeader';
import { IUser } from '../model';

const UserTable: React.FC = () => {

  const filteredUsers = useSelector((state: RootState) => state.users.filteredUsers);
  const selectedUserIds = useSelector((state: RootState) => state.users.selectedUserIds);
  const [sortConfig, setSortConfig] = useState<{ key: keyof IUser; direction: 'asc' | 'desc' } | null>({
    key: 'name',
    direction: 'asc'
  });

  const sortedUsers = useMemo(() => {
    console.log('use memo called');
    let sortableUsers = [...filteredUsers];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [filteredUsers, sortConfig]);

  const requestSort = (key: keyof IUser) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        {selectedUserIds.length === 0 && 
            <UserTableHeader 
                selectedUsersCount={selectedUserIds.length} 
                sortedUsersCount={sortedUsers.length} 
                requestSort={requestSort}
                sortConfig={sortConfig}
              />}
        {selectedUserIds.length > 0 && 
            <BulkActionsBar 
                selectedUsersCount={selectedUserIds.length} 
                sortedUsersCount={sortedUsers.length}

              />}
        <TableBody>
          {sortedUsers.map((user) => (
            <UserRow user={user} key={user.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;

// src/components/UserTable.tsx
import React, { useMemo, useState } from 'react';
import { Table, TableBody, TableContainer, Paper, TableRow, TableCell, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import UserRow from './UserRow';
import { RootState } from '../app/store';
import BulkActionsBar from './BulkActionsBar';
import UserTableHeader from './UserTableHeader';
import { IUser } from '../model';
import CustomPagination from './CustomPagination';


const UserTable: React.FC = () => {

  const filteredUsers = useSelector((state: RootState) => state.users.filteredUsers);
  const selectedUserIds = useSelector((state: RootState) => state.users.selectedUserIds);
  const [sortConfig, setSortConfig] = useState<{ key: keyof IUser; direction: 'asc' | 'desc' } | null>({
    key: 'name',
    direction: 'asc'
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const sortedUsers = useMemo(() => {
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

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedUsers = useMemo(() => {
    return sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sortedUsers, page, rowsPerPage]);

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
        <TableBody sx={{height: '390px'}}>
          {paginatedUsers.map((user) => (
            <UserRow user={user} key={user.id} />
          ))}
          
          {paginatedUsers.length === 0 && (
            <TableRow >
              <TableCell colSpan={7} sx={{ p: 2, bgcolor: 'rgb(145 158 171 / 4%)' }}>
                <div style={{  display: 'flex', flexDirection:'column', 
                  justifyContent: 'center', alignItems: 'center'}}>
                  <img src={require('../assets/images/no-data.svg').default} alt="No data" />
                  <Typography component="h6">No Data</Typography>
                </div>
                
              </TableCell>
            </TableRow>
          )}
         
        </TableBody>
      </Table>
      <CustomPagination
        count={sortedUsers.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default UserTable;

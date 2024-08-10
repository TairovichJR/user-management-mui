// src/components/CustomPagination.tsx
import { TablePagination } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

interface CustomPaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CustomPagination = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange
}: CustomPaginationProps) => {

  

  return (
    <Box padding={1} display="flex" justifyContent="end" alignItems="center" alignContent="center">
      <TablePagination
        sx={{border: 'none'}}
        count={count}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default CustomPagination;

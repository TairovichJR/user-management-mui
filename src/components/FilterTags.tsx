// src/components/FilterTags.tsx
import React from 'react';
import { Box } from "@mui/system";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { Button, Chip, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { setTab, toggleRole, setSearchKey, resetAllFilters, setIsFilterOn } from '../app/features/userSlice';

// Custom styled chip component
const CustomChip = styled(Chip)(({ theme }) => ({
  borderRadius: 5, // Set border radius to 5
  backgroundColor: 'rgb(145 158 171 / 16%)',
  fontSize: '16px',
  color: 'black',
  '& .MuiChip-label': {
    padding: '0 10px',
  },
}));

const FilterTags = () => {
  const dispatch = useDispatch();
  
  const { tab, filteredUsers, toggledRoles, searchKey } = useSelector((state: RootState) => state.users);
  const isFilterOn = useSelector((state: RootState) => setIsFilterOn(state.users));

  return (
    <Box component="div">
      {isFilterOn && (
        <>
          <Typography>{` ${filteredUsers.length} results found`}</Typography>
          <Box my={2} display="flex" justifyContent="start" gap={2}>
            {tab !== 'all' && (
              <Box display='flex' alignItems='center' gap={1} component="section" sx={{ border: '1px dashed rgb(145 158 171 / 20%)', borderRadius: '8px', padding: 1 }}>
                <Typography>Status: </Typography>
                <CustomChip
                  label={tab}
                  deleteIcon={<CloseIcon />}
                  onDelete={() => dispatch(setTab('all'))}
                />
              </Box>
            )}
            {toggledRoles.length > 0 && (
              <Box display='flex' alignItems='center' gap={1} component="section" sx={{ border: '1px dashed rgb(145 158 171 / 20%)', borderRadius: '8px', padding: 1 }}>
                <Typography>Role: </Typography>
                {toggledRoles.map((role, index) => (
                  <CustomChip
                    key={index}
                    label={role}
                    deleteIcon={<CloseIcon />}
                    onDelete={() => dispatch(toggleRole(role))}
                  />
                ))}
              </Box>
            )}
            {searchKey.trim().length > 0 && (
              <Box display='flex' alignItems='center' gap={1} component="section" sx={{ border: '1px dashed rgb(145 158 171 / 20%)', borderRadius: '8px', padding: 1 }}>
                <Typography>Keyword: </Typography>
                <CustomChip
                  label={searchKey}
                  deleteIcon={<CloseIcon />}
                  onDelete={() => dispatch(setSearchKey(''))}
                />
              </Box>
            )}
            <Box display='flex' alignItems='center' gap={1} component="section" sx={{ padding: 1 }}>
              <Button
                onClick={() => dispatch(resetAllFilters())}
                startIcon={<DeleteIcon />}
                sx={{
                  backgroundColor: 'white',
                  color: 'rgb(255, 87, 34)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                  },
                  borderRadius: '8px',
                }}
              >
                Clear
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

export default FilterTags;

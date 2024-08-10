// src/components/UserFilters.tsx
import React from 'react';
import { TextField, Box, Select, MenuItem, Checkbox, ListItemText, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { toggleRole, setSearchKey } from '../app/features/userSlice';

const UserFilters: React.FC = () => {
  const dispatch = useDispatch();
  const searchKey = useSelector((state: RootState) => state.users.searchKey);
  const toggledRoles = useSelector((state: RootState) => state.users.toggledRoles);
  const roleValues = useSelector((state: RootState) => state.users.roleValues);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    const newRoles = value.filter((role) => !toggledRoles.includes(role));
    const removedRoles = toggledRoles.filter((role) => !value.includes(role));

    newRoles.forEach(role => dispatch(toggleRole(role)));
    removedRoles.forEach(role => dispatch(toggleRole(role)));
  };

  const handleSearchBarInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value.trim().toLowerCase();
    dispatch(setSearchKey(value));
  }

  return (
    <Box my={2} display="flex" justifyContent="space-between">
      <Box display="flex" alignItems="center" gap={2} width="100%">
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Role</InputLabel>
          <Select
            multiple
            value={toggledRoles}
            onChange={handleChange}
            renderValue={(selected) => {
              const selectedRoles = selected as string[];
              const displayValue = selectedRoles.join(', ');
              return displayValue.length > 20 ? `${displayValue.slice(0, 17)}...` : displayValue;
            }}
          >
            {roleValues.map((role, index) => (
              <MenuItem key={index} value={role}>
                <Checkbox checked={toggledRoles.indexOf(role) > -1} />
                <ListItemText primary={role} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          value={searchKey}
          label="Search by Username"
          onChange={handleSearchBarInput}
          sx={{ flexGrow: 1 }}
        />
      </Box>
    </Box>
  );
};

export default UserFilters;

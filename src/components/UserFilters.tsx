// src/components/UserFilters.tsx
import React from 'react';
import { TextField, Box, Select, MenuItem, Checkbox, ListItemText, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import { useUsers } from '../context/UsersContext';

interface UserFiltersProps {}

const UserFilters: React.FC<UserFiltersProps> = () => {

  const { setSearchKey, addRoles, roles, allUserRoles, searchKey } = useUsers();

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    const newRoles = value.filter((role) => !roles.includes(role));
    const removedRoles = roles.filter((role) => !value.includes(role));

    newRoles.forEach(role => addRoles(role));
    removedRoles.forEach(role => addRoles(role));
  };

  const handleSearchBarInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value.trim().toLowerCase();
    setSearchKey(value);
  }

  return (
    <Box display="flex" alignItems="center" gap={2} width="100%">
      <FormControl sx={{ width: 200 }}>
        <InputLabel>Role</InputLabel>
        <Select
          multiple
          value={roles}
          onChange={handleChange}
          renderValue={(selected) => {
            const selectedRoles = selected as string[];
            const displayValue = selectedRoles.join(', ');
            return displayValue.length > 20 ? `${displayValue.slice(0, 17)}...` : displayValue;
          }}
        >
          {allUserRoles.map((role, index) => (
            <MenuItem key={index} value={role}>
              <Checkbox checked={roles.indexOf(role) > -1} />
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
  );
};

export default UserFilters;

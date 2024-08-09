import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Paper, Select, SelectChangeEvent, styled, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { getUserDetails, openSnackbar, setSnackbarText, updateUserDetails } from '../app/features/userSlice';

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px'
});

interface EditModalProps {
  modal: boolean;
  setModal: (value: boolean) => void;
  userId: number;
}

const ModalEdit = ({ modal, setModal, userId }: EditModalProps) => {
  const [status, setStatus] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');

  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    phoneNumber: false,
    country: false,
    state: false,
    city: false,
    address: false,
    zip: false,
    company: false,
    role: false
  });

  const { userDetails } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetails(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userDetails) {
      setStatus(userDetails.status);
      setFullName(userDetails.name);
      setEmail(userDetails.email);
      setPhoneNumber(userDetails.phoneNumber);
      setCountry(userDetails.country);
      setState(userDetails.state);
      setCity(userDetails.city);
      setAddress(userDetails.address);
      setZip(userDetails.zip);
      setCompany(userDetails.company);
      setRole(userDetails.role);
    }
  }, [userDetails]);

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleSaveChanges = () => {
    const updatedUser = {
      id: userId,
      status,
      name: fullName,
      email,
      phoneNumber,
      country,
      state,
      city,
      address,
      zip,
      company,
      role
    };

    const newErrors = {
      fullName: !fullName.trim(),
      email: !email.trim(),
      phoneNumber: !phoneNumber.trim(),
      country: !country.trim(),
      state: !state.trim(),
      city: !city.trim(),
      address: !address.trim(),
      zip: !zip.trim(),
      company: !company.trim(),
      role: !role.trim()
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error);

    if (!hasErrors) {
      dispatch(updateUserDetails({ id: userId, user: updatedUser }));
      setModal(false);
      dispatch(setSnackbarText('Update Success!'));
      dispatch(openSnackbar());
    }
  };

  return (
    <StyledModal
      open={modal}
      onClose={e => setModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box component={Paper} p={5} width="740px">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Quick Update
        </Typography>

        <Box sx={{ marginTop: 2, marginBottom: 3 }}>
          <FormControl sx={{ width: 200 }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native" sx={{ paddingLeft: '15px' }}>
              Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={(e:SelectChangeEvent) => setStatus(e.target.value)}
            >
              <MenuItem value='Active'>Active</MenuItem>
              <MenuItem value='Pending'>Pending</MenuItem>
              <MenuItem value='Banned'>Banned</MenuItem>
              <MenuItem value='Rejected'>Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box component="div" display="flex" justifyContent="space-between">
          <TextField id="fullname" label="Full name" variant="outlined" value={fullName} error={errors.fullName} helperText={errors.fullName && "Full name is required"} onChange={(e) => setFullName(e.target.value)} sx={{ minWidth: '49%' }} />
          <TextField id="email" label="Email address" variant="outlined" value={email} error={errors.email} helperText={errors.email && "Email is required"} onChange={(e) => setEmail(e.target.value)} sx={{ minWidth: '49%' }} />
        </Box>

        <Box display="flex" gap={2} alignItems="center" mt={3}>
          <TextField id="phonenumber" label="Phone number" variant="outlined" value={phoneNumber} error={errors.phoneNumber} helperText={errors.phoneNumber && "Phone number is required"} onChange={(e) => setPhoneNumber(e.target.value)} sx={{ minWidth: '49%' }} />
          <TextField id="country" label="Country" variant="outlined" value={country} error={errors.country} helperText={errors.country && "Country is required"} onChange={(e) => setCountry(e.target.value)} sx={{ minWidth: '49%' }} />
        </Box>

        <Box display="flex" gap={2} alignItems="center" mt={3}>
          <TextField id="state" label="State/region" variant="outlined" value={state} error={errors.state} helperText={errors.state && "State is required"} onChange={(e) => setState(e.target.value)} sx={{ minWidth: '49%' }} />
          <TextField id="city" label="City" variant="outlined" value={city} error={errors.city} helperText={errors.city && "City is required"} onChange={(e) => setCity(e.target.value)} sx={{ minWidth: '49%' }} />
        </Box>

        <Box display="flex" gap={2} alignItems="center" mt={3}>
          <TextField id="address" label="Address" variant="outlined" value={address} error={errors.address} helperText={errors.address && "Address is required"} onChange={(e) => setAddress(e.target.value)} sx={{ minWidth: '49%' }} />
          <TextField id="zip" label="Zip/code" variant="outlined" value={zip} error={errors.zip} helperText={errors.zip && "Zip code is required"} onChange={(e) => setZip(e.target.value)} sx={{ minWidth: '49%' }} />
        </Box>

        <Box display="flex" gap={2} alignItems="center" mt={3}>
          <TextField id="company" label="Company" variant="outlined" value={company} error={errors.company} helperText={errors.company && "Company is required"} onChange={(e) => setCompany(e.target.value)} sx={{ minWidth: '49%' }} />
          <TextField id="role" label="Role" variant="outlined" value={role} error={errors.role} helperText={errors.role && "Role is required"} onChange={(e) => setRole(e.target.value)} sx={{ minWidth: '49%' }} />
        </Box>

        <Box display="flex" gap={2} justifyContent={'flex-end'} mt={3}>
          <Button variant='outlined' sx={{ mt: '20px' }} onClick={() => setModal(false)}>Cancel</Button>
          <Button variant='contained' sx={{ mt: '20px' }} onClick={handleSaveChanges}>Update</Button>
        </Box>
      </Box>
    </StyledModal>
  );
}

export default ModalEdit;

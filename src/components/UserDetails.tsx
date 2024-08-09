// src/components/UserDetails.tsx
import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Paper, Switch, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, openSnackbar, setSnackbarText, updateUserDetails } from '../app/features/userSlice';
import { RootState, AppDispatch } from '../app/store';


const UserDetails = () => {

  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userDetails, userDetailsLoading, userDetailsError } = useSelector((state: RootState) => state.users);

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

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(parseInt(id)));
    }
  }, [dispatch, id]);

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

  const handleSaveChanges = () => {
    const updatedUser = {
      id: parseInt(id as string),
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
      dispatch(updateUserDetails({ id: parseInt(id as string), user: updatedUser }));
      navigate('/');
      dispatch(setSnackbarText('Update Success!'));
      dispatch(openSnackbar());
    }
  };

  if (userDetailsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" sx={{ marginLeft: 2 }}>Loading...</Typography>
      </Box>
    );
  }

  if (userDetailsError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" sx={{ color: 'red' }}>{userDetailsError}</Typography>
      </Box>
    );
  }

  if (!userDetails) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">User not found</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" gap={3}>
      <Box component={Paper} flex="1" display="flex" flexDirection="column" justifyContent="center" alignItems="center"
        sx={{ paddingTop: 9, paddingLeft: 3, paddingRight: 3, paddingBottom: 6, position: 'relative' }}>
        <Typography component='span' sx={{
          position: 'absolute', top: 15, right: 15, padding: 1, backgroundColor: 'pink',
          borderRadius: '8px'
        }}>
          {userDetails.status}
        </Typography>
        <img src={userDetails.imgSource} alt={userDetails.name} style={{ width: '150px', height: '150px', borderRadius: '50%' }} />

        <Typography component="h6" sx={{ width: '180px', fontSize: '12px', textAlign: 'center', marginTop: '20px' }}>
          Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3 Mb
        </Typography>

        <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
          marginBottom: 4
        }}>
          <Box component="div">
            <Typography>Banned</Typography>
            <Typography>Apple disable account</Typography>
          </Box>
          <Box component="div">
            <Switch aria-label='Disable Account' />
          </Box>
        </Box>
        <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
          marginBottom: 4
        }}>
          <div>
            <Typography>Email verified</Typography>
            <Typography>Disabling this will automatically send the user a verification email</Typography>
          </div>
          <Switch aria-label='Email Verified' />
        </Box>

        <Button variant='contained' sx={{
          backgroundColor: 'rgb(255 244 229)', color: '#B71D18',
          '&:hover': {
            backgroundColor: 'rgb(255 86 48 / 32%)',
            color: '#b71d18'
          }, fontSize: '12px', fontWeight: 'bold'
        }}>Delete User</Button>

      </Box>

      <Box component={Paper} flex="2" p={2} width="740px">
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

        <Button variant='contained' sx={{ mt: '20px' }} onClick={handleSaveChanges}>Save changes</Button>
      </Box>
    </Box>
  );
};

export default UserDetails;

import React, { ReactNode, useEffect, useState } from 'react';
import { Paper, TextField, Button, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserDetails, updateUserDetails, setSnackbarText, openSnackbar, createUser } from '../app/features/userSlice';
import { AppDispatch, RootState } from '../app/store';
import Loading from './Loading';
import UserProfile from './UserProfile';
import { IUser } from '../model';

interface UserFormProps {
  formType: 'createUser' | 'editUser' | 'quickEdit';
  userId?: number;  // Optional prop to differentiate between create and edit
  onCloseModal? : () => void;
}

const UserForm = ({ formType, userId, onCloseModal}: UserFormProps) => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { userDetails, userDetailsLoading, userDetailsError } = useSelector(
    (state: RootState) => state.users
  );


  const [status, setStatus] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [stateField, setStateField] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [imgSource, setImgSource] = useState('')

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
    const userIdToFetch = userId || parseInt(id || '');
    if (userIdToFetch && formType !== 'createUser') {
      dispatch(getUserDetails(userIdToFetch));
    }
  }, [dispatch, userId, id, formType]);

  useEffect(() => {
    if (userDetails && formType !== 'createUser') {
      setStatus(userDetails.status || '');
      setFullName(userDetails.name || '');
      setEmail(userDetails.email || '');
      setPhoneNumber(userDetails.phoneNumber || '');
      setCountry(userDetails.country || '');
      setStateField(userDetails.state || '');
      setCity(userDetails.city || '');
      setAddress(userDetails.address || '');
      setZip(userDetails.zip || '');
      setCompany(userDetails.company || '');
      setRole(userDetails.role || '');
      setImgSource(userDetails.imgSource || '');
    }
  }, [userDetails, formType]);

  const handleSaveChanges = () => {
    const updatedUser = {
      status,
      name: fullName,
      email,
      phoneNumber,
      country,
      state: stateField,
      city,
      address,
      zip,
      company,
      role,
      imgSource
    };

    const newErrors = {
      fullName: !fullName.trim(),
      email: !email.trim(),
      phoneNumber: !phoneNumber.trim(),
      country: !country.trim(),
      state: !stateField.trim(),
      city: !city.trim(),
      address: !address.trim(),
      zip: !zip.trim(),
      company: !company.trim(),
      role: !role.trim(),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      if (userId || id) {
        if(imgSource){
          updatedUser.imgSource = imgSource;
        }
        
        dispatch(updateUserDetails({ id: userId || parseInt(id || ''), user: updatedUser }));
        if (onCloseModal) {
          onCloseModal();
        }
        navigate("/");
        dispatch(setSnackbarText("Update Success!"));

      } else {
        // Implement logic to create a new user
        const newUser: IUser = {
          ...updatedUser,
          status: 'Active',
          id: -1, // You can adjust this ID assignment logic as needed
          imgSource: imgSource, // Provide a default image source
        };
    
        dispatch(createUser({ user: newUser }));
        navigate("/");
        dispatch(setSnackbarText("User Created Successfully!"));
      }

      dispatch(openSnackbar());
    }
  };

  if (userDetailsLoading) {
    return <Loading />;
  }

  if (userDetailsError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" sx={{ color: "red" }}>
          {userDetailsError}
        </Typography>
      </Box>
    );
  }

  return (
    <>
    {formType !== 'quickEdit' && <UserProfile setImgSource={setImgSource} />}
    <Box component={Paper} flex="2" p={2} width="740px">
      {formType === 'quickEdit' && (
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Quick Update
        </Typography>
      )}

      {formType === 'quickEdit' && (
        <Box sx={{ marginTop: 2, marginBottom: 3 }}>
          <FormControl sx={{ width: 200 }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native" sx={{ paddingLeft: '15px' }}>
              Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={(e: SelectChangeEvent) => setStatus(e.target.value)}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Banned">Banned</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}

      <Box component="div" display="flex" justifyContent="space-between">
        <TextField
          id="fullname"
          label="Full name"
          variant="outlined"
          value={fullName}
          error={errors.fullName}
          helperText={errors.fullName && "Full name is required"}
          onChange={(e) => setFullName(e.target.value)}
          sx={{ minWidth: "49%" }}
        />
        <TextField
          id="email"
          label="Email address"
          variant="outlined"
          value={email}
          error={errors.email}
          helperText={errors.email && "Email is required"}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ minWidth: "49%" }}
        />
      </Box>

      <Box display="flex" gap={2} alignItems="center" mt={3}>
        <TextField
          id="phonenumber"
          label="Phone number"
          variant="outlined"
          value={phoneNumber}
          error={errors.phoneNumber}
          helperText={errors.phoneNumber && "Phone number is required"}
          onChange={(e) => setPhoneNumber(e.target.value)}
          sx={{ minWidth: "49%" }}
        />
        <TextField
          id="country"
          label="Country"
          variant="outlined"
          value={country}
          error={errors.country}
          helperText={errors.country && "Country is required"}
          onChange={(e) => setCountry(e.target.value)}
          sx={{ minWidth: "49%" }}
        />
      </Box>

      <Box display="flex" gap={2} alignItems="center" mt={3}>
        <TextField
          id="state"
          label="State/region"
          variant="outlined"
          value={stateField}
          error={errors.state}
          helperText={errors.state && "State is required"}
          onChange={(e) => setStateField(e.target.value)}
          sx={{ minWidth: "49%" }}
        />
        <TextField
          id="city"
          label="City"
          variant="outlined"
          value={city}
          error={errors.city}
          helperText={errors.city && "City is required"}
          onChange={(e) => setCity(e.target.value)}
          sx={{ minWidth: "49%" }}
        />
      </Box>

      <Box display="flex" gap={2} alignItems="center" mt={3}>
        <TextField
          id="address"
          label="Address"
          variant="outlined"
          value={address}
          error={errors.address}
          helperText={errors.address && "Address is required"}
          onChange={(e) => setAddress(e.target.value)}
          sx={{ minWidth: "49%" }}
        />
        <TextField
          id="zip"
          label="Zip/code"
          variant="outlined"
          value={zip}
          error={errors.zip}
          helperText={errors.zip && "Zip code is required"}
          onChange={(e) => setZip(e.target.value)}
          sx={{ minWidth: "49%" }}
        />
      </Box>

      <Box display="flex" gap={2} alignItems="center" mt={3}>
        <TextField
          id="company"
          label="Company"
          variant="outlined"
          value={company}
          error={errors.company}
          helperText={errors.company && "Company is required"}
          onChange={(e) => setCompany(e.target.value)}
          sx={{ minWidth: "49%" }}
        />
        <TextField
          id="role"
          label="Role"
          variant="outlined"
          value={role}
          error={errors.role}
          helperText={errors.role && "Role is required"}
          onChange={(e) => setRole(e.target.value)}
          sx={{ minWidth: "49%" }}
        />
      </Box>

      {formType === 'editUser' && (
        <Button variant="contained" sx={{ mt: "20px" }} onClick={handleSaveChanges}>
          Save changes
        </Button>
      )}

      {formType === 'quickEdit' && (
        <Box display="flex" gap={2} justifyContent={'flex-end'} mt={3}>
          <Button variant='outlined' sx={{ mt: '20px' }} onClick={() => {
            if (onCloseModal) {
              onCloseModal();
            }
          }}>Cancel</Button>
          <Button variant='contained' sx={{ mt: '20px' }} onClick={handleSaveChanges}>Update</Button>
        </Box>
      )}

      {formType === 'createUser' && (
        <Button variant='contained' sx={{ mt: '20px' }} onClick={handleSaveChanges}>Create user</Button>
      )}
    </Box>
    </>
    
  );
};

export default UserForm;
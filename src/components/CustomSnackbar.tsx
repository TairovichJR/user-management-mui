import styled from "@emotion/styled";
import { CheckCircle, Close } from "@mui/icons-material";
import { SnackbarContent, IconButton, Snackbar, Typography, SnackbarCloseReason } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { closeSnackbar } from "../app/features/userSlice";

const CustomSnackbarContent = styled(SnackbarContent)(({ theme }) => ({
    backgroundColor: '#f0fff4',
    color: '#1a3e1a',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    padding: '0 16px',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
  }));
  
  const CustomIconButton = styled(IconButton)({
    padding: 0,
    marginLeft: 'auto',
  });

  const CustomSnackbar = () => {

    const snackbar = useSelector((state:RootState) => state.users.snackbar);
    const snackbarText = useSelector((state:RootState) => state.users.snackbarText);
    const dispatch = useDispatch();

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason === 'clickaway') {
        return;
      }
      dispatch(closeSnackbar());
   };

    return (
      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <CustomSnackbarContent
          message={
            <Box display="flex" alignItems="center">
              <CheckCircle style={{ color: 'green', marginRight: '8px' }} />
              <Typography variant="body2" style={{ color: '#1a3e1a' }}>{snackbarText}</Typography>
            </Box>
          }
          action={
            <CustomIconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <Close fontSize="small" />
            </CustomIconButton>
          }
        />
      </Snackbar>
    );
  };

  export default CustomSnackbar;
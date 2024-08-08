import styled from "@emotion/styled";
import { CheckCircle, Close } from "@mui/icons-material";
import { SnackbarContent, IconButton, Snackbar, Typography, SnackbarCloseReason } from "@mui/material";
import { Box } from "@mui/system";

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

  interface SuccessSnackbarProps {
    open: boolean;
    handleClose: (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => void;
  }

  const SuccessSnackbar = ({ open, handleClose }: SuccessSnackbarProps) => {
    return (
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <CustomSnackbarContent
          message={
            <Box display="flex" alignItems="center">
              <CheckCircle style={{ color: 'green', marginRight: '8px' }} />
              <Typography variant="body2" style={{ color: '#1a3e1a' }}>Update success!</Typography>
            </Box>
          }
          action={
            <CustomIconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <Close fontSize="small" />
            </CustomIconButton>
          }
        />
      </Snackbar>
    );
  };

  export default SuccessSnackbar;
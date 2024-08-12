import { Box, CircularProgress, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ marginLeft: 2 }}>
        Loading Users...
      </Typography>
    </Box>
  );
};

export default Loading;

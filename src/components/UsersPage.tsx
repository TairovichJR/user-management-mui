// src/components/UsersPage.tsx
import { Container } from "@mui/system";
import StatusTabs from "./StatusTabs";
import UserFilters from "./UserFilters";
import { Paper, CircularProgress, Box, Typography, SnackbarCloseReason } from "@mui/material";
import UserTable from "./UserTable";
import FilterTags from "./FilterTags";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers } from "../app/features/userSlice";
import { RootState, AppDispatch } from "../app/store";
import { Route, Routes } from "react-router-dom";
import UserDetails from "./UserDetails";
import CustomSnackbar from "./CustomSnackbar";

const UsersPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.users.loading);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
                <Typography variant="h6" sx={{ marginLeft: 2 }}>Loading...</Typography>
            </Box>
        );
    }

    return (
        <Container component={Paper} maxWidth="lg" sx={{ marginTop: '40px', paddingTop: '10px', paddingBottom: '50px' }}>
            <CustomSnackbar />
            <Routes>
                <Route path="/" element={<>
                    <StatusTabs />
                    <UserFilters />
                    <FilterTags />
                    <UserTable />
                    </>} 
                 />
                <Route path="/users/:id/edit" element={<UserDetails />} />
            </Routes>
        </Container>
    );
}

export default UsersPage;

import { Box, Container } from "@mui/system";
import UserTabs from "./UserTabs";
import UserFilters from "./UserFilters";
import { Paper } from "@mui/material";
import UserTable from "./UserTable";
import Tags from "./FilterTags";

const UsersPage = () => {
    
    return(
        <Container component={Paper} maxWidth="lg" sx={{marginTop: '40px', paddingTop: '10px', paddingBottom: '50px'}}>
            <Box my={4} >
                <UserTabs />
            </Box>
            <Box my={2} display="flex" justifyContent="space-between">
                <UserFilters />
            </Box>
            <Box>
                <Tags />
            </Box>
            <Box my={2}>
                <UserTable />
            </Box>
        </Container>
    )
}

export default UsersPage;
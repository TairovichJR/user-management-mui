import { Container } from "@mui/system";
import { Paper } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import UserListPage from "./pages/user/List";
import UserDetailPage from "./pages/user/Details";
import NewUser from "./pages/user/NewUser";
// import Loading from "./components/Loading";

function App() {
  return (
    <Container
      component={Paper}
      maxWidth="lg"
      sx={{ marginTop: "40px", paddingTop: "10px", paddingBottom: "50px" }}
    >
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/users/:id/edit" element={<UserDetailPage />} />
        <Route path="/users/createUser" element={<NewUser />} />
      </Routes>
    </Container>
  );
}

export default App;

import "./App.css";
import UserList from "./components/users/UserList";
import { Typography, Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";

function App() {
  return (
    <div className="container mx-auto px-2 max-w-5xl pt-10 md:pt-32">
      <Box p={4}>
        <Typography
          textAlign="center"
          color="primary"
          variant="h4"
          fontWeight={700}
        >
          CRUD with Redux
        </Typography>
      </Box>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </div>

  );
}

export default App;

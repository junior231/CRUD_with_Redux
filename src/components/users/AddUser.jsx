import { Grid, TextField, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleAddUser = () => {
    setValues({
      name: "",
      email: "",
    });
    navigate("/");
    dispatch(
      addUser({
        id: uuidv4(),
        name: values.name,
        email: values.email,
      })
    );
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xl={3}>
        <Box
          mt={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <TextField
            value={values.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            fullWidth
            label="Name"
            name="name"
            type="text"
          />
          <TextField
            onChange={handleInputChange}
            width="60%"
            label="Email"
            fullWidth
            name="email"
            value={values.email}
            type="email"
          />
          <Box>
            <Button
              sx={{ mt: 2, justifyContent: "center" }}
              variant="contained"
              onClick={handleAddUser}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddUser;

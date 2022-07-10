import { Grid, TextField, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editUser } from "../../features/user/userSlice";

const EditUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams()
  const users = useSelector((store) => store.users);
  const existingUser = users?.filter(user => user.id === params.id);
  const {name, email} = existingUser[0]
  const [values, setValues] = useState({
    name,
    email,
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleEditUser = () => {
    setValues({
      name: "",
      email: "",
    });
    dispatch(editUser({
      id: params.id,
      name: values.name,
      email: values.email
    }));
    navigate("/");
  
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
              onClick={handleEditUser}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EditUser;

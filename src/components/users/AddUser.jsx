import { Grid, TextField, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleAddUser = (data) => {
    console.log(data);
    navigate("/");
    dispatch(
      addUser({
        id: uuidv4(),
        name: data.name,
        email: data.email,
      })
    );
  };

  return (
    <Grid container justifyContent="center" spacing={1}>
      <Grid item xs={12} sm={6} md={4} xl={4}>
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
          <Box>
            <TextField
              required
              sx={{ mb: 2 }}
              id="name"
              name="name"
              label="Name"
              fullWidth
              {...register("name")}
              error={errors.name ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.name?.message}
            </Typography>
          </Box>
          <Box>
            <TextField
              required
              id="email"
              fullWidth
              name="email"
              label="Email"
              {...register("email")}
              error={errors.email ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.email?.message}
            </Typography>
          </Box>
          <Box>
            <Button
              sx={{ mt: 2, justifyContent: "center" }}
              variant="contained"
              onClick={handleSubmit(handleAddUser)}
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

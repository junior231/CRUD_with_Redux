import { Grid, TextField, Box, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editUser } from "../../features/user/userSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const EditUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const users = useSelector((store) => store.users);
  const existingUser = users?.filter((user) => user.id === params.id);
  const { name, email } = existingUser && existingUser[0];

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

  const handleEditUser = (data) => {
    dispatch(
      editUser({
        id: params.id,
        name: data.name,
        email: data.email,
      })
    );
    navigate("/");
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
              defaultValue={name}
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
              defaultValue={email}
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
              onClick={handleSubmit(handleEditUser)}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EditUser;

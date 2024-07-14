import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BasePath } from "../utils/fetcher";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BasePath}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
        credentials: "include",
      });
      if (res.ok) {
        navigate("/auth");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5 rounded-md w-2/3 md:w-1/2 lg:w-1/3 shadow-md bg-slate-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <header>
        <h1 className="text-2xl pb-2 font-semibold">Register</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="space-y-4 my-4">
          <TextField
            id="username"
            label="Username"
            name="username"
            value={register.username}
            onChange={handleChange}
            fullWidth
            size="small"
            required
          />
          <TextField
            id="email"
            label="Email"
            name="email"
            type="email"
            value={register.email}
            onChange={handleChange}
            fullWidth
            size="small"
            required
          />

          <FormControl fullWidth variant="outlined" required size="small">
            <InputLabel htmlFor="password" required>
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              label="Password"
              name="password"
              value={register.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              fullWidth
              size="small"
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <div className="flex flex-col gap-2">
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
            <Button
              variant="outlined"
              color="info"
              type="button"
              onClick={() => {
                navigate("/auth");
              }}
            >
              Already have an account?
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Register;

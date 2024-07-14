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
import { useAuthContext } from "../lib/AuthContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignIn = () => {
  const [signIn, setSignIn] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { loginFn } = useAuthContext();

  const handleChange = (e) => {
    setSignIn({ ...signIn, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  return (
    <div className="p-5 rounded-md w-2/3 md:w-1/2 lg:w-1/3 shadow-md bg-slate-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <header>
        <h1 className="text-2xl pb-2 font-semibold">Sign In</h1>
      </header>
      <main>
        <form onSubmit={loginFn} className="space-y-4 my-4">
          <TextField
            id="username"
            label="Username"
            name="username"
            value={signIn.username}
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
              value={signIn.password}
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
              Sign In
            </Button>
            <Button
              variant="outlined"
              color="info"
              type="button"
              onClick={() => {
                navigate("/auth/register");
              }}
            >
              Don&apos;t have an account?
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignIn;

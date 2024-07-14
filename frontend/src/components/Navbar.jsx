import React from "react";
import { useAuthContext } from "../lib/AuthContext";
import { Button } from "@mui/material";

const Navbar = () => {
  const { user, logoutFn } = useAuthContext();
  return (
    <div className="text-center p-2 font-semibold flex justify-center items-center gap-1">
      <div>
        👋 Hi <span className="text-purple-700">{user?.username}</span>
      </div>
      <Button
        variant="text"
        size="small"
        sx={{
          textDecoration: "underline",
          textTransform: "none",
        }}
        onClick={logoutFn}
      >
        Logout
      </Button>
    </div>
  );
};

export default Navbar;

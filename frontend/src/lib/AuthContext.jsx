import { createContext, useContext, useState } from "react";
import { BasePath } from "../utils/fetcher";
import { Outlet, useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const userData = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [user, setUser] = useState(userData);
  const navigate = useNavigate();
  
  const loginFn = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (!username || !password) return;
    try {
      const res = await fetch(`${BasePath}/api/auth/signIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: "include",
      });
      const user = await res.json();
      setUser(user?.data);
      localStorage.setItem("user", JSON.stringify(user?.data));
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const logoutFn = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/auth", { replace: true });
  };

  const value = {
    user,
    setUser,
    loginFn,
    logoutFn,
  };
  return (
    <AuthContext.Provider value={value}>
      {children || <Outlet />}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { useAuthContext, AuthContext, AuthContextProvider };

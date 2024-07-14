import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import { QueryClient, QueryClientProvider } from "react-query";
// import Error from "./components/Error";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AuthContextProvider } from "./lib/AuthContext";
import AuthContainer from "./components/AuthContainer";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthContextProvider />}>
      <Route
        path="/"
        element={<ProtectedRoute />}
      >
        <Route index element={<Home />} />
        <Route path=":id" element={<Employee />} />
      </Route>
      <Route
        path="/auth"
        element={<AuthContainer />}
      >
        <Route index element={<SignIn />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<p>404 Error - Nothing here...</p>} />
    </Route>
  )
);

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

export default App;

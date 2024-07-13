import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import { QueryClient, QueryClientProvider } from "react-query";
import Error from "./components/Error";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    ErrorBoundary: Error,
  },
  {
    path: "/:id",
    element: <Employee />,
    ErrorBoundary: Error,
  },
]);

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;

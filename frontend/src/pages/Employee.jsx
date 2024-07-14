import { Button, Skeleton } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import fetcher from "../utils/fetcher";
import Error from "../components/Error";
import AddOrUpdateEmployee from "../components/AddOrUpdateEmployee";
import AddOrUpdateSalary from "../components/AddOrUpdateSalary";
import Navbar from "../components/Navbar";

export default function Employee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: employee,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: "employee",
    queryFn: () => fetcher(`/api/employee/${id}`),
  });

  if (isLoading) {
    return (
      <div className="space-y-4 w-full h-screen overflow-y-auto bg-stone-300 p-5 lg:p-10 text-black">
        <Skeleton variant="rounded" width={"100%"} height={70} />
        <div className="flex gap-4">
          <Skeleton variant="rounded" width={"100%"} height={300} />
          <Skeleton variant="rounded" width={"100%"} height={300} />
        </div>
      </div>
    );
  }
  if (error) {
    return <Error refetchFn={refetch} />;
  }

  return (
    <div className="w-full h-screen overflow-y-auto bg-stone-300 p-5 lg:p-10 pt-0 lg:pt-0 text-black">
      <Navbar />
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Employee Details</h1>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </header>
      <hr className="my-4 border-slate-700 border-2 rounded-md" />
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="p-4 shadow-md bg-stone-100 rounded-md basis-1/2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg text-slate-600 font-medium">
              Basic Details
            </h2>
            <AddOrUpdateEmployee employeeData={employee?.data} />
          </div>
          <div className="grid grid-cols-3 grid-flow-row my-4 gap-3">
            <div className="text-slate-500 col-span-1">Name</div>
            <div className="col-span-2">{employee?.data?.name}</div>
            <div className="text-slate-500 col-span-1">Employee ID</div>
            <div className="col-span-2">{employee?.data?.id}</div>
            <div className="text-slate-500 col-span-1">Date of Birth</div>
            <div className="col-span-2">
              {employee?.data?.dob
                ? new Date(employee?.data?.dob).toLocaleDateString()
                : ""}
            </div>
            <div className="text-slate-500 col-span-1">Employee Status</div>
            <div className="col-span-2">
              {employee?.data?.empStatus ? "Active" : "Inactive"}
            </div>
            <div className="text-slate-500 col-span-1">Address</div>
            <div className="col-span-2">{employee?.data?.address}</div>
          </div>
        </div>
        <div className="p-4 shadow-md bg-stone-100 rounded-md basis-1/2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg text-slate-500 font-medium">
              Salary Details
            </h2>
            <AddOrUpdateSalary
              employeeID={employee?.data?.id}
              salaryData={employee?.data?.salary}
            />
          </div>
          <div className="grid grid-cols-3 grid-flow-row my-4 gap-3">
            <div className="text-slate-500 col-span-1">Basic Pay</div>
            <div className="col-span-2">{employee?.data?.salary?.basicPay}</div>
            <div className="text-slate-500 col-span-1">HRA</div>
            <div className="col-span-2">{employee?.data?.salary?.hra}</div>
            <div className="text-slate-500 col-span-1">PF</div>
            <div className="col-span-2">{employee?.data?.salary?.pf}</div>
            <div className="text-slate-500 col-span-1">Tax</div>
            <div className="col-span-2">{employee?.data?.salary?.tax}</div>
            <div className="text-slate-500 col-span-1">Gross Pay</div>
            <div className="col-span-2">{employee?.data?.salary?.grossPay}</div>
            <div className="text-slate-500 col-span-1">Net Pay</div>
            <div className="col-span-2">{employee?.data?.salary?.netPay}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

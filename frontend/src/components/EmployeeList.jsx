import { useQuery } from "react-query";
import fetcher from "../utils/fetcher";
import { Skeleton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import DeleteEmployee from "./DeleteEmployee";
import { Link } from "react-router-dom";

const columns = [
  {
    field: "id",
    headerName: "ID",
    // width: 70
  },
  {
    field: "name",
    headerName: "Name",
    renderCell: (params) => (
      <Link to={`/${params.id}`}>
        <span className="underline text-blue-500">{params.value}</span>
      </Link>
    ),
  },
  { field: "address", headerName: "Address", minWidth: 200 },
  {
    field: "dob",
    headerName: "Date of Birth",
    type: "date",
  },
  {
    field: "empStatus",
    headerName: "Employee Status",
    type: "boolean",
    // width: 200,
  },
  {
    field: "salary",
    headerName: "Salary",
    type: "number",
  },
  {
    field: "modifiedAt",
    headerName: "Modified On",
    type: "dateTime",
    // width: 200,
  }
];

export default function EmployeeList() {
  const [selectionModel, setSelectionModel] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 1,
  });

  const {
    data: employees,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: "employees",
    queryFn: () =>
      fetcher(
        `/api/employee?limit=${paginationModel.pageSize}&page=${paginationModel.page}`
      ),
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton variant="rounded" width={"100%"} height={70} />
        <Skeleton variant="rounded" width={"100%"} height={70} />
        <Skeleton variant="rounded" width={"100%"} height={70} />
      </div>
    );
  }
  if (error) {
    return <Error refetchFn={refetch} />;
  }

  const rows = employees?.data?.map((employee) => ({
    id: employee.id,
    name: employee.name,
    address: employee.address,
    dob: employee.dob ? new Date(employee.dob) : null,
    empStatus: employee.empStatus,
    salary: employee?.salary?.netPay,
    modifiedAt: employee.updatedAt ? new Date(employee.updatedAt) : null,
  }));
  return (
    <div className="w-full h-[500px] rounded-md bg-stone-100 shadow-sm relative">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        checkboxSelection
        autosizeOptions={{
          expand: true,
          includeHeaders: true,
          includeOutliers: true,
        }}
      />
      <DeleteEmployee selectionModel={selectionModel} refetchFn={refetch} />
    </div>
  );
}

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { BasePath } from "../utils/fetcher";
import { useQueryClient } from "react-query";
import dayjs from 'dayjs'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "7px",
};

const AddOrUpdateEmployee = ({ employeeData }) => {
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState({
    name: "",
    address: "",
    dob: null,
    empStatus: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const queryClient = useQueryClient()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = employeeData ? `${BasePath}/api/employee/${employeeData.id}` : `${BasePath}/api/employee`;
    const method = employeeData ? "PUT" : "POST";
    const invalidateKey = employeeData ? "employee" : "employees";
    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      if (res.ok) {
        handleClose();
        queryClient.invalidateQueries(invalidateKey);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target?.type === "checkbox" ? e.target.checked : e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };

  useEffect(() => {
    if (employeeData) {
      setEmployee( prev => ({
        name: employeeData.name,
        address: employeeData.address,
        dob: employeeData.dob ? dayjs(employeeData.dob) : prev.dob,
        empStatus: employeeData.empStatus,
      }))
    }
  }, [employeeData])
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        {employeeData ? "Update" : "Add Employee"}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <header>
            <h1 className="text-xl text-slate-800 font-semibold mb-2">
              {employeeData ? "Update" : "Add"} Employee
            </h1>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 py-2">
              <TextField
                id="empName"
                label="Name"
                name="name"
                value={employee.name}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <DatePicker
                label="Date of Birth"
                value={employee.dob}
                onChange={(value) => setEmployee({ ...employee, dob: value })}
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
              />
              <TextField
                id="empAddress"
                label="Address"
                name="address"
                value={employee.address}
                onChange={handleChange}
                multiline
                rows={2}
                fullWidth
                size="small"
              />
              <FormControlLabel
                label={<span className="text-slate-500">Employee Status</span>}
                control={
                  <Checkbox
                    checked={employee.empStatus}
                    onChange={handleChange}
                    name="empStatus"
                    color="primary"
                  />
                }
              />
            </div>
            <div className="flex gap-2 mt-4">
              <Button type="submit" variant="contained">
                Submit
              </Button>
              <Button
                variant="outlined"
                onClick={handleClose}
                type="button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddOrUpdateEmployee;

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
  
  const AddOrUpdateSalary = ({ employeeID, salaryData }) => {
    const [open, setOpen] = useState(false);
    const [salary, setSalary] = useState({
        basicPay: 0,
        hra: 0,
        pf: 0,
        tax: 0,
        grossPay: 0,
        netPay: 0
    });
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const queryClient = useQueryClient()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const url = salaryData ? `${BasePath}/api/salary/${salaryData._id}` : `${BasePath}/api/salary/${employeeID}/add`;
      const method = salaryData ? "PUT" : "POST";
      try {
        const res = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(salary),
        });
        if (res.ok) {
          handleClose();
          queryClient.invalidateQueries("employee");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleChange = (e) => {
      setSalary({ ...salary, [e.target.name]: e.target.value });
    };
  
    useEffect(() => {
      if (salaryData) {
        setSalary({
            basicPay: salaryData.basicPay,
            hra: salaryData.hra,
            pf: salaryData.pf,
            tax: salaryData.tax,
            grossPay: salaryData.grossPay,
            netPay: salaryData.netPay
        })
      }
    }, [salaryData])
    return (
      <div>
        <Button variant="contained" onClick={handleOpen}>
          {salaryData ? "Update" : "Add"}
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
                {salaryData ? "Update" : "Add"} Salary
              </h1>
            </header>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 py-2">
                <TextField
                  id="basicPay"
                  label="Basic Pay"
                  name="basicPay"
                  type="number"
                  value={salary.basicPay}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  id="hra"
                  label="HRA"
                  name="hra"
                  type="number"
                  value={salary.hra}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  id="pf"
                  label="PF"
                  name="pf"
                  type="number"
                  value={salary.pf}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  id="tax"
                  label="Tax"
                  name="tax"
                  type="number"
                  value={salary.tax}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  id="grossPay"
                  label="Gross Pay"
                  name="grossPay"
                  type="number"
                  value={salary.grossPay}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  id="netPay"
                  label="Net Pay"
                  name="netPay"
                  type="number"
                  value={salary.netPay}
                  onChange={handleChange}
                  fullWidth
                  size="small"
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
  
  export default AddOrUpdateSalary;
  
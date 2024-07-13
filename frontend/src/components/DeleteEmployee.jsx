import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BasePath } from "../utils/fetcher";

const DeleteEmployee = ({ selectionModel, refetchFn }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleDelete = async () => {
      try {
        const res = await fetch(`${BasePath}/api/employee/delete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: selectionModel }),
        });
        if (res.ok) {
          handleClose();
          refetchFn();
        }
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <>
      {selectionModel.length > 0 && (
        <div className="absolute bottom-2 left-32">
          <Button variant="contained" color="error" size="small" onClick={handleClickOpen}>
            Delete
          </Button>
        </div>
      )}
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Deleting Employee{selectionModel.length > 1 ? "s" : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will delete selected employee{selectionModel.length > 1 ? "s" : ""} from the system.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus variant="outlined">Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteEmployee;

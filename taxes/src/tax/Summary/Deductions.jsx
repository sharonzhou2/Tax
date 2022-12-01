import React, { useState } from "react";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { DeleteOutlineRounded } from "@mui/icons-material";
import { formatMoney } from "tax/Numbers";

function DeductionsDialog(props) {
  const { onClose, selectedValue, open, setDeductions } = props;
  const [values, setValues] = React.useState({
    deductions: "",
    description: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleSubmit = (e) => {
    handleClose();
    const deduc = localStorage.getItem("deductions");
    if (deduc) {
      const deductions = JSON.parse(deduc);
      deductions.push(values);
      localStorage.setItem("deductions", JSON.stringify(deductions));
      setDeductions(deductions);
    } else {
      localStorage.setItem("deductions", JSON.stringify([values]));
      setDeductions([values]);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add Deductions</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-tax">Tax</InputLabel>
            <OutlinedInput
              id="outlined-basic"
              label="Deductions"
              value={values.deductions}
              onChange={handleChange("deductions")}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={values.description}
            onChange={handleChange("description")}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

const Deductions = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [deductions, setDeductions] = useState([]);

  useEffect(() => {
    const deduc = localStorage.getItem("deductions");

    if (deduc) {
      const deductions = JSON.parse(deduc);
      setDeductions(deductions);
    } else {
      setDeductions([]);
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleReset = () => {
    localStorage.setItem("deductions", "");
    setDeductions([]);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <div>
      <Box display="flex">
        <Typography variant="h4" py={3}>
          Deductions
        </Typography>
        <Tooltip title="Add any deductions E.g. Work Expenses">
          <IconButton>
            <InfoIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
        {deductions ? (
          <>
            <Grid item xs={5}>
              <Typography variant="h6">Deduction</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6">Amount ($AUD)</Typography>
            </Grid>
          </>
        ) : (
          ""
        )}

        {deductions
          ? deductions.map((curr, i) => (
              <>
                <Grid item xs={5}>
                  {curr.description}
                </Grid>
                <Grid item xs={3}>
                  {formatMoney(curr.deductions)}
                </Grid>
              </>
            ))
          : "No deductions Added"}
      </Grid>

      <br />
      <Box display="flex" width="28rem" justifyContent="space-between">
        <Button
          variant="contained"
          onClick={handleClickOpen}
          startIcon={<AddIcon></AddIcon>}
        >
          Add Deductions
        </Button>
        <Button
          variant="outlined"
          onClick={handleReset}
          endIcon={<DeleteOutlineRounded></DeleteOutlineRounded>}
        >
          Clear All Deductions
        </Button>
      </Box>
      <DeductionsDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        setDeductions={setDeductions}
      />
    </div>
  );
};

export default Deductions;

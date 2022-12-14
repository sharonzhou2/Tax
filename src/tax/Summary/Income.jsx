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
  InputBase,
  InputLabel,
  OutlinedInput,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import { useEffect } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { theme } from "tax/Theme";
import { DeleteOutlineRounded } from "@mui/icons-material";
import { formatMoney } from "tax/Numbers";

function SimpleDialog(props) {
  const { onClose, selectedValue, open, setIncomes } = props;
  const [values, setValues] = React.useState({
    income: "",
    tax: "",
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
    const inc = localStorage.getItem("income");
    if (inc) {
      const incomes = JSON.parse(inc);
      incomes.push(values);
      localStorage.setItem("income", JSON.stringify(incomes));
      setIncomes(incomes);
    } else {
      localStorage.setItem("income", JSON.stringify([values]));
      setIncomes([values]);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add Income</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Income"
            variant="outlined"
            value={values.income}
            onChange={handleChange("income")}
          />
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-tax">Tax</InputLabel>
            <OutlinedInput
              id="outlined-adornment-tax"
              value={values.tax}
              onChange={handleChange("tax")}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Tax"
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

const Income = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const inc = localStorage.getItem("income");

    if (inc) {
      const income = JSON.parse(inc);
      setIncomes(income);
    } else {
      setIncomes([]);
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleReset = () => {
    localStorage.setItem("income", "");
    setIncomes([]);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <div>
      <Box display="flex">
        <Typography variant="h4" py={3}>
          Income
        </Typography>
        <Tooltip title="Add any income from PAYG or interest here">
          <IconButton>
            <InfoIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
        {incomes ? (
          <>
            <Grid item xs={5}>
              <Typography variant="h6">Income</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6">Amount</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6"> Tax Withheld</Typography>
            </Grid>
          </>
        ) : (
          ""
        )}

        {incomes
          ? incomes.map((curr, i) => (
              <>
                <Grid item xs={5}>
                  {curr.description}
                </Grid>
                <Grid item xs={3}>
                  {formatMoney(curr.income)}
                </Grid>
                <Grid item xs={3}>
                  {formatMoney(curr.tax)}
                </Grid>
              </>
            ))
          : "No Incomes Added"}
      </Grid>

      <br />
      <Box display="flex" width="22rem" justifyContent="space-between">
        <Button
          variant="contained"
          onClick={handleClickOpen}
          startIcon={<AddIcon></AddIcon>}
        >
          Add Income
        </Button>
        <Button
          variant="outlined"
          onClick={handleReset}
          endIcon={<DeleteOutlineRounded></DeleteOutlineRounded>}
        >
          Clear All Income
        </Button>
      </Box>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        setIncomes={setIncomes}
      />
    </div>
  );
};

export default Income;

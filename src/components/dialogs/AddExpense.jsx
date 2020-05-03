import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const categories = [
  {
    value: "food",
    label: "Food",
  },
  {
    value: "grocery",
    label: "Grocery",
  },
  {
    value: "drink",
    label: "Drink",
  },
  {
    value: "school",
    label: "School",
  },
  {
    value: "bill",
    label: "Bill",
  },
  {
    value: "other",
    label: "Others",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function AddExpense() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const [values, setValues] = React.useState({
    amount: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [category, setCategory] = React.useState("EUR");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Expenses</DialogTitle>
        <DialogContent>
          <DialogContentText>Add all your Expenses here.</DialogContentText>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined"
              label="Description"
              defaultValue=""
              variant="outlined"
            />
            <br />
            <TextField
              id="outlined-select-category"
              select
              label="Select"
              value={category}
              onChange={handleChange}
              helperText="Please select your category of expenses"
              variant="outlined"
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <br />
            <TextField
              fullWidth
              id="outlined"
              label="Amount"
              type="number"
              defaultValue=""
              variant="outlined"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

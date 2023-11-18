import TextField from "@mui/material/TextField";

export default function MyTextField({name, type, label, isRequired}) {
    return( <TextField
        name={name}
        margin="normal"
        type={type}
        variant="outlined"
        label={label}
        color="textfield"
        required={isRequired}
        sx={{ width: "90%" }}
        InputLabelProps={{ required: false }}
      />);
}
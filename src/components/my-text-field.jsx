import TextField from "@mui/material/TextField";

export default function MyTextField({value, type, label, isRequired, onChange}) {
    return( <TextField
        value={value}
        onChange={onChange}
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
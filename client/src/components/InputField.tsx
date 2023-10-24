import { FormLabel, Grid, TextField } from "@mui/material";

interface InputFieldProps {
  label: string;
  id: string;
  value: string | number;
}

const InputField = ({ label, id, value }: InputFieldProps): JSX.Element => {
  return (
    <Grid item> 
      <FormLabel id={id}>{label}</FormLabel>
      <TextField fullWidth value={value || ""} />
    </Grid>
  );
};

export default InputField;

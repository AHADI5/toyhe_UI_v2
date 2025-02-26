import  { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function DynamicMuiForm({ fields, onSubmit , isLoding }) {
  const [inputs, setInputs] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || ""; // Initialize state for all fields
      return acc;
    }, {})
  );

 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputs); // Pass the form data back to the parent
  };

  return (
    <>
        <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '300px',
            margin: 'auto',
        }}
        >
        {fields.map((field, index) => (
            <TextField
            key={index}
            type={field.type || "text"}
            name={field.name}
            label={field.label || field.name}
            value={inputs[field.name] || ""}
            onChange={handleChange}
            placeholder={field.placeholder || ""}
            variant="outlined"
            fullWidth
            />
        ))}
        <Button type="submit" variant="contained" color="primary">
            {isLoding ? "Loading" : "Submit"}
        </Button>
        </Box>
        
    </>
  );
}

export default DynamicMuiForm;

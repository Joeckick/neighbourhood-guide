import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function PostcodeForm({ onSubmit, loading }) {
  const [postcode, setPostcode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (postcode.trim()) {
      onSubmit(postcode.trim().toUpperCase()); // Trim and convert to uppercase
    } else {
      // Maybe add some validation feedback here later
      console.log('Postcode cannot be empty');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="postcode"
        label="Enter UK Postcode"
        name="postcode"
        autoComplete="postal-code"
        autoFocus
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        disabled={loading} // Disable input when loading
        sx={{ mr: 1, width: 'calc(80% - 8px)' }} // Adjust width and add margin
      />
      <Button
        type="submit"
        variant="contained"
        disabled={loading || !postcode.trim()} // Disable button when loading or input is empty
        sx={{ mt: 2, mb: 2, height: '56px', width: '20%' }} // Match text field height
      >
        {loading ? 'Loading...' : 'Get Guide'}
      </Button>
    </Box>
  );
}

export default PostcodeForm; 
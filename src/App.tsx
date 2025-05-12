import { Button, TextField } from '@mui/material';
import { useState } from 'react';

export const App = () => {
  // Keeping all state as useStates in the top-level component for now.
  // If this scaled we'd want something more sophisticated
  const [urlTextField, setUrlTextField] = useState<string>('');
  const [urlTextFieldError, setUrlTextFieldError] = useState<string>('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h3>Get PDF invoice for fire equipment listing</h3>
      <TextField
        id="outlined-controlled"
        label="Url of withgarage.com listing"
        value={urlTextField}
        onChange={(e) => {
          setUrlTextField(e.target.value);
        }}
        style={{ width: '500px' }}
      />
      {/* On press: validate URL is reasonable (starts with right thing, ends with a uuid), else display an error on the URL
            Fetch, then parse, then build a pdf
            Show a modal the way they do? Download vs email? */}
      <div>
        <Button variant="contained">Generate PDF Invoice</Button>
      </div>
    </div>
  );
};

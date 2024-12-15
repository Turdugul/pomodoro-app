import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const Settings: React.FC<{ onApply: (session: number, breakTime: number) => void }> = ({ onApply }) => {
  const [session, setSession] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  return (
    <Box display="flex" flexDirection="column" alignItems="center"  sx={{ height: '70vh' }}>
      <TextField
        label="Session Time (minutes)"
        type="number"
        value={session}
        onChange={(e) => setSession(Number(e.target.value))}
        sx={{ marginBottom: 1 }}
      />
      <TextField
        label="Break Time (minutes)"
        type="number"
        value={breakTime}
        onChange={(e) => setBreakTime(Number(e.target.value))}
        sx={{ marginBottom: 3 }}
      />
      <Button variant="contained" color="primary" onClick={() => onApply(session, breakTime)}>
        Apply
      </Button>
    </Box>
  );
};

export default Settings;

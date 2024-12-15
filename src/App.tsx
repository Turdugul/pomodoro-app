import React, { useState, useEffect } from 'react';

import { CssBaseline, Box, Button } from '@mui/material';
import Timer from './components/TimerComponent';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const savedSessionTime = localStorage.getItem('sessionTime');
    const savedBreakTime = localStorage.getItem('breakTime');

    if (savedSessionTime) setSessionTime(Number(savedSessionTime));
    if (savedBreakTime) setBreakTime(Number(savedBreakTime));
  }, []);

  const handleApplySettings = (session: number, breakTime: number) => {
    setSessionTime(session);
    setBreakTime(breakTime);
    localStorage.setItem('sessionTime', session.toString());
    localStorage.setItem('breakTime', breakTime.toString());
  };


  return (
    <>
      <CssBaseline />
      <Box
  height="90vh"
  width='40vw'
  display="flex"
  bgcolor='pink'
  justifyContent="center"
  alignItems="center"
  flexDirection="column"
  gap={0} 
  marginTop='1rem'
  sx={{
    height: '100vh',
    borderRadius: '10%',  // Border radius set to 10%
    border: '3px solid brown',  // Red border with 3px width
  }}
>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ padding: 1 }}>
          <Button variant="outlined" onClick={() => setShowSettings(!showSettings)}>
            {showSettings ? 'Back to Timer' : 'Settings'}
          </Button>
        </Box>
        {showSettings ? (
          <Settings onApply={handleApplySettings} />
        ) : (
          <Timer sessionTime={sessionTime} breakTime={breakTime} />
        )}
      </Box>
      </>
  
  );
};

export default App;

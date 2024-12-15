import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';

const Timer: React.FC<{ sessionTime: number; breakTime: number }> = ({ sessionTime, breakTime }) => {
  const [timeLeft, setTimeLeft] = useState(sessionTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      if (audioRef.current && isSession) {
        audioRef.current.play(); // Play audio when session ends (switch to break)
      }
      setIsSession(!isSession);
      setTimeLeft((isSession ? breakTime : sessionTime) * 60);
    }

    return () => clearTimeout(timer);
  }, [isRunning, timeLeft, isSession, sessionTime, breakTime]);

  // Stop the music when break time ends
  useEffect(() => {
    if (timeLeft === 0 && !isSession && audioRef.current) {
      audioRef.current.pause(); // Pause music when break ends (switch to session)
    }
  }, [timeLeft, isSession]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setIsSession(true);
    setTimeLeft(sessionTime * 60);
    if (audioRef.current) {
      audioRef.current.pause(); // Pause music when reset
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" sx={{ height: '80vh' }}>
      <Typography variant="h4" gutterBottom>
        {isSession ? 'Session Time' : 'Break Time'}
      </Typography>
      <CircularProgress variant="determinate" value={((sessionTime * 60 - timeLeft) / (sessionTime * 60)) * 100} size={150} sx={{ marginBottom: 1 }} />
      <Typography variant="h3" color="primary" sx={{ marginBottom: 2 }}>
        {formatTime(timeLeft)}
      </Typography>
      <Box>
        <Button variant="contained" color="primary" onClick={toggleTimer} sx={{ marginRight: 2 }}>
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={resetTimer}>
          Reset
        </Button>
      </Box>
      <audio ref={audioRef} src="/relax.mp3" preload="auto" />
    </Box>
  );
};

export default Timer;

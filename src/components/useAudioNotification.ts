
const useAudioNotification = (audioFile: string) => {
  const audio = new Audio(audioFile);

  const play = () => {
    audio.play().catch((e) => console.error('Failed to play audio:', e));
  };

  return play;
};

export default useAudioNotification;

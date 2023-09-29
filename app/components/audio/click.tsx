import React, { useState } from "react";

interface SoalButtonProps {
  text: any;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  soundPath: any;
}

const SoalButton: React.FC<SoalButtonProps> = ({ text, onClick, soundPath }) => {
  const [audio] = useState(new Audio(soundPath));
  
  const playSound = () => {
    audio.currentTime = 0; 
    audio.play();
  };

  return (
    <button onClick={(event) => { onClick(event); playSound(); }}>
      {text}
    </button  >
  );
};

export default SoalButton;

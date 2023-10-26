"use client"

import React, { useEffect } from "react";


const Opening = () => {
  useEffect(() => {
    const audio = new Audio("/audio/opening.mp3");
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
    };
  }, []);

  return null; 
};

export default Opening;

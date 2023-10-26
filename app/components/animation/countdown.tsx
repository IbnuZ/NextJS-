import { useState, useEffect, useCallback } from 'react';

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState(60); 

  const updateCountdown = useCallback(() => {
    if (countdown > 0) {
      setCountdown(countdown - 1);
    }
  }, [countdown]);

  useEffect(() => {
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [countdown, updateCountdown]);

  return (
    <div></div>
  );
};

export default CountdownTimer;

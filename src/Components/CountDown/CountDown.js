import ReactCountdownClock from "react-countdown-clock";

export default function CountDown({ startingTime, handleComplete }) {
  return (
    <ReactCountdownClock
      seconds={startingTime}
      color="#000"
      alpha={0.9}
      size={70}
      onComplete={handleComplete}
    />
  );
}

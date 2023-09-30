import { useEffect, useState } from "react";

export default function Loading() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots.length === 3 ? "." : prevDots + "."));
    }, 500);

    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, []);
  return (
    <>
      <h1> Loading {dots} </h1>
    </>
  );
}

import { useEffect } from "react";

import wowGoodGif from "./wow-good.gif";
import tryAgainGif from "./no-way-dislike.gif";

import "./Notification.css";

export default function Notification({ message, closeNotif }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      closeNotif();
    }, 2100);

    return () => clearTimeout(timeout);
  }, [closeNotif]);

  return (
    <div className="gif-overlay">
      <img
        className="gifImage"
        src={message ? wowGoodGif : tryAgainGif}
        alt="good job gif"
      />
    </div>
  );
}

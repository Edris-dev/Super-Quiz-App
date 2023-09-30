import "./QuestionCard.css";

import { useEffect, useState } from "react";
import CountDown from "../CountDown/CountDown.js";

export default function QuestionCard({ qId, qData, scoreUpdate }) {
  const { imageUrl, question, options, answer, time } = qData;

  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const [timer, setTimer] = useState(time);

  useEffect(() => {
    setSelected(null);
    setTimer(time);
    setShowAnswer(false);
  }, [qId]);

  //the user entered answer will be logged and compared
  // to the actual answer

  const handleValidation = () => {
    let res = Boolean(parseInt(selected, 10) === answer);
    setShowAnswer(true);
    scoreUpdate(qId, res);
  };

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const handleComplete = () => {
    handleValidation();
  };

  return (
    <div className="wrapper">
      <div>
        <CountDown
          key={qId}
          startingTime={timer}
          handleComplete={handleComplete}
          className="timer"
        />
        <img
          className="avatarImage"
          loading="lazy"
          alt="question avatar"
          src={imageUrl}
        />
      </div>
      <div className="question-block">
        <h2> {question} </h2>
        <div className="options">
          {options.map((op, i) => {
            const answerCard = answer === i;
            const isSelected = parseInt(selected, 10) === i;
            const inCorrectCard = isSelected && !answerCard;
            return (
              <div key={i} className="option">
                <input
                  id={`option${i}`}
                  className="custom-radio"
                  type="radio"
                  onChange={handleChange}
                  value={i}
                  name={question}
                  checked={isSelected}
                />
                <label
                  className={`option-label
                  ${showAnswer && inCorrectCard ? "incorrect-label" : ""} ${
                    showAnswer && answerCard ? "correct-label" : ""
                  } `}
                  htmlFor={`option${i}`}
                >
                  {" "}
                  {op}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

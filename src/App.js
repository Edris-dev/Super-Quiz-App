import "./App.css";

import { useEffect, useState } from "react";
import QuestionCard from "./Components/QuestionCard/QuestionCard";
import Notification from "./Components/Notification/Notification";
import ScoreCard from "./Components/ScoreCard/ScoreCard";
import Loading from "./Components/Loading/Loading";

const QUESTION_URL = "https://scs-interview-api.herokuapp.com/questions";
const CACHE_KEY = "CreatubbleQuestions";
const EXPIRATION_TIME = 5 * 60 * 1000;

export default function App() {
  //retrieve all questions avaiable, if questionDB grows and multiple requests needed- will need to track question Id
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  //track user data (score), in future applications can show user which questions need work
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [completedQuestions, setCompletedQuestions] = useState(0);

  //manage current state
  const [qIdx, setQIdx] = useState(0);

  //score card state
  const [showScore, setShowScore] = useState(false);

  const [showNotif, setShowNotif] = useState(false);
  const [notifMessage, setNotifMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //first checked if its cached or not
        const cachedQuestions = localStorage.getItem(CACHE_KEY);
        if (cachedQuestions) {
          const parsedQuestions = JSON.parse(cachedQuestions);
          setQuestions(parsedQuestions.data);
          setLoading(false);
          return;
        }
        const resp = await fetch(QUESTION_URL);
        if (!resp.ok) throw new Error(`HTTP ERROR: ${resp.status}`);

        const data = await resp.json();
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data, timesamp: Date.now() })
        );

        setQuestions(data);
        setLoading(false);
      } catch (error) {
        throw new Error(`Fetch error, ${error}`);
      }
    };
    fetchData();
  }, []);

  const scoreUpdate = (questionId, result) => {
    if (result) {
      setCorrect([...correct, questionId]);
    } else {
      setIncorrect([...incorrect, questionId]);
    }

    setNotifMessage(result);
    setShowNotif(true);

    setCompletedQuestions((prev) => prev + 1);
  };

  useEffect(() => {
    setTimeout(() => {
      if (questions.length && completedQuestions === questions.length) {
        setShowScore(true);
        setQIdx(0);
        setCompletedQuestions(0);
      } else if (completedQuestions > 0) {
        setQIdx((prev) => prev + 1);
      }
    }, 2500);
  }, [completedQuestions]);

  const tryAgain = () => {
    //reset everything to 0
    setQIdx(0);
    setCorrect([]);
    setIncorrect([]);
    setCompletedQuestions(0);
    setShowScore(false);
  };

  const closeNotif = () => {
    setShowNotif(false);
  };

  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <>
          {showNotif ? (
            <Notification message={notifMessage} closeNotif={closeNotif} />
          ) : null}
          {showScore ? (
            <ScoreCard
              tryAgain={tryAgain}
              totalQues={questions.length}
              correctAns={correct.length}
            />
          ) : (
            <QuestionCard
              qId={qIdx}
              qData={questions[qIdx]}
              scoreUpdate={scoreUpdate}
            />
          )}
        </>
      )}
    </div>
  );
}

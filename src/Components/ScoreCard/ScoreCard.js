
import './ScoreCard.css'

export default function ScoreCard({ correctAns, totalQues, tryAgain }) {
    return (
      <div className="scorecard">
        <h1> Your Score </h1>
        <h1>{`${correctAns} / ${totalQues}`}</h1>
        <button className="tryAgain" onClick={() => tryAgain()}> Try Again </button>
      </div>
    );
  }

import { useState } from "react";

import questions from "./constants/questions.json";
import "./App.css";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const prevHandler = () => {
    setCurrentQuestion(currentQuestion - 1);
  };
  const nextHandler = () => {
    setCurrentQuestion(currentQuestion + 1);
  };
  const optionHandler = (el) => {
    // const selectedAnswer = { id: currentQuestion, value: el };
    setUserAnswers([...userAnswers, el.isCorrect]);
    setCurrentQuestion(currentQuestion + 1);
  };
  const resetHandler = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
  };
  return (
    <>
      <div className="qtn-container">
        {currentQuestion < questions.length && (
          <>
            <h3>
              Q{currentQuestion + 1}. {questions[currentQuestion].question}
            </h3>
            <div className="btn-options">
              {questions[currentQuestion].options.map((el) => (
                <button key={el.text} onClick={() => optionHandler(el)}>
                  {el.text}
                </button>
              ))}
            </div>
          </>
        )}
        {currentQuestion > questions.length - 1 && (
          <>
            <h3>Thank you !!</h3>
            <button className="btn-reset" onClick={resetHandler}>
              Reset Quiz !!
            </button>
            <p>
              you have answered{" "}
              {userAnswers.filter((answer) => answer === true).length} question
              correctly !
            </p>
            <ul>
              {questions.map((qstn, index) => {
                return (
                  <li
                    key={index}
                    className="qstn-list"
                    data-correct={userAnswers[index]}
                  >
                    <p>
                      Q{index + 1}. {qstn.question}
                    </p>
                    {!userAnswers[index] && (
                      <p>
                        Correct Answer :{" "}
                        {qstn.options.filter((el) => el.isCorrect)[0].text}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
      <div className="btn-box">
        <button onClick={prevHandler} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button
          onClick={nextHandler}
          disabled={currentQuestion > questions.length - 1}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;

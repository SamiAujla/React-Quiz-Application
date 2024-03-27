import {useState} from "react";
import resultInitialState from "./result";
import Result from "./Results/ResultViews"


const Quiz = ({ questions }) =>{
   const[currentQuestion, setCurrentQuestion] = useState(0);
   const [answerIndex, setAnswerIndex] = useState(null);
   const [answer, setAnswer] = useState(false);
   const [result, setResult] = useState(resultInitialState);
   const [showresult, setShowResult] = useState(false);
   

   const { question, choices, correctAnswer } = questions[currentQuestion];

    const onAnswerClick = (answer, index) => {
        setAnswerIndex(index);
      if(answer === correctAnswer){
         setAnswer(true);   
          }
         else{
           setAnswer(false);
        }
    };
   const onClickNext = () => {
         setAnswerIndex(null);
         setResult((prev) => 
         answer
             ? {
                ...prev,
                score: prev.score + 5,
                correctAnswers: prev.correctAnswers + 1,
          } 
          : {
             ...prev,
             wrongAnswers: prev.wrongAnswers + 1,  
            }
        );

        if(currentQuestion !== questions.length - 1){
            setCurrentQuestion((prev) => prev + 1);
        }  
        else{
          setCurrentQuestion(0);
          setShowResult(true);
        }            
    };
    const onTryAgain = () =>{
           setResult(resultInitialState);
           setShowResult(false);
    };


return ( 

    <div>
      <h1>Quiz App</h1>
     <div className="quiz-container">
      {!showresult ? (
      <>
        <span className="question-no">{currentQuestion + 1}</span>
        <span className="total-questions">/{questions.length}</span>
        <h2>{question}</h2>
        <ul>
         {
        choices.map((answer, index) =>(
            <li 
            
              onClick={() => onAnswerClick(answer, index)}
              key={answer}
              className={answerIndex === index ? 'select-answer' : null}
              >
                {answer}

            </li>
        ))
    }
   </ul>
    <div className="footer"> 
           <button onClick={() => onClickNext(answer)} disabled={answerIndex === null}>
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
           </button>
   </div>  
  </>
  ) : (    
    <Result result={result} onTryAgain={onTryAgain} TotalQuestions={questions.length} />
    )}
    </div>
  
  </div>
 );
};
export default Quiz;


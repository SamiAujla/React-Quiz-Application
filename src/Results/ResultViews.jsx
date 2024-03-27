import "./ResultStyle.css";
import { useState, useEffect } from "react";

const Result = ({TotalQuestions, result, onTryAgain}) => {

    const [name, setName] = useState('');
    const [highScores, setHighScores] = useState([]);
    const [showScores, setShowScores] = useState(false);

    useEffect(() => {
       setHighScores(JSON.parse(localStorage.getItem("highscores")) || []);
    }, []);
    
    const handleSave = () => {
        const score = {
            name,
            score: result.score
        };
       
        const newHighScores = [...highScores, score].sort((a, b) => b.score - a.score);
        setHighScores(newHighScores);
        setShowScores(true);
        localStorage.setItem('highscores', JSON.stringify(newHighScores));
    }

    const handleTryAgain = () => {
         setShowScores(false);
         setHighScores([]);
         onTryAgain();
    }
    return(
        <div className="result">
        <h3>Result</h3>
        <p>
         Total Questions: <span>{TotalQuestions}</span>
        </p> 
         <p>
         Total Score: <span>{result.score}</span>
         </p> 
         <p>
         Correct Answers: <span>{result.correctAnswers}</span>
         </p> 
         <p>
         Wrong Answers: <span>{result.wrongAnswers}</span>
         </p> 
         <button onClick={handleTryAgain}>Try Again</button> 

         {!showScores ? <>
         <h3>Enter Your Name Below <br /> To Save Your Score!</h3>
         <input placeholder="Your Name"  value={name} onChange={(e) => setName(e.target.value)}/>
         <button onClick={handleSave}>Save</button>
         </> : <>
            <table>
                <thead>
                    <tr>
                        <th>Ranking</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody>

                        {highScores.map((highscor, i) => {
                            return (
                                <tr key={`${highscor.score}${highscor.name}${i}`}>
                                <td>{i + 1}</td>
                                <td>{highscor.name}</td>
                                <td>{highscor.score}</td>
                            </tr>
                            )
                        })
                 }
                    </tbody>
            </table>
         
         </>
          }
         
   </div>

    );
}


export default Result;
import React, { useState } from 'react';

import { fetchQuizQuestions } from './utils/API'
import { QuestionState, Difficulty} from './utils/API'

import QuestionCard from './components/QuestionCard';

import { GlobalStyle, Wrapper} from './App.style'


export type AnswerObject = {
  question: string, 
  answer: string, 
  correct: boolean, 
  correctAnswer: string,
}

const TOTAL_QUESTIONS =10

const App = () => {

  const [loading, setLoading]= useState(false)  
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  

  const randomDifficultyLevel = (): string => {
    const keys = Object.values(Difficulty)    
    return keys[ keys.length * Math.random() << 0];
  };   


  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      randomDifficultyLevel())
    
    try {
      setQuestions(newQuestions)
      setScore(0)
      setUserAnswers([])
      setNumber(0)
      setLoading(false)
    } catch(error) {
      console.log(error)      
    }
}

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => { 
    if (!gameOver) {
      const answer = event.currentTarget.value;

      // checking the current answer against the correct one
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore(prev => prev + 1)
      
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prev=> [...prev, answerObject])
    }
  }
   
  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
     setGameOver(true) 
    }
    else {
      setNumber(nextQuestion)
    }
  }

  return (
    <>
    <GlobalStyle/>
    <Wrapper>
      <h3>Generic Computer Knowlege Quiz </h3>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>Start</button>): null
      }
      
      { !gameOver ? <p className="score">Score: {score}</p> : null}
      {loading && <p>Loading Questions...</p> }
      
      {!loading && !gameOver && (
      <QuestionCard questionNumber={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />
      )}
      
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
      <button className='next' onClick={nextQuestion}>
        Next Question
      </button>
      ): null }

      </Wrapper>
      </>
  );
}

export default App;

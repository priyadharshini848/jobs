import React, { useState } from "react";
import "./Q&AForum.css";

const QandAForum = () => {
  const [questions, setQuestions] = useState([
    { 
      id: 1, 
      text: "What are the best ways to prepare for technical interviews?", 
      votes: 10, 
      answers: ["Practice mock interviews.", "Focus on data structures and algorithms."]
    },
    { 
      id: 2, 
      text: "How to switch careers into data science after graduation?", 
      votes: 7, 
      answers: ["Start with Python and SQL.", "Take online courses on machine learning."] 
    },
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswers, setNewAnswers] = useState({});

  const handlePostQuestion = () => {
    if (newQuestion.trim() === "") return;

    setQuestions([
      ...questions,
      { id: questions.length + 1, text: newQuestion, votes: 0, answers: [] },
    ]);
    setNewQuestion("");
  };

  const handleUpvote = (id) => {
    const updatedQuestions = questions.map((question) =>
      question.id === id ? { ...question, votes: question.votes + 1 } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleDownvote = (id) => {
    const updatedQuestions = questions.map((question) =>
      question.id === id && question.votes > 0 
        ? { ...question, votes: question.votes - 1 } 
        : question
    );
    setQuestions(updatedQuestions);
  };

  const handleAddAnswer = (id) => {
    const answer = newAnswers[id];
    if (!answer || answer.trim() === "") return;

    const updatedQuestions = questions.map((question) =>
      question.id === id
        ? { ...question, answers: [...question.answers, answer] }
        : question
    );
    setQuestions(updatedQuestions);
    setNewAnswers({ ...newAnswers, [id]: "" });
  };

  const handleAnswerChange = (id, value) => {
    setNewAnswers({ ...newAnswers, [id]: value });
  };

  return (
    <div className="qna-container">
      <h1 className="qna-header">Q&A Forum</h1>

      {/* Question Input Section */}
      <div className="qna-input-section">
        <textarea
          className="qna-input"
          placeholder="Ask your question here..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <button className="qna-post-btn" onClick={handlePostQuestion}>
          Post Question
        </button>
      </div>

      {/* Questions List */}
      <div className="qna-questions">
        {questions.map((question) => (
          <div key={question.id} className="qna-question">
            <p className="qna-question-text">{question.text}</p>
            <div className="qna-vote-section">
              {/* Upvote Button */}
              <button
                className="qna-upvote-btn"
                onClick={() => handleUpvote(question.id)}
              >
                ↑ Upvote
              </button>

              {/* Downvote Button */}
              <button
                className="qna-downvote-btn"
                onClick={() => handleDownvote(question.id)}
              >
                ↓ Downvote
              </button>

              <span className="qna-votes">{question.votes} Votes</span>
            </div>

            {/* Answer List */}
            <div className="qna-answers">
              <h3>Answers:</h3>
              {question.answers.length > 0 ? (
                question.answers.map((answer, index) => (
                  <p key={index} className="qna-answer">
                    {answer}
                  </p>
                ))
              ) : (
                <p className="qna-no-answer">No answers yet. Be the first to answer!</p>
              )}
            </div>

            {/* Answer Input */}
            <div className="qna-answer-input-section">
              <textarea
                className="qna-answer-input"
                placeholder="Write your answer here..."
                value={newAnswers[question.id] || ""}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              />
              <button
                className="qna-answer-btn"
                onClick={() => handleAddAnswer(question.id)}
              >
                Post Answer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QandAForum;

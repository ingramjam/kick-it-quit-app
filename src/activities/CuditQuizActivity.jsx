import React, { useState } from 'react';

function CuditQuizActivity({ onBack }) {
    const questions = [
        "How often do you use cannabis?",
        "How many hours were you 'stoned' on a typical day when you were using cannabis?",
        "How often during the past 6 months did you find that you were not able to stop using cannabis once you had started?",
        "How often during the past 6 months did you fail to do what was normally expected from you because of your use of cannabis?",
        "How often in the past 6 months have you devoted a great deal of your time to obtaining, using, or recovering from cannabis?",
        "How often in the past 6 months have you used cannabis in situations that could be physically hazardous, such as driving or operating machinery?",
        "How often in the past 6 months have you had a problem with your memory or concentration after using cannabis?",
        "Have you or has anyone else ever been concerned about your cannabis use, or suggested you cut down?"
    ];

    const options = [
        ["Never", "Less than monthly", "Monthly", "Weekly", "Daily or almost daily"],
        ["0", "1-2", "3-4", "5-6", "7+"],
        ["Never", "Less than monthly", "Monthly", "Weekly", "Daily or almost daily"],
        ["Never", "Less than monthly", "Monthly", "Weekly", "Daily or almost daily"],
        ["Never", "Less than monthly", "Monthly", "Weekly", "Daily or almost daily"],
        ["Never", "Less than monthly", "Monthly", "Weekly", "Daily or almost daily"],
        ["Never", "Less than monthly", "Monthly", "Weekly", "Daily or almost daily"],
        ["No", "Yes, but not in the past 6 months", "Yes, during the past 6 months"]
    ];

    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);

    const handleAnswer = (qIndex, oIndex) => {
        setAnswers(prev => ({ ...prev, [qIndex]: oIndex }));
    };

    const calculateScore = () => {
        let totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
        // Special scoring for the last question
        if (answers[7] === 1) totalScore += 2;
        if (answers[7] === 2) totalScore += 4;
        setScore(totalScore);
    };

    if (score !== null) {
        return (
            <div className="activity-view">
                <header className="app-header"><h1>Quiz Result</h1></header>
                <button className="back-button" onClick={onBack}>← Back to Tools</button>
                <div className="quiz-result">
                    <h3>Your Score: {score}</h3>
                    <p>{score >= 13 ? "Your score suggests a high risk of cannabis-related problems. It is strongly recommended that you speak with a healthcare provider or a quit coach." : "Your score does not indicate a high risk, but if you are concerned about your cannabis use, speaking with a professional is always a good idea."}</p>
                    <p><strong>Note:</strong> This is a screening tool, not a diagnosis.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="activity-view">
            <header className="app-header"><h1>Cannabis Use Quiz</h1></header>
            <button className="back-button" onClick={onBack}>← Back</button>
            <div className="activity-header">
                <p>This is a confidential screening based on the CUDIT-R to help you understand your cannabis use.</p>
            </div>
            {questions.map((q, qIndex) => (
                <div key={qIndex} className="quiz-question">
                    <p>{qIndex + 1}. {q}</p>
                    <div className="quiz-options">
                        {options[qIndex].map((opt, oIndex) => (
                            <label key={oIndex}>
                                <input
                                    type="radio"
                                    name={`q${qIndex}`}
                                    checked={answers[qIndex] === oIndex}
                                    onChange={() => handleAnswer(qIndex, oIndex)}
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            <button className="primary-button" onClick={calculateScore}>Calculate My Score</button>
        </div>
    );
}

export default CuditQuizActivity;
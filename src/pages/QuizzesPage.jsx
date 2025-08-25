import React, { useState } from 'react';

// --- Quiz Data ---
const smokingQuizData = [ { q: "1. I smoke cigarettes to keep myself from slowing down." }, { q: "2. Handling a cigarette is part of the enjoyment of smoking it." }, { q: "3. Smoking cigarettes is pleasant and relaxing." }, { q: "4. I light up a cigarette when I feel angry about something." }, { q: "5. When I'm out of cigarettes, I find it almost unbearable." }, { q: "6. I smoke to stimulate me, to perk myself up." }, { q: "7. I enjoy the steps of lighting up." }, { q: "8. I find cigarettes pleasurable." }, { q: "9. When I feel upset, I light up a cigarette." }, { q: "10. I am very aware of when I am not smoking." } ];
const vapingQuizData = [ { q: "1. I vape to keep myself from slowing down." }, { q: "2. Handling my vape is part of the enjoyment." }, { q: "3. Vaping is pleasant and relaxing." }, { q: "4. I vape when I feel angry about something." }, { q: "5. When my battery dies, it's almost unbearable." }, { q: "6. I vape to stimulate me, to perk myself up." }, { q: "7. I enjoy the ritual of preparing my vape." }, { q: "8. I find vaping pleasurable." }, { q: "9. When I feel upset, I vape." }, { q: "10. I am very aware of when I am not vaping." } ];
const marijuanaQuizData = [ { q: "1. I use marijuana to feel more energized or focused." }, { q: "2. The ritual of preparing it is part of the enjoyment." }, { q: "3. Using marijuana is pleasant and relaxing." }, { q: "4. I use it when I feel angry or stressed." }, { q: "5. When I run out, it's almost unbearable." }, { q: "6. I use it to stimulate my mind or creativity." }, { q: "7. I enjoy the process of using it (smell, taste)." }, { q: "8. I find using marijuana pleasurable." }, { q: "9. When I feel upset, I use marijuana." }, { q: "10. I am very aware of when I am not using." } ];

const quizCategories = {
    Stimulation: { questions: [1, 6], interpretation: "You use it to feel more energized and focused." },
    Handling: { questions: [2, 7], interpretation: "You enjoy the ritual and physical actions involved." },
    PleasureRelaxation: { questions: [3, 8], interpretation: "You use it to relax and feel good." },
    CrutchTensionReduction: { questions: [4, 9], interpretation: "You use it to help deal with stress or difficult emotions." },
    CravingAddiction: { questions: [5, 10], interpretation: "You use it to deal with strong physical or psychological cravings." }
};


// --- Main Quizzes Page Component ---
function QuizzesPage() {
    const [activeQuiz, setActiveQuiz] = useState(null);

    const startQuiz = (quizType) => {
        let questions;
        let typeName;
        if (quizType === 'Smoking') {
            questions = smokingQuizData;
            typeName = 'Smoking';
        } else if (quizType === 'Vaping') {
            questions = vapingQuizData;
            typeName = 'Vaping';
        } else {
            questions = marijuanaQuizData;
            typeName = 'Marijuana';
        }
        setActiveQuiz({ type: typeName, questions: questions });
    };

    if (activeQuiz) {
        return <QuizView quiz={activeQuiz} onBack={() => setActiveQuiz(null)} />;
    }

    return (
        <div>
            <header className="app-header"><h1>Quizzes</h1></header>
            <div className="craving-menu">
                <button className="activity-button" onClick={() => startQuiz('Smoking')}>Smoking Quiz</button>
                <button className="activity-button" onClick={() => startQuiz('Vaping')}>Vaping Quiz</button>
                <button className="activity-button" onClick={() => startQuiz('Marijuana')}>Marijuana Quiz</button>
            </div>
        </div>
    );
}


// --- Quiz View & Logic Component ---
function QuizView({ quiz, onBack }) {
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const currentQuestionIndex = Object.keys(answers).length;
    const isQuizComplete = currentQuestionIndex === quiz.questions.length;

    const handleAnswer = (value) => {
        const newAnswers = { ...answers, [currentQuestionIndex]: value };
        setAnswers(newAnswers);
        
        if (Object.keys(newAnswers).length === quiz.questions.length) {
            setShowResults(true);
        }
    };
    
    if (showResults) {
        let scores = {};
        for (const category in quizCategories) {
            scores[category] = 0;
            quizCategories[category].questions.forEach(qNum => {
                scores[category] += answers[qNum - 1] || 0;
            });
        }
        const topCategory = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

        return (
             <div>
                <header className="app-header"><h1>{quiz.type} Quiz Results</h1></header>
                <button className="back-button" onClick={onBack}>← Back to Quizzes</button>
                <div className="quiz-result">
                    <h3>Your Top Motivation Appears to Be:</h3>
                    <h2>{topCategory.replace(/([A-Z])/g, ' $1').trim()}</h2>
                    <p><em>"{quizCategories[topCategory].interpretation}"</em></p>
                    <p style={{marginTop: '1.5rem', fontSize: '0.9rem'}}>This is valuable information for your quit journey. A Quit Coach can use this to build a personalized plan that addresses your specific triggers and motivations.</p>
                    <button className="primary-button" onClick={() => alert("Redirecting to a Quit Coach sign-up page...")}>
                        Connect with a Quit Coach
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const options = ["Never (1)", "Rarely (2)", "Sometimes (3)", "Often (4)", "Always (5)"];

    return (
        <div className="activity-view">
            <header className="app-header"><h1>{quiz.type} Quiz</h1></header>
            <button className="back-button" onClick={onBack}>← Back</button>
            <div className="quiz-question">
                <p style={{textAlign: 'center', color: 'var(--subtle-text-color)', marginBottom: '2rem'}}>Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
                <p>{currentQuestion.q}</p>
                <div className="quiz-answer-options">
                    {options.map((optionText, index) => (
                        <button key={index} className="activity-button" onClick={() => handleAnswer(index + 1)}>
                            {optionText}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default QuizzesPage;
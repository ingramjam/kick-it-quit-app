import React, { useState, useEffect, useRef } from 'react';

// This component contains the entire logic for the conversational intake bot.
function SupportPage() {
    const [log, setLog] = useState([]);
    const [currentView, setCurrentView] = useState({ type: 'options', options: [] });
    const [intakeData, setIntakeData] = useState({});
    const chatLogRef = useRef(null);
    const hasInitialized = useRef(false);

    // --- Bot Logic ---
    const addMessage = (text, sender, view = { type: 'options', options: [] }) => {
        const newMessage = { text, sender };
        setLog(prev => [...prev.filter(m => m.sender !== 'loading'), newMessage]);
        setCurrentView(view);
    };

    const addUserInput = (text, field, nextAction) => {
        addMessage(text, 'user');
        const newData = { ...intakeData, [field]: text };
        setIntakeData(newData);
        setLog(prev => [...prev, { text: '...', sender: 'bot' }]);
        setTimeout(() => nextAction(newData), 800);
    };

    const handleOptionClick = (option) => {
        addMessage(option.text, 'user');
        if (option.action) {
            setTimeout(() => option.action(), 600);
        }
    };

    // --- THE FULL CONVERSATION FLOW ---
    const flows = {
        start: () => {
            setLog([]); // Clear log
            setIntakeData({}); // Clear data
            addMessage("👋 Welcome to Kick It California! We're here to help you quit. Please choose an option:", 'bot', {
                type: 'options',
                options: [
                    { text: "Talk to a Quit Coach 📞", action: () => flows.coachSelected() },
                    { text: "Join our Text Program 📱", action: () => flows.textSelected() },
                    { text: "Explore Self-Help Materials 📚", action: () => flows.selfHelpSelected() }
                ]
            });
        },
        coachSelected: () => {
            addMessage("Great choice! Talking to a Quit Coach can double your chances of quitting for good.", 'bot');
            setTimeout(() => flows.askFirstName(), 1200);
        },
        askFirstName: () => {
            addMessage("First, what's your First Name?", 'bot', { type: 'input', field: 'firstName', nextAction: (data) => flows.askLastName(data) });
        },
        askLastName: (data) => {
            addMessage(`Thanks, ${data.firstName}! And your Last Name?`, 'bot', { type: 'input', field: 'lastName', nextAction: (data) => flows.askPhone(data) });
        },
        askPhone: (data) => {
            addMessage("Got it. Now, what's the best Phone Number to reach you at?", 'bot', { type: 'input', field: 'phone', inputType: 'tel', nextAction: (data) => flows.askEmail(data) });
        },
        askEmail: (data) => {
            addMessage("Perfect. And your Email address?", 'bot', { type: 'input', field: 'email', inputType: 'email', nextAction: (data) => flows.askZip(data) });
        },
        askZip: (data) => {
            addMessage("Thanks! Lastly, please enter your 5-digit California ZIP Code.", 'bot', { 
                type: 'input', 
                field: 'zip', 
                inputType: 'tel',
                validation: (zip) => /^\d{5}$/.test(zip) && zip.startsWith('9'),
                errorMessage: "Please enter a valid 5-digit California ZIP.",
                nextAction: (data) => flows.askUserType(data) 
            });
        },
        askUserType: (data) => {
            addMessage("Excellent. To make sure we provide the right support, are you here for yourself or to help someone else?", 'bot', {
                type: 'options',
                options: [
                    { text: "I'm here for myself", action: () => { addUserInput("For myself", "userType", (newData) => flows.askProductSelf(newData)); } },
                    { text: "I'm supporting someone else", action: () => { addUserInput("For someone else", "userType", (newData) => flows.endFlow(newData)); } }
                ]
            });
        },
        askProductSelf: (data) => {
            addMessage("Okay, we're here to help you. What are we helping you with today?", 'bot', {
                type: 'options',
                options: [
                    { text: "Quit Smoking 🚬", action: () => { addUserInput("Quit Smoking", "product", (newData) => flows.askScheduling(newData)); } },
                    { text: "Quit Vaping 💨", action: () => { addUserInput("Quit Vaping", "product", (newData) => flows.askScheduling(newData)); } },
                ]
            });
        },
        askScheduling: (data) => {
            addMessage("Now, let’s set up your first call with a Quit Coach. What works best for you?", 'bot', {
                type: 'options',
                options: [
                    { text: "Schedule an appointment now 📅", action: () => flows.scheduleAppointment(data) },
                    { text: "Call me as soon as possible ⚡", action: () => { addUserInput("Call ASAP", "schedule", (newData) => flows.endFlow(newData)); } }
                ]
            });
        },
        scheduleAppointment: (data) => {
            addMessage("Okay, let's find a time.", 'bot');
            setTimeout(() => addMessage("[ Calendar interface would appear here. We'll simulate a selection for this demo. ]", 'bot'), 800);
            setTimeout(() => {
                const fakeAppointment = "Thursday, August 28th at 2:30 PM PDT";
                addUserInput(fakeAppointment, "appointment", (newData) => flows.endFlow(newData));
            }, 2500);
        },
        textSelected: () => {
            addMessage("To join our text program, just text 'Quit Vaping' or 'Quit Smoking' to 66819. You'll get tips and support right on your phone.", 'bot', {
                type: 'options',
                options: [{ text: "Start Over", action: () => flows.start() }]
            });
        },
        selfHelpSelected: () => {
             addMessage("Our website has free toolkits and resources you can explore at your own pace.", 'bot', {
                type: 'options',
                options: [
                    { text: "Take me to the resources", action: () => window.open('https://kickitca.org/quit-all-kit', '_blank') },
                    { text: "Start Over", action: () => flows.start() }
                ]
            });
        },
        endFlow: (data) => {
            addMessage("Thank you! All your information has been received. A Quit Coach will be in touch soon.", 'bot', {
                type: 'options',
                options: [{ text: "Start Over", action: () => flows.start() }]
            });
            console.log("Final Intake Data:", data);
        }
    };
    
    useEffect(() => {
        if (!hasInitialized.current) {
            flows.start();
            hasInitialized.current = true;
        }
    }, []);
    
    useEffect(() => {
        if(chatLogRef.current) chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }, [log]);

    return (
        <div className="chat-container">
            <header className="app-header"><h1>Support Bot</h1></header>
            <div className="chat-log" ref={chatLogRef}>
                {log.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}-message`}>{msg.text}</div>
                ))}
            </div>
            {currentView.type === 'options' && (
                <div className="chat-options">
                    {currentView.options.map(opt => (
                        <button key={opt.text} onClick={() => handleOptionClick(opt)}>{opt.text}</button>
                    ))}
                </div>
            )}
            {currentView.type === 'input' && (
                <InputView 
                    field={currentView.field}
                    inputType={currentView.inputType} 
                    onInputSubmit={currentView.nextAction} 
                    validation={currentView.validation}
                    errorMessage={currentView.errorMessage}
                />
            )}
        </div>
    );
}

// --- Input Component for the Bot ---
const InputView = ({ onInputSubmit, field, inputType = 'text', validation, errorMessage }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value.trim()) return;
        if (validation && !validation(value)) {
            setError(errorMessage);
            return;
        }
        setError('');
        onInputSubmit(value);
    };

    return (
        <form className="input-area" onSubmit={handleSubmit}>
            <div style={{width: '100%'}}>
                <input
                    type={inputType}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder={`Enter ${field}...`}
                    autoFocus
                />
                {error && <div className="error-message">{error}</div>}
            </div>
            <button type="submit">Enter</button>
        </form>
    );
};

export default SupportPage;
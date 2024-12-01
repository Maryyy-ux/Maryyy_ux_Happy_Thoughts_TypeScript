import React, { useState } from 'react';
import './ThoughtForm.css';

interface ThoughtFormProps {
    addThought: (thought: { _id: string; message: string; hearts: number; createdAt: string }) => void;
}

const ThoughtForm: React.FC<ThoughtFormProps> = ({ addThought }) => {
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const maxChars = 140;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (message.length < 5 || message.length > maxChars) {
            setError('Message must be between 5 and 140 characters');
            return;
        }

        fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        })
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then((data) => {
                addThought(data);
                setMessage('');
                setError('');
                setIsTyping(false);
            })
            .catch(() => setError('Failed to send message'));
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                    setIsTyping(true);
                }}
                maxLength={maxChars}
                placeholder="What's making you happy today?"
            />
            <p>{maxChars - message.length} characters remaining</p>
            {error && <p className="error">{error}</p>}
            <button type="submit">❤️Send Happy Thought❤️</button>
            {isTyping && <div className="flowers">🌸🌼🌺</div>}
        </form>
    );
};

export default ThoughtForm;

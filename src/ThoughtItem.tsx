import React, { useState, useEffect } from 'react';

interface ThoughtItemProps {
    thought: {
        _id: string;
        message: string;
        hearts: number;
        createdAt: string;
    };
    onLike: (id: string) => void;
}

const ThoughtItem: React.FC<ThoughtItemProps> = ({ thought, onLike }) => {
    const [isNew, setIsNew] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsNew(false), 60000);
        return () => clearTimeout(timer);
    }, []);

    const formatDate = (date: string) => {
        const d = new Date(date);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={`thought-item ${isNew ? 'new-thought' : ''}`}>
            <p>{thought.message}</p>
            <div className="thought-footer">
                <span className="date-time">{formatDate(thought.createdAt)}</span>
                <div className="like-button">
                    <button onClick={() => onLike(thought._id)}>❤️</button>
                    <span className="like-counter">{thought.hearts}</span>
                </div>
            </div>
        </div>
    );
};

export default ThoughtItem;

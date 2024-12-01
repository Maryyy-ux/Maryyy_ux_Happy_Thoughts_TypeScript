import React from 'react';
import ThoughtItem from './ThoughtItem';

interface Thought {
    _id: string;
    message: string;
    hearts: number;
    createdAt: string;
}

interface ThoughtListProps {
    thoughts: Thought[];
    onLike: (id: string) => void;
}

const ThoughtList: React.FC<ThoughtListProps> = ({ thoughts, onLike }) => {
    const limitedThoughts = thoughts
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4);

    return (
        <div className="thought-list">
            {limitedThoughts.map((thought) => (
                <ThoughtItem key={thought._id} thought={thought} onLike={onLike} />
            ))}
        </div>
    );
};

export default ThoughtList;
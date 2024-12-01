import { useState, useEffect } from 'react';

import ThoughtForm from './ThoughtForm';
import ThoughtList from './ThoughtList';
import HappyIcon from './HappyIcon';

interface Thought {
  _id: string;
  message: string;
  hearts: number;
  createdAt: string;
}

function App() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts')
      .then((res) => res.json())
      .then((data) => {
        setThoughts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching thoughts:', error);
        setLoading(false);
      });
  }, []);

  const addThought = (newThought: Thought) => {
    setThoughts((prevThoughts) => [newThought, ...prevThoughts]);
  };

  const handleLike = (id: string) => {
    fetch(`https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${id}/like`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then(() => {
        setThoughts((prevThoughts) =>
          prevThoughts.map((thought) =>
            thought._id === id ? { ...thought, hearts: thought.hearts + 1 } : thought
          )
        );
      })
      .catch((error) => console.error('Error updating likes:', error));
  };

  return (
    <div className="App">
      <h1>Happy Thoughts TypeScript</h1>
      <HappyIcon />
      <ThoughtForm addThought={addThought} />
      {loading ? <p>Loading thoughts...</p> : <ThoughtList thoughts={thoughts} onLike={handleLike} />}
    </div>
  );
}

export default App;
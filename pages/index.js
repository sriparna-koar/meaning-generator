


import { useState } from 'react';
import axios from 'axios';


const Home = () => {
  const [inputWord, setInputWord] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [loading, setLoading] = useState(false);
  const [pronunciation, setPronunciation] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputWord(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`);
  
      if (response.data.length > 0) {
        const definition = response.data[0].meanings[0]?.definitions[0]?.definition;
        setParagraph(definition || 'No definition found for the given word.');
        const pronunciationText = response.data[0]?.phonetics[0]?.text;
        setPronunciation(pronunciationText || '');
        setError(null); // Reset the error state
      } else {
        setParagraph('No definition found for the given word.');
        setError(null); // Reset the error state
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setParagraph('');
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleClear = () => {
    setInputWord('');
    setParagraph('');
    setPronunciation('');
    setError(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const styleId = 'darkModeStyles';
    const existingStyle = document.getElementById(styleId);

    if (darkMode && existingStyle) {
      existingStyle.parentNode.removeChild(existingStyle);
    } else if (!darkMode && !existingStyle) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        body {
          background-color: #121212;
          color: #ffffff;
        }
      `;
      document.head.appendChild(style);
    }
  };

 
  const addToHistory = () => {
    setHistory([inputWord, ...history]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };
  const shareViaEmail = () => {
    const subject = encodeURIComponent('Shared Word Paragraph');
    const body = encodeURIComponent(`Check out this word paragraph: ${paragraph}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const ErrorComponent = ({ message }) => (
    <div className="error">
      <p>{message}</p>
    </div>
  );

  return (
    <div className="container">
      <h1>Word Paragraph Generator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a word:
          <input type="text" value={inputWord} onChange={handleInputChange} />
        </label>
        <button type="submit" onClick={addToHistory}>
          Generate Paragraph
        </button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {paragraph && <p>{paragraph}</p>}
      {pronunciation && <p>Pronunciation: {pronunciation}</p>}
      <button type="button" onClick={toggleDarkMode}>
        Toggle Dark Mode
      </button>
   
    
      <button type="button" onClick={shareViaEmail}>
        Share via Email
      </button>
      {favorites.length > 0 && (
        <div>
          <h2>Favorites</h2>
          <ul>
            {favorites.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </div>
      )}
      {history.length > 0 && (
        <div>
          <h2>Word History</h2>
          <ul>
            {history.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
          <button type="button" onClick={handleClearHistory}>
        Clear History
      </button>
        </div>
      )}
      {error && <ErrorComponent message={error.message} />}
    </div>
  );
};

export default Home;

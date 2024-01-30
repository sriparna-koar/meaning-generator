// import { useState } from 'react';
// import axios from 'axios';

// const Home = () => {
//   const [inputWord, setInputWord] = useState('');
//   const [paragraph, setParagraph] = useState('');

//   const handleInputChange = (e) => {
//     setInputWord(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`);
      
//       if (response.data.length > 0) {
//         const definition = response.data[0].meanings[0]?.definitions[0]?.definition;
//         setParagraph(definition || 'No definition found for the given word.');
//       } else {
//         setParagraph('No definition found for the given word.');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error.message);
//       setParagraph('Error fetching data. Please try again later.');
//     }
//   };

//   return (
//     <div>
//       <h1>Word Paragraph Generator</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Enter a word:
//           <input type="text" value={inputWord} onChange={handleInputChange} />
//         </label>
//         <button type="submit">Generate Paragraph</button>
//       </form>
//       {paragraph && <p>{paragraph}</p>}
//     </div>
//   );
// };

// export default Home;
import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [inputWord, setInputWord] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [loading, setLoading] = useState(false);

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
      } else {
        setParagraph('No definition found for the given word.');
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      if (error.response) {
        setParagraph(`Error: ${error.response.data.title}`);
      } else if (error.request) {
        setParagraph('Error: No response from the server. Please try again later.');
      } else {
        setParagraph('Error fetching data. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputWord('');
    setParagraph('');
  };

  return (
    <div>
      <h1>Word Paragraph Generator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a word:
          <input type="text" value={inputWord} onChange={handleInputChange} />
        </label>
        <button type="submit">Generate Paragraph</button>
        <button type="button" onClick={handleClear}>Clear</button>
      </form>
      {loading && <p>Loading...</p>}
      {paragraph && <p>{paragraph}</p>}
    </div>
  );
};

export default Home;

// Add some basic styling
<style jsx>{`
  div {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
  }
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  form {
    margin-bottom: 20px;
  }
  input {
    padding: 8px;
    margin-right: 8px;
  }
  button {
    margin-top: 8px;
    padding: 8px 16px;
    background-color: #0070f3;
    color: white;
    border: none;
    cursor: pointer;
    margin-right: 8px;
  }
  p {
    margin-top: 20px;
    font-size: 16px;
  }
  p.loading {
    color: #0070f3;
  }
`}</style>;

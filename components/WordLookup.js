import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchWordInfo = async (word) => {
  const response = await axios.get(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {
    headers: {
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
      'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
    },
  });
  return response.data;
};

const WordLookup = () => {
  const [inputWord, setInputWord] = useState('');
  const { data, isLoading, isError, error } = useQuery(['wordInfo', inputWord], () => fetchWordInfo(inputWord), {
    enabled: !!inputWord,
  });

  return (
    <div>
      <input
        type="text"
        value={inputWord}
        onChange={(e) => setInputWord(e.target.value)}
        placeholder="Enter a word..."
      />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h2>{data.word}</h2>
          <p>{data.definition}</p>
        </div>
      )}
    </div>
  );
};

export default WordLookup;

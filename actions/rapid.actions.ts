// actions/rapid.actions.ts
'use server';
import axios from 'axios';

export const getExcersice = async () => {
  const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises',
    params: {
      limit: '10',
      offset: '0',
    },
    headers: {
      'x-rapidapi-key': '80ada9b02fmshb13dfd860036d12p183e03jsn4d0edc81ffe8',
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    return [];
  }
};

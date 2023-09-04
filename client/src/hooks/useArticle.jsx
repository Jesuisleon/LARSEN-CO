import { useState } from 'react';
import axios from 'axios';

export const useArticle = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getArticle = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('/api/article/all')
      const json = response.data
      setIsLoading(false);
      return json;
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }

  }
  return { getArticle, error, isLoading };
}
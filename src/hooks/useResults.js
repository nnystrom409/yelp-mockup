import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async (searchTerm) => {
    try {
      const response = await axios.get('/search', {
        params: {
          limit: 50,
          term,
          location: 'san jose'
        }
      });
      setResults(response.data.businesses);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }

  }

  useEffect(() => {
    searchApi('pasta')
  }, [searchApi, results, errorMessage]);

  return [searchApi, results, errorMessage];
};

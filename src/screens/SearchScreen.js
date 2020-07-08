import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import axios from '../api/yelp';
import ResultsList from '../components/ResultsList'

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async (searchTerm) => {
    try {
      const response = await axios.get('/search', {
        params: {
          limit: 50,
          term,
          location: 'los angeles'
        }
      });
      setResults(response.data.businesses);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }

  }

  const filterResultsByPrice = (price) => {
    return results.filter(result => {
      return result.price === price;
    });
  };

  useEffect(() => {
    searchApi('pasta')
  }, []);

  return (
    <>
     <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      <Text>{errorMessage ? <Text>{errorMessage}</Text> : null}</Text>
      <ScrollView>
        <ResultsList results={filterResultsByPrice('$')} title="Cost Effective"/>
        <ResultsList results={filterResultsByPrice('$$')} title="Bit Pricier"/>
        <ResultsList results={filterResultsByPrice('$$$')} title="Big Spender" />
      </ScrollView>
    </>
  )
};

const styles = StyleSheet.create({});

export default SearchScreen;

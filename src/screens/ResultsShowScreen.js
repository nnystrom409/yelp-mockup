import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground } from 'react-native';
import yelp from '../api/yelp';
import { AntDesign } from '@expo/vector-icons';

const ResultsShowScreen = ({ navigation }) => {
const [result, setResult] = useState(null);
const id = navigation.getParam('id');
const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    console.log(response.data);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result){
    return null;
  }
  const AnyReactComponent = ({ result }) => {
    return (
      <View>{result}</View>
    )
  }

  const UserListResults = ({ result }) => {
    console.log(result)
    if (result.rating == 1) return <AntDesign name="star" style={styles.iconStyle}/>;
    if (result.rating == 2) return (<View style={styles.backgroundStyle}><AntDesign name="star" style={styles.iconStyle}/><AntDesign name="star" style={styles.iconStyle}/></View>);
    if (result.rating == 3) return (<View style={styles.backgroundStyle}><AntDesign name="star" style={styles.iconStyle}/><AntDesign name="star" style={styles.iconStyle}/><AntDesign name="star" style={styles.iconStyle}/></View>);
    if (result.rating == 4) return (<View style={styles.backgroundStyle}><AntDesign name="star" style={styles.iconStyle}/><AntDesign name="star" style={styles.iconStyle}/><AntDesign name="star" style={styles.iconStyle}/><AntDesign name="star" style={styles.iconStyle}/></View>);
    if (result.rating == 4.5) return (<View style={styles.backgroundStyle}><AntDesign name="star" style={styles.iconStyle}/><AntDesign name="star" style={styles.iconStyle}/><AntDesign name="star" style={styles.iconStyle}/><AntDesign name="star" style={styles.iconStyle}/><AntDesign name="star" style={styles.iconStyleHalf}/></View>);
    if (result.rating == 5) return (
      <View style={styles.backgroundStyle}>
        <AntDesign name="star" style={styles.iconStyle}/>
        <AntDesign name="star" style={styles.iconStyle}/>
        <AntDesign name="star" style={styles.iconStyle}/>
        <AntDesign name="star" style={styles.iconStyle}/>
        <AntDesign name="star" style={styles.iconStyle}/>
      </View>);
    return null;
    }

  return(
    <View>
      <Text style={styles.title}>{result.name}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={true}
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return (
            <View>
              <ImageBackground style={styles.image} source={{ uri: item}}>
                </ImageBackground>
            </View>
          )
        }}
      />
      <UserListResults result={result}/>
      <Text style={styles.regular}>{result.price}</Text>
      <Text style={styles.regular}>{result.location.address1}</Text>
      <Text style={styles.regular}>{result.location.city}</Text>
      
      </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 10,
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    marginBottom: 10
  },
  image: {
    height: 200,
    width: 300
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 8,
    marginBottom: 10
  },
  regular: {
    fontSize: 18,
    marginLeft: 20,
    marginBottom: 3,
    marginTop: 4,
    marginBottom: 5
  },
  iconStyle: {
    fontSize: 35,
     paddingHorizontal: 3,
     flexDirection: "row",
     alignItems: "center"
  },
  iconStyleHalf: {
    fontSize: 35,
     paddingHorizontal: 3,
     flexDirection: "row",
     alignItems: "center",
    width: 22
  }
});

export default ResultsShowScreen;

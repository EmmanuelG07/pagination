import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios'



const ITEMS_PER_PAGE = 10;


const App = () => {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [laoding, setLoading] = useState(false);
  const [error, setError] = useState(false)


  

  const fetchData = async () => {
    setError(false)
    setLoading(true);
    try{
      const res = await axios.get(`https://jsonplaceholder.typicode.com/comments`);
      setData(res.data);
    } catch(err) {                       
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  

  const currentPageData = data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)


  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };


  // console.log(currentPageData);
 
  return(
    <View style={{flex: 1}}>
    <Text style={{fontSize: 40, fontWeight: 'bold', textAlign: 'center'}}>Pagination</Text>
    {error && <Text>error occurred while fecthing</Text>}
    <FlatList  
    data={currentPageData}
    keyExtractor={(item) => item.id}
    renderItem={({item}) => (
      <View style={styles.box}>
      <Text>{item.name}</Text>
      </View>
    )}
    ListFooterComponent={laoding ? <Text>Loading....</Text> : null}
    />
    <View style={styles.buttons}>
    <TouchableOpacity onPress={handlePrevious}>
    <Text style={{backgroundColor: 'black', padding : 10, paddingLeft: 20, color: '#fff', paddingRight: 20, borderRadius: 5}}>Previous</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleNext}>
    <Text style={{backgroundColor: 'black', padding : 10, paddingLeft: 30, color: '#fff', paddingRight: 30, borderRadius: 5,}}>Next</Text>
    </TouchableOpacity>
  </View>
  
    
  
    </View>
    
  )
}



const styles = StyleSheet.create({
  box: {
    margin: 10,
    padding: 18,
    borderRadius: 5,
    backgroundColor: 'pink',
},

buttons :{
 flexDirection: 'row',
 justifyContent: 'space-around',
 margin: 10,

}
})

export default App;

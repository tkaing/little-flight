import React, { useEffect, useState } from 'react'
import { View, Button, Text} from 'native-base'
import { SearchBar } from 'react-native-elements';

const SearchBarComponent = (
  { 
    state: {
      username, setUsername
    }
   }
) => { 

useEffect(() => {
  console.log(username);
}, [username]);
  
  return (
    <View style={ styles.main_container }>
      <SearchBar
        placeholder="Search a DRONER"
        onChangeText={ _value => setUsername(_value) }
        value={ username }
      />
    </View>
  )
}

const styles = {
  main_container: {
    flex: 1,
    marginTop: 10
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#f8fce6',
    borderWidth: 1,
    color: '#f8fce6',
    paddingLeft: 5
  }
};


export default SearchBarComponent;
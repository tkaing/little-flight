import React, { useEffect, useState } from 'react'
import { View, Input, Button, Text, Icon} from 'native-base'
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import * as api_default from "../api/api_default";
import * as api_secure_store from "../api/api_secure_store";



const SearchBar = (
    { }
) => {
        const [username, setUsername] = useState();
        const on = {
        Search: async ( username ) => {
            try {
                const currentToken = await SecureStore.getItemAsync(api_secure_store.TOKEN);
                const apiResponse = await axios.post(api_default.person.add_friend(), {
                    username: username
                },
                {
                headers: {'Authorization': `Bearer ${ currentToken }`}, timeout: 5000
                })
                const apiData = apiResponse.data;
                console.log(apiData);
            } catch (failure) {
                console.log(failure.response);
            }
        },
        List: async ( ) => {
            try {
                const currentToken = await SecureStore.getItemAsync(api_secure_store.TOKEN);
                const apiResponse = await axios.get(api_default.person.list_of_friends(), {
                    headers: {'Authorization': `Bearer ${ currentToken }`}, timeout: 5000
                });
                const apiData = apiResponse.data;
                console.log(apiData);
            } catch (failure) {
                console.log(failure);
            }
        }
    };

    useEffect(() => {
        console.log(username);
    }, [username]);

    return (
      <View style={styles.main_container}>
        {/* <TextInput style={styles.textinput} placeholder='Droner sur LittleFlight' onChangeText={ (value) => setUsername(value)}/>
        <Button title='Rechercher' onPress={() => {
            on.Search(username);
        }}/> */}
        <Header searchBar rounded>
          <Item>
            <Icon name="search" />
                <Input 
                    placeholder="Droner sur LF"
                    borderRadius={10}
                    py={1}
                    px={2}
                    bg="gray.200"
                    variant="filled"
                    onChangeText={ (value) => setUsername(value)}
                />
            <Icon name="md-people-circle" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      </View>
    )
}

const styles = {
  main_container: {
    flex: 1,
    marginTop: 20
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

export default SearchBar
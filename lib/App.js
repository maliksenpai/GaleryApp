/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {createContext, useEffect, useState} from 'react';
import {AppState, LogBox, StyleSheet, View,} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {applyMiddleware, createStore} from "redux";
import {MainReducer} from "./redux/MainReducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {DetailPage} from "./page/DetailPage";
import {FavoriteSchema} from "./data/database/favoritesDatabase";
import Realm from "realm";
import {MainPage} from "./page/MainPage";
import {MapPage} from "./page/MapPage";


LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
const store = createStore(MainReducer, applyMiddleware(thunk));

export const DatabaseContext = createContext(null);

const App = () => {

    const [init, setInit] = useState(false)
    const [realm, setRealm] = useState(null)
    useEffect(() => {
        Realm.open({
            schema: [FavoriteSchema]
        }).then(value => {
            setRealm(value)
            setInit(true)
        });
        AppState.addEventListener('change', (nextState) => {
            if (nextState === 'inactive') {
                realm.close()
            }
        })
    }, [])

    const Stack = createNativeStackNavigator();

    return <Provider store={store}>
        <DatabaseContext.Provider value={{realm}}>
            {
                init ?
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName={"MainPage"}>
                            <Stack.Screen name={"MainPage"} component={MainPage} options={{headerShown: false}}/>
                            <Stack.Screen name={"DetailPage"} component={DetailPage}/>
                            <Stack.Screen name={"MapPage"} component={MapPage}/>
                        </Stack.Navigator>
                    </NavigationContainer> :
                    <View/>
            }
        </DatabaseContext.Provider>
    </Provider>

};

const styles = StyleSheet.create({});

export default App;

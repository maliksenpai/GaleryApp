import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ArtPage} from "./ArtPage";
import {FavoritesPage} from "./FavoritesPage";
import {GalleriesPage} from "./GalleriesPage";
import {Icon} from "react-native-elements";


const Tab = createBottomTabNavigator();

export const MainPage = () => {

    return <Tab.Navigator>
        <Tab.Screen name={"Art"} component={ArtPage} options={{
            tabBarIcon: ({color}) => (
                <Icon name="article" color={color} size={20}/>
            )
        }}/>
        <Tab.Screen name={"Favorite"} component={FavoritesPage} options={{
            tabBarIcon: ({color}) => (
                <Icon name="favorite" color={color} size={20}/>
            ),
            tabBarOptions: {activeTintColor: 'red'}
        }}/>
        <Tab.Screen name={"Galleries"} component={GalleriesPage} options={{
            tabBarIcon: ({color}) => (
                <Icon name="place" color={color} size={20}/>
            )
        }}/>
    </Tab.Navigator>
}

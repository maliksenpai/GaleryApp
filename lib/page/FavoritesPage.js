import React, {useContext, useEffect, useState} from "react";
import {Pressable, ScrollView, View} from "react-native";
import {DatabaseContext} from "../App";
import {ArtCard} from "../view/ArtCard";

export const FavoritesPage = (props) => {

    const {realm} = useContext(DatabaseContext)
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        setFavorites(realm.objects("Favorite"))
        realm.addListener("change", (favoriteArts, changes) => {
            setFavorites(realm.objects("Favorite"))
        })
    }, [])

    return <View>
        <ScrollView>
            {
                favorites.map(element => {
                    return <Pressable key={element.id} onPress={() => {
                        props.navigation.navigate("DetailPage", {
                            element
                        })
                    }}>
                        <ArtCard art={element} realm={realm}/>
                    </Pressable>
                })
            }
        </ScrollView>
    </View>
}

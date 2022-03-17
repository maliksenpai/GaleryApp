import React, {useContext, useEffect, useState} from "react";
import {ArtCard} from "../view/ArtCard";
import {ActivityIndicator, Dimensions, Pressable, ScrollView, StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {getArts} from "../redux/art/ArtActions";
import {DatabaseContext} from "../App";
import {artSlice} from "../redux/art/ArtSlice";
import {Icon, Input} from "react-native-elements";

export const ArtPage = (props) => {

    const dispatch = useDispatch()
    const [filter, setFilter] = useState("")
    const artActions = artSlice.actions
    const artState = useSelector(state => state.artSlice)
    const {realm} = useContext(DatabaseContext)

    useEffect(() => {
        dispatch(getArts({filter: "", page: 1, realm: realm}))
        realm.addListener("change", () => {
            dispatch(artActions.updateArts({realm: realm}))
        })
    }, [])

    const handleSearch = () => {
        dispatch(artActions.clearArts())
        dispatch(getArts({filter: filter, page: 1, realm}))
    }

    return <ScrollView onScroll={(event) => {
        if (isCloseToBottom(event.nativeEvent)) {
            dispatch(getArts({filter: filter, page: artState.page + 1, realm: realm}))
        }
    }}>
        <View style={styles.artCardList}>
            <View style={styles.searchArea}>
                <Input
                    placeholder={"Search"}
                    value={filter}
                    containerStyle={{width: "80%"}}
                    onChangeText={(text) => setFilter(text)}
                />
                <Icon
                    containerStyle={styles.searchButton}
                    color={"white"}
                    name={"search"}
                    onPress={handleSearch}
                />
            </View>
            {
                artState.arts.map(element => {
                    return <Pressable key={element.id} onPress={() => {
                        props.navigation.navigate("DetailPage", {
                            element
                        })
                    }}>
                        <ArtCard art={element} realm={realm}/>
                    </Pressable>
                })
            }
            {
                artState.loading && artState.arts.length === 0 ?
                    <View style={styles.loadingView}>
                        <ActivityIndicator/>
                    </View> :
                    artState.isEmpty ?
                        null :
                        <ActivityIndicator size={"large"}/>
            }
        </View>
    </ScrollView>
}

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
}

const styles = StyleSheet.create({
    artCardList: {
        display: "flex",
        width: "100%",
        alignItems: "center",
    },
    searchArea: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    searchButton: {
        backgroundColor: "red",
        padding: 5,
        borderRadius: 100,
    },
    loadingView: {
        display: "flex",
        width: "100%",
        height: Dimensions.get("window").height,
        alignItems: "center",
        justifyContent: "center"
    }
});

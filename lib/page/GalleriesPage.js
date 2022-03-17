import React, {useEffect, useState} from "react";
import {ActivityIndicator, Dimensions, Pressable, ScrollView, StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {getGalleries} from "../redux/gallery/GalleryActions";
import {GalleryCard} from "../view/GalleryCard";
import {gallerySlice} from "../redux/gallery/GallerySlice";
import {Icon, Input} from "react-native-elements";
import openMap from 'react-native-open-maps';

export const GalleriesPage = (props) => {

    const dispatch = useDispatch()
    const galleriesActions = gallerySlice.actions
    const galleriesState = useSelector(state => state.galleriesSlice)
    const [filter, setFilter] = useState("")


    useEffect(() => {
        dispatch(getGalleries({filter: "", page: 1}))
    }, [])

    const handleSearch = () => {
        dispatch(galleriesActions.clearGalleries())
        dispatch(getGalleries({filter: filter, page: 1}))
    }

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    }


    return <ScrollView onScroll={(event) => {
        if (isCloseToBottom(event.nativeEvent)) {
            dispatch(getGalleries({filter: filter, page: galleriesState.page + 1}))
        }
    }}>
        <View style={styles.galleriesCardList}>
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
                galleriesState.galleries.map(element => {
                    return <Pressable key={element.id} onPress={() => {
                        openMap({
                            zoom: 1,
                            latitude: element.latitude,
                            longitude: element.longitude,
                            query: "Chicago" + element.title
                        })
                    }}>
                        <GalleryCard gallery={element}/>
                    </Pressable>
                })
            }
            {
                galleriesState.loading && galleriesState.galleries.length === 0 ?
                    <View style={styles.loadingView}>
                        <ActivityIndicator/>
                    </View> :
                    galleriesState.isEmpty ?
                        null :
                        <ActivityIndicator size={"large"}/>
            }
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    galleriesCardList: {
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
})

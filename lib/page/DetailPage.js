import React, {useContext, useEffect, useState} from "react";
import {Dimensions, ScrollView, StyleSheet, View} from "react-native";
import {Chip, Icon, Image, Text} from "react-native-elements";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {getArtDetailData} from "../data/api/artApi";
import ImageView from "react-native-image-viewing";
import {DatabaseContext} from "../App";
import {handleFavoriteButton} from "../data/database/favoritesDatabase";

export const DetailPage = (props) => {

    const [detail, setDetail] = useState(null)
    const [art, setArt] = useState(props.route.params.element)
    const {realm} = useContext(DatabaseContext)
    const [visibleImageViewer, setVisibleImageViewer] = useState(false)

    useEffect(() => {
        props.navigation.setOptions({
            title: props.route.params.element.title,
            headerRight: () => (
                <Icon
                    name={art.favorited ? "favorite" : "favorite-outline"}
                    color={"red"}
                    onPress={() => {
                        setArt({...art, favorited: !art.favorited})
                        handleFavoriteButton({
                            art: {...props.route.params.element, favorited: art.favorited},
                            realm: realm
                        })
                    }}
                />
            ),
        })
        getArtDetailData({id: props.route.params.element.id}).then(value => {
            setDetail(value)
        })
    }, [])

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Icon
                    name={art.favorited ? "favorite" : "favorite-outline"}
                    color={"red"}
                    onPress={() => {
                        setArt({...art, favorited: !art.favorited})
                        handleFavoriteButton({
                            art: {...props.route.params.element, favorited: art.favorited},
                            realm: realm
                        })
                    }}
                />
            ),
        })
    }, [art])

    return <ScrollView>
        <View style={styles.detailView}>
            <Image
                style={styles.cardImage}
                source={{uri: `https://www.artic.edu/iiif/2/${props.route.params.element.image_id}/full/200,/0/default.jpg`}}
                onPress={() => setVisibleImageViewer(true)}
            />
            <Text style={styles.cardTitle}> {props.route.params.element.title} </Text>
            {
                detail ?
                    <View style={styles.detailDesc}>
                        <Text style={{fontWeight: "800"}}> {detail.artist_display} </Text>
                        <View style={styles.detailChips}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                                {
                                    detail.artist_titles.map(element => {
                                        return <View style={styles.chipArea}>
                                            <Chip title={element} type={"outline"}/>
                                        </View>
                                    })
                                }
                                {
                                    detail.category_titles.map(element => {
                                        return <View style={styles.chipArea}>
                                            <Chip title={element} type={"outline"}/>
                                        </View>
                                    })
                                }
                            </ScrollView>

                        </View>
                        <Text> {descriptionDetail(detail)} </Text>
                    </View>
                    :
                    <SkeletonPlaceholder>
                        <SkeletonPlaceholder.Item width={Dimensions.get("window").width * 0.9} height={300}/>
                    </SkeletonPlaceholder>
            }
            <ImageView
                images={[{uri: `https://www.artic.edu/iiif/2/${props.route.params.element.image_id}/full/3200,/0/default.jpg`}]}
                imageIndex={0}
                visible={visibleImageViewer}
                onRequestClose={() => setVisibleImageViewer(false)}
                swipeToCloseEnabled={false}
            />
        </View>
    </ScrollView>
}

const descriptionDetail = (element) => {
    return `
    ${element.publication_history ? element.publication_history : ""} \n\n 
    ${element.exhibition_history ? element.exhibition_history : ""} \n\n 
    ${element.provenance_text ? element.provenance_text : ""} \n\n
    ${element.inscriptions ? element.inscriptions : ""}`
}

const styles = StyleSheet.create({
    detailView: {
        width: "100%",
        padding: 10,
        display: "flex",
        alignItems: "center"
    },
    cardImage: {
        height: 250,
        width: Dimensions.get("window").width * 0.95
    },
    cardTitle: {
        fontSize: 25,
        alignSelf: "flex-start",
        fontWeight: "bold"
    },
    detailDesc: {
        alignSelf: "flex-start",
        padding: 10,
    },
    detailChips: {
        display: "flex",
        paddingVertical: 10,
        flexDirection: "row",
    },
    chipArea: {
        paddingHorizontal: 10
    }
});

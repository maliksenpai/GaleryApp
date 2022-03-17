import React from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import {Icon, Image, Text} from "react-native-elements";
import {handleFavoriteButton} from "../data/database/favoritesDatabase";

export const ArtCard = (props) => {

    return <View style={styles.cardBody}>
        <Image style={styles.cardImage}
               source={{uri: `https://www.artic.edu/iiif/2/${props.art.image_id}/full/200,/0/default.jpg`}}/>
        <Text style={styles.cardTitle}> {props.art.title} </Text>
        <View style={styles.cardSubtitleArea}>
            <Text style={styles.cardSubtitle}> {props.art.artist_title} </Text>
            <Text style={styles.cardSubtitle}> {props.art.classification_title} </Text>
        </View>
        <View style={styles.cardSubtitleArea}>
            <Text
                style={[styles.cardSubtitle, styles.cardGreyText]}> {new Date(props.art.last_updated_source).toLocaleDateString()} </Text>
            <Icon name={props.art.favorited ? "favorite" : "favorite-outline"} color={"red"}
                  onPress={() => handleFavoriteButton({art: props.art, realm: props.realm})}/>
        </View>
    </View>
}


const styles = StyleSheet.create({
    cardBody: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderWidth: 0.1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardImage: {
        height: 180,
        width: Dimensions.get("window").width * 0.8
    },
    cardTitle: {
        fontSize: 15,
        alignSelf: "flex-start",
        fontWeight: "bold"
    },
    cardSubtitleArea: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        width: Dimensions.get("window").width * 0.8,
        justifyContent: "space-between"
    },
    cardSubtitle: {
        fontSize: 12,
        alignSelf: "flex-start",
        fontWeight: "300"
    },
    cardGreyText: {
        color: "grey"
    }
});


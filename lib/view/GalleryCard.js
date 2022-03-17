import {Dimensions, StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";
import React from "react";

export const GalleryCard = (props) => {

    return <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>
            {props.gallery.title}
        </Text>
        <View style={styles.cardSubtitleArea}>
            <Text style={styles.cardSubtitle}> {props.gallery.type} </Text>
            <Text style={styles.cardSubtitle}> {new Date(props.gallery.timestamp).toLocaleDateString()} </Text>
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
        fontWeight: "300",
        color: "grey"
    },
});


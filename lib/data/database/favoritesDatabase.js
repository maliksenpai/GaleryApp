export const FavoriteSchema = {
    name: "Favorite",
    properties: {
        id: "int",
        title: "string?",
        artist_title: "string?",
        image_id: "string?",
        favorited: "bool",
        classification_title: "string?",
        last_updated_source: "string?"
    },
    primaryKey: "id"
}

export const checkFavorites = ({realm, arts}) => {
    const copyArts = [...arts]
    copyArts.forEach(art => {
        const favorited = realm.objects("Favorite").filter((element) => {
            return element.id === art.id
        })
        art.favorited = favorited.length !== 0
    })
    return copyArts
}

export const handleFavoriteButton = ({art, realm}) => {
    if (art.favorited) {
        realm.write(() => {
            realm.delete(realm.objects("Favorite").filter(favoritedArt => favoritedArt.id === art.id))
        })
    } else {
        realm.write(() => {
            const copyArt = {...art}
            copyArt.favorited = true
            realm.create("Favorite", copyArt)
        })
    }
}

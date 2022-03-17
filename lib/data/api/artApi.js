import {checkFavorites} from "../database/favoritesDatabase";

const apiURL = "https://api.artic.edu/api/v1/";
const limit = 10;

export const getArtsData = async ({filter, page, realm}) => {
    const response = await fetch(
        apiURL + 'artworks/search?' +
        new URLSearchParams({
            page: page,
            limit: limit,
            fields: ['id', 'title', 'artist_title', 'image_id', 'classification_title', 'last_updated_source'],
            q: filter
        }),
        {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
            }
        }
    )
    const json = await response.json()
    json.data = checkFavorites({realm: realm, arts: json.data})
    return json.data
}

export const getArtDetailData = async ({id}) => {
    const response = await fetch(
        apiURL + `artworks/${id}?` +
        new URLSearchParams({
            fields: ['id', 'publication_history', 'artist_display', 'exhibition_history', 'provenance_text', 'inscriptions', 'artist_titles', 'category_titles', 'style_title']
        }),
        {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
            }
        }
    )
    const json = await response.json()
    return json.data
}

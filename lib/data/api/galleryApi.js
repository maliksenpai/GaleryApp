const apiURL = "https://api.artic.edu/api/v1/";
const limit = 30;

export const getGalleriesData = async ({filter, page}) => {
    const response = await fetch(
        apiURL + 'galleries/search?' +
        new URLSearchParams({
            page: page,
            limit: limit,
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
    return json.data
}

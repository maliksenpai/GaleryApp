import {createAsyncThunk} from "@reduxjs/toolkit";
import {getGalleriesData} from "../../data/api/galleryApi";

export const getGalleries = createAsyncThunk(
    "getGalleries",
    async ({filter, page}) => {
        const response = await getGalleriesData({filter, page})
        return {
            response: response,
            page: page
        }
    }
)

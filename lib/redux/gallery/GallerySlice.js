import {createSlice} from "@reduxjs/toolkit";
import {getGalleries} from "./GalleryActions";

const initialState = {
    galleries: [],
    error: null,
    loading: false,
    page: 0,
    isEmpty: false
}

export const gallerySlice = createSlice({
    name: "gallerySlice",
    initialState: initialState,
    reducers: {
        clearGalleries: (state) => {
            const copyState = {...state}
            copyState.galleries = []
            copyState.loading = false
            return copyState
        }
    },
    extraReducers: builder => {
        builder.addCase(getGalleries.pending, (state, action) => {
            const copyState = {...state}
            copyState.loading = true
            copyState.isEmpty = false
            return copyState
        })
        builder.addCase(getGalleries.fulfilled, (state, action) => {
            const copyState = {...state}
            copyState.loading = false
            const copyGalleries = [...copyState.galleries]
            copyGalleries.push(...action.payload.response)
            copyState.galleries = copyGalleries
            copyState.page = action.payload.page
            copyState.error = null
            if (copyGalleries.length === 0) {
                copyState.isEmpty = true
            }
            return copyState
        })
        builder.addCase(getGalleries.rejected, (state, action) => {
            const copyState = {...state}
            copyState.error = action.payload
            return copyState
        })
    }
})

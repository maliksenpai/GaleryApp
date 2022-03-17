import {createSlice} from "@reduxjs/toolkit";
import {getArts} from "./ArtActions";
import {checkFavorites} from "../../data/database/favoritesDatabase";

const initialState = {
    arts: [],
    loading: false,
    error: null,
    page: 0,
    isEmpty: false
}

export const artSlice = createSlice({
    name: "artSlice",
    initialState: initialState,
    reducers: {
        updateArts: (state, action) => {
            checkFavorites({realm: action.payload.realm, arts: state.arts})
            return state
        },
        clearArts: (state) => {
            const copyState = {...state}
            copyState.arts = []
            copyState.loading = false
            return copyState
        }
    },
    extraReducers: builder => {
        builder.addCase(getArts.pending, (state, action) => {
            const copyState = {...state}
            copyState.loading = true
            copyState.isEmpty = false
            return copyState
        })
        builder.addCase(getArts.fulfilled, (state, action) => {
            const copyState = {...state}
            copyState.loading = false
            const copyArts = [...copyState.arts]
            copyArts.push(...action.payload.response)
            copyState.arts = copyArts
            copyState.page = action.payload.page
            copyState.error = null
            if (copyArts.length === 0) {
                copyState.isEmpty = true
            }
            return copyState
        })
        builder.addCase(getArts.rejected, (state, action) => {
            const copyState = {...state}
            copyState.error = action.payload
            return copyState
        })
    }
})

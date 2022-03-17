import {combineReducers} from "redux";
import {artSlice} from "./art/ArtSlice";
import {gallerySlice} from "./gallery/GallerySlice";

export const MainReducer = combineReducers({
    artSlice: artSlice.reducer,
    galleriesSlice: gallerySlice.reducer
})

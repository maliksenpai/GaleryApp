import {createAsyncThunk} from "@reduxjs/toolkit";
import {getArtsData} from "../../data/api/artApi";

export const getArts = createAsyncThunk(
    "getArts",
    async ({filter, page, realm}) => {
        const response = await getArtsData({filter, page, realm})
        return {
            response: response,
            page: page
        }
    }
)

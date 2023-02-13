import {configureStore} from "@reduxjs/toolkit";
// ここでreducerをimport
import playlistReducer from "./playlistSlice";

export const store = configureStore({
    reducer: {
        playlist: playlistReducer,
    },
})
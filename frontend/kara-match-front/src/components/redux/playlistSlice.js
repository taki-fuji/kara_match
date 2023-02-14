import {createSlice} from "@reduxjs/toolkit";


export const playlistSlice = createSlice({
    name: "playlist",
    initialState:{
        num: 0,
        collectionIdList: [],
    },
    reducers: {
        addSong: (state) => {
            state.num += 1;
            state.collectionIdList.push()
        }
    }
})

export const {addSong} = playlistSlice.actions;
export default playlistSlice.reducer;
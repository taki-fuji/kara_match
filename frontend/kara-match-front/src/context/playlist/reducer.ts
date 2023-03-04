/*
playlistContextのUseReducerで使うreducerはこのファイルで定義されている
参考:ReactのHooksを使ってReduxのチュートリアルを置き換える(https://qiita.com/okumurakengo/items/aecd060ce64c99a646c8#usecontext%E3%81%AE%E5%89%8D%E3%81%ABcreatecontext%E3%82%92%E5%BE%A9%E7%BF%92)
dispatchされたときにこのファイルのreduccerが実行されることでstateの更新を行う
*/
import { playlistState, playlistActions } from "./interface";

export const playlistReducer = (state: playlistState, action: playlistActions): playlistState =>{
    switch (action.type){
        case "ADD_SONG":
            return {
                ...state,
                // 更新後のsongsは
                songs:[
                    // 今までのsongsに
                    ...state.songs,
                    // 新しいsongを追加したもの
                    {
                        userId: action.payload.userId,
                        // playlistName: action.payload.playlistName,
                        name: action.payload.name,
                        imageSrc: action.payload.imageSrc,
                        collectionId: action.payload.collectionId,
                        artistName: action.payload.artistName,
                        artistId: action.payload.artistId,
                        checked: true,

                        trackId: action.payload.trackId,
                    }
                ],
                nextSongId: state.nextSongId + 1
            };
        case "REMOVE_SONG":
            return {
                ...state,
                songs: state.songs.map(song =>
                    // idが一致したsongに対して(削除対象を見つけたら)
                    song.collectionId === action.payload.collectionId
                    ? {
                        // checkedを外す
                        ...song, checked: false
                    }:
                    song
                    )
            };
        case "INITIALIZE_SONG":
            return{
                ...state,
                songs: []
            };
        default:
            return state;
    }
}
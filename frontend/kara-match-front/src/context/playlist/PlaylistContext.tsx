import React, { createContext, } from "react";
import { playlistState, PlaylistProvider } from "./interface";
import { playlistReducer } from "./reducer";

/*
ログインしているユーザーのプレイリスト(曲の情報のリスト)をcontext化して保持することで、
どこからでも参照、書き換え可能にするためのcontextファイル
使用する型　、actionは./interface.ts, reducerは./reducer.tsに書いてある
参考:ReactのHooksを使ってReduxのチュートリアルを置き換える(https://qiita.com/okumurakengo/items/aecd060ce64c99a646c8#usecontext%E3%81%AE%E5%89%8D%E3%81%ABcreatecontext%E3%82%92%E5%BE%A9%E7%BF%92)
参考2:【TypeScript × React】でグローバルStateを扱う方法(https://qiita.com/curry__30/items/526b45ede95cdbf2b2ee)
*/

// tsなのでpropsの方も定義する必要がある
type propsType = {
  children: React.ReactNode;
};

// playlistStateを使ってstateの宣言時の値(initialState)を定義する　
const initialPlaylistState: playlistState = {
  songs: [],
  nextSongId: 0,
};

// playlistContextオブジェクトを宣言
export const PlaylistContext = createContext<playlistState | any>(initialPlaylistState);

export const PlaylistContextProvider = ({children}: propsType): React.ReactNode => {
  // 別ファイルで定義したplaylistReducerと上で定義した初期値でuseReducerする
  const [playlist, playlistDispatch] = React.useReducer(playlistReducer, initialPlaylistState);

  // checkされているplaylistを返す関数を作成
  const showAllCheckedSongs = () => {
    console.log(playlist)
    for(let i=0; i < playlist.songs.length; i++){
      if(playlist.songs[i].checked === true){
        console.log(playlist.songs[i].name)
      }
    }
  }

  return (
    <PlaylistContext.Provider value={{playlist, playlistDispatch, showAllCheckedSongs}}>
      {children}
    </PlaylistContext.Provider>
  );
}

export default PlaylistContextProvider;
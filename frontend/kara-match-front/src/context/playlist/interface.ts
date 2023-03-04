/*
interface.ts
色々なファイル(主にtsで書かれたcontextで使う型を定義するファイル
参考:ReactのHooksを使ってReduxチュートリアルを置き換える(https://qiita.com/okumurakengo/items/aecd060ce64c99a646c8#usecontext%E3%81%AE%E5%89%8D%E3%81%ABcreatecontext%E3%82%92%E5%BE%A9%E7%BF%92)
*/

import React from "react";

// playlistの単体要素songのためのオブジェクト型のsongTypeを定義
export interface songState{
    userId: number; // ユーザーID
    // playlistName: string; //プレイリスト名
    name: string;// 曲名
    imageSrc: string; //画像URL
    collectionId: number; //曲ごとのユニークなId
    artistName: string; //アーティスト名
    artistId: number; // アーティストごとのユニークなid
    trackId: number;//曲を見分ける
    checked: boolean; // チェック(プレイリストに追加)済みかどうか
};

// playlistStateはsongStateのリスト型を使うため
export interface playlistState{
    songs: songState[];
    nextSongId: number;
}

// ここから追加したいactionを定義していく。Actionsはそれらをまとめてexportするためのインターフェース
// まずは曲の追加
interface addSong {
    type: "ADD_SONG";
    payload: {
        userId: number; // ユーザーID
        // playlistName: string; // プレイリスト名(選択肢の中から選んでもらう)
        name: string;// 曲名
        imageSrc: string; //画像URL
        collectionId: number; //曲ごとのユニークなId
        artistName: string; //アーティスト名
        artistId: number; // アーティストごとのユニークなid
        trackId: number;//曲を見分ける
    };
}
// 曲の削除(checkedを外すだけで、実際に削除するのはdjangoへのPost)
interface removeSong {
    type: "REMOVE_SONG";
    payload: {
        // 削除対象のcollectionIdを持ってくる
        collectionId:number;
    }
}
// 曲の削除(checkedを外すだけで、実際に削除するのはdjangoへのPost)
interface initializeSong {
    type: "INITIALIZE_SONG";
    payload: {
        // 削除対象のcollectionIdを持ってくる
        collectionId:number;
    }
}
export type playlistActions =
| addSong
| removeSong
| initializeSong;


export interface PlaylistProvider{
    playlist: playlistState;
    playlistDispatch: React.Dispatch<playlistActions>;
    showAllCheckedSongs: typeof Function;
    playlist_list: [];
    setPlaylist_list: typeof Function;
    targetPlaylistName: string;
    setTargetPlaylistName: typeof Function;
    addPlaylist: typeof Function;
    deletePlaylist: typeof Function;
}

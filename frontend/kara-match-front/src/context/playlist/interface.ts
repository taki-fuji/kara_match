/*
interface.ts
色々なファイル(主にtsで書かれたcontextで使う型を定義するファイル
参考:ReactのHooksを使ってReduxチュートリアルを置き換える(https://qiita.com/okumurakengo/items/aecd060ce64c99a646c8#usecontext%E3%81%AE%E5%89%8D%E3%81%ABcreatecontext%E3%82%92%E5%BE%A9%E7%BF%92)
*/

import React from "react";

// playlistの単体要素songのためのオブジェクト型のsongTypeを定義
export interface songState{
    userId: number; // ユーザー　ID
    name: string;// 曲名
    imageSrc: string; //画像URL
    collectionId: number; //曲ごとのユニークなId
    artistName: string; //アーティスト名
    artistId: number; // アーティストごとのユニークなid
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
        userId: number;
        name: string;// 曲名
        imageSrc: string; //画像URL
        collectionId: number; //曲ごとのユニークなId
        artistName: string; //アーティスト名
        artistId: number; // アーティストごとのユニークなid
        checked: boolean
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
export type playlistActions =
| addSong
| removeSong;

export interface PlaylistProvider{
    playlist: playlistState;
    playlistDispatch: React.Dispatch<playlistActions>;
    showAllCheckedSongs: typeof Function
}

import React, { createContext, useState, useEffect, useReducer } from "react";
import { withCookies } from "react-cookie";
import axios from "axios";

// playlistContextオブジェクトを宣言
export const playlistContext = createContext();

const PlaylistContext = (props) => {
    // ログイン認証に成功したときにcurrent-tokenにtokenが保存されているのでgetで取得
    const token = props.cookies.get("current-token");
    // playlistの単体要素songのためのオブジェクト型のinitialSongStateを定義
    const initialSongState = {
      name: 'initialName',
    }
    
  return (
    <PlaylistContext.Provider value={{}}>
      {props.children}
    </PlaylistContext.Provider>
  );
}

export default PlaylistContext
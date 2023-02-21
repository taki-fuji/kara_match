import { Link } from "react-router-dom";
import { AppBar, Button } from "@mui/material";
import React, { createContext, useState, useEffect } from "react";
import { withCookies } from "react-cookie";
import axios from "axios";
import { useContext } from "react";
import { ApiContext } from "../../context/ApiContext";
import { Grid } from '@mui/material';
import {App} from "../../";
import Friend from "../../component_parts/Friend";

// ここにマッチ候補のフレンドと、共通のプレイリストを表示するコンポーネントを作る
// 1.自分が取得している曲を表示 → PlayListContextにあるshowAllCheckedSongsを使う
// 2.友達登録している人たちを表示 → askListFullにapproval (プロフィールの中にapprovedがあってそれが承認のbooleanになってる)
// 3.その友達表示の中にマッチボタンを作成 → cardをつくるかそん中にボタン
// 4.onClickで押された人のuserIDをもとに、音楽取得のリクエストをDjangoに送る requestMusicList
// 5.4で受けとった曲を変数に格納する。
// 6.マイプレイリストと、５の変数内のプレイリストを比較し、共通のものを格納する。（macchボタンをおしたら、選択されているフレンド全員とマージさせるか？　再起関数にするか？引数二つとって
// 7.格納されたものを表示する。

const MatchSearch = (props) => {

  const { askList, profiles} = useContext(ApiContext); // askListには、自分宛(askTo:自分)が入っている。
  const filterProfiles = profiles.filter((prof) => {return prof.id !== profiles.id;});//自分以外のプロフィールをフィルタリングしたリターン

  const friend_approved = filterProfiles && filterProfiles.map((filprof) => (
    <Friend
      key = {filprof.id}
      prof = {filprof}
    />
  ));

 
  const requestMusicList = (userId) => {
    
  }

  const mergeMusic = () => {

  }

  return (
    <>
      <h1>match_search_page</h1>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/match-waite"
      >
        Go to match-waite
      </Button>
      <p></p>

      <Button variant="outlined" color="primary" component={Link} to="/menu">
        Back to menu
      </Button>

      <br/>
      <Grid container>
      <Grid item xs={4}>
          <h2 className="sample-box-02">Friend List</h2>
          <div className="app-profiles">
            {friend_approved}
          </div>
      </Grid>
      </Grid>
    </>

  );
};
export default MatchSearch;


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
import { BsFilterSquare } from "react-icons/bs";

// ここにマッチ候補のフレンドと、共通のプレイリストを表示するコンポーネントを作る
// 1.自分が取得している曲を表示 → PlayListContextにあるshowAllCheckedSongsを使う
// ◯ 2.友達登録している人たちを表示 
// 3.その友達表示の中にマッチボタンを作成 → cardをつくるかそん中にボタン
// 4.onClickで押された人のuserIDをもとに、音楽取得のリクエストをDjangoに送る requestMusicList
// 5.4で受けとった曲を変数に格納する。
// 6.マイプレイリストと、５の変数内のプレイリストを比較し、共通のものを格納する。（macchボタンをおしたら、選択されているフレンド全員とマージさせるか？　再起関数にするか？引数二つとって
// 7.格納されたものを表示する。

const MatchSearch = (props) => {

  const { askListFull, profiles} = useContext(ApiContext); // askListには、自分宛(askTo:自分)が入っている。

  // A && B AがTrueであれば、Bの処理がされる
  const filterProfiles = profiles.filter((prof) => {return prof.id !== profiles.id;});//自分以外のプロフィールをフィルタリングしたリターン
  const approved_Friend_askList = askListFull.filter((ask) => {return ask.approved}); //全てのフレンド申請のTrueリスト

  // ここから先のコード、効率の良いやり方思いつかなくて力技でfriend識別してる。
  // もし、良いコードの書き方あったら変更して教えて！

  // filterProfilesと同じ型のオブジェクト配列変数(ProfileList)を作るため、filterProfilesをコピーして中身をからにしている
  const ProfileList = filterProfiles.slice();
  console.log("ProfileList1 = " + ProfileList)
  for(let i = 0; i <= ProfileList.length; i++){
    ProfileList.pop();
  }
 
  // 自分宛のユーザID(askTo)と自分以外のプロフィールユーザID(userPro)を比較して、等しい時、さっき用意したProfileListに要素追加
  for(let i = 0; i < approved_Friend_askList.length; i++){
    for(let j = 0; j < filterProfiles.length; j++){
      if(approved_Friend_askList[i].askTo === filterProfiles[j].userPro){
        console.log("Friend" + filterProfiles[j].userPro);
        ProfileList.push(filterProfiles[j])
      }
    }
  }

  const friend_approved = ProfileList.map((friend) => (
    <Friend
      key = {friend.id}
      prof = {friend}
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




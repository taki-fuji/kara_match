// import { Link } from "react-router-dom";
// import { AppBar, Button } from "@mui/material";
// import React, { createContext, useState, useEffect } from "react";
// import { withCookies } from "react-cookie";
// import axios from "axios";
// import { useContext } from "react";
// import { ApiContext } from "/Users/nagasawa/Karaoke_APP/kara_match/frontend/kara-match-front/src/context/ApiContext";
// import { Grid } from '@mui/material';
// import {App} from "/Users/nagasawa/Karaoke_APP/kara_match/frontend/kara-match-front/src/";
// import Profile from "../../component_parts/Profile";

// // import Profile from "../component_parts/Profile";
// // import ProfileManager from "../component_parts/ProfileManager";
// // import { BsFillPeopleFill } from "react-icons/bs";//人のアイコン
// // import { GoMail } from "react-icons/go";//メールアイコン

// // ここにマッチ候補のフレンドと、共通のプレイリストを表示するコンポーネントを作る
// // 1.自分が取得している曲を表示 → PlayListContextにあるshowAllCheckedSongsを使う
// // 2.友達登録している人たちを表示 → askListFullにapproval (プロフィールの中にapprovedがあってそれが承認のbooleanになってる)
// // 3.その友達表示の中にマッチボタンを作成 → cardをつくるかそん中にボタン
// // 4.onClickで押された人のuserIDをもとに、音楽取得のリクエストをDjangoに送る requestMusicList
// // 5.4で受けとった曲を変数に格納する。
// // 6.マイプレイリストと、５の変数内のプレイリストを比較し、共通のものを格納する。（macchボタンをおしたら、選択されているフレンド全員とマージさせるか？　再起関数にするか？引数二つとって
// // 7.格納されたものを表示する。

// const MatchSearch = (props) => {
//   const { profiles, profile, askList, askListFull } = useContext(ApiContext);


//   const filterProfiles = profiles.filter((prof) => {return prof.id !== profile.id;});//自分以外のプロフィールをフィルタリングしたリターン


//   const listProfiles =
//   filterProfiles &&
//   filterProfiles.map((filprof) => (//カードごとの情報をmapのループで取り出しfilprofに入れる
//     <Profile
//       key={filprof.id}
//       profileData={filprof}
//       askData={askListFull.filter((ask) => {//askDataを取り出してローカル変数のaskに入れる
//         return (
//           ask.approved === "True"
//         );
//       })}
//     />
//   ));


 
//   const requestMusicList = (userId) => {
    
//   }

//   const mergeMusic = () => {

//   }

//   return (
//     <>

//       <h1>match_search_page</h1>
//       <Button
//         variant="contained"
//         color="primary"
//         component={Link}
//         to="/match-waite"
//       >
//         Go to match-waite
//       </Button>
//       <p></p>

//       <Button variant="outlined" color="primary" component={Link} to="/menu">
//         Back to menu
//       </Button>

//       <Grid item xs={4}>
//           <h2 className="sample-box-02">Profile List</h2>
//           <div className="app-profiles">
//             {/* {friendProfiles} */}
//             {listProfiles}
//           </div>
//       </Grid>


//     </>
//   );
// };
// export default MatchSearch;


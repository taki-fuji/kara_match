import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, Grid, Paper, Card, CardContent, Typography, Box } from "@mui/material";
import { withCookies } from "react-cookie";
import { ApiContext } from "../context/ApiContext";
import ProfileManager from "../component_parts/ProfileManager";
import Ask from "../component_parts/Ask";
import Search from "../component_parts/Search";
import { BsFillPeopleFill } from "react-icons/bs";
import NewMenuber from "../component_parts/NewMenuber";
import { MatchContext } from "../context/MatchContext";
import Profile3 from "../component_parts/Profile3";

const Menu = () => {
  const { profiles, profile, askList } = useContext(ApiContext);
  const { fprof } = useContext(MatchContext);
  const [run, setrun] = useState(false);

  return (
    <div className="all">
      <NewMenuber />
      <Box
        sx={{
          bgcolor: '#e3f2fd', // 青系の背景色
          color: '#0d47a1',   // テキストカラーを濃い青
          padding: 1,         // 全体のパディング
          borderRadius: 3,    // ボックスに丸みを追加
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // 軽い影を追加
        }}
      >

      <Grid container spacing={3} sx={{ padding: 3 }}>
        {/* Friends Profile List */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              padding: 2,
              border: '2px solid #1976d2', // 青色の枠線で囲む
              borderRadius: 3,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // 軽い影
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Friends Profile List
              </Typography>
              <Box sx={{ maxHeight: 400, overflowY: 'auto', marginTop: 2 }}>
                {fprof.map((filprof) => (
                  <Profile3 key={filprof.id} profileData={filprof} />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Manager */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              padding: 2,
              border: '2px solid #1976d2', // 青色の枠線で囲む
              borderRadius: 3,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // 軽い影
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Profile
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                <ProfileManager />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Search Users & Approval Requests */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              padding: 2,
              border: '2px solid #1976d2', // 青色の枠線で囲む
              borderRadius: 3,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // 軽い影
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Search Users
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                <Search />
              </Box>
            </CardContent>

            <CardContent>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: '#1976d2' }}>
                <BsFillPeopleFill className="badge" style={{ marginRight: 8 }} />
                Approval request list
              </Typography>
              <Box sx={{ maxHeight: 200, overflowY: 'auto', marginTop: 2 }}>
                <ul>
                  {profile.id &&
                    askList.map((ask) => (
                      <Ask
                        key={ask.id}
                        ask={ask}
                        prof={profiles.filter((item) => item.userPro === ask.askFrom)}
                      />
                    ))}
                </ul>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </Box>
    </div>
  );
};

export default withCookies(Menu);


// import React, { useContext, useEffect, useState} from "react";
// import { Link } from "react-router-dom";
// import { AppBar, Button } from "@mui/material";
// import {withCookies} from 'react-cookie';
// import { ApiContext } from "../context/ApiContext";
// import { Grid } from '@mui/material';
// import '../App.css';
// import Profile from "../component_parts/Profile";
// import ProfileManager from "../component_parts/ProfileManager";
// import Ask from "../component_parts/Ask";
// import Search from "../component_parts/Search";

// import { BsFillPeopleFill } from "react-icons/bs";//人のアイコン
// import { GoMail } from "react-icons/go";//メールアイコン
// // import Menuber from "../components/Menuber_components/Menuber";
// import { styled } from '@mui/material/styles';

// import NewMenuber from "../component_parts/NewMenuber";



// import { MatchContext } from "../context/MatchContext";
// import Profile3 from "../component_parts/Profile3";

// const Menu = (props) => {

  
  
//   const { profiles, profile, askList, askListFull } = useContext(ApiContext);
//   const { fprof, setfprof, del_comp } = useContext(MatchContext);
//   // let listProfiles = [];
//   const [run, setrun] = useState(false);
  
//   const filterProfiles = profiles.filter((prof) => {return prof.id !== profile.id;});//自分以外のプロフィールをフィルタリングしたリターン


//   const listProfiles =
//   fprof &&
//   fprof.map((filprof) => (//カードごとの情報をmapのループで取り出しfilprofに入れる
//     <Profile3
//       key={filprof.id}
//       profileData={filprof}
//       // askData={askListFull.filter((ask) => {//askDataを取り出してローカル変数のaskに入れる
//       //   return (
//       //     (filprof.userPro === ask.askFrom) | (filprof.userPro === ask.askTo)
//       //   );
//       // })}
//     />
//   ));



//   return (

 
//     <div className="all">  
//       <NewMenuber/>

//       <br/>

      
//       <Grid container>

//         <Grid item xs={4}>
//           <h2 className="sample-box-02">Friends Profile List</h2>
//           <div className="app-profiles">
//             {/* {listProfiles} */}
//             {fprof.map((filprof) => (//カードごとの情報をmapのループで取り出しfilprofに入れる
//               <Profile3
//                 key={filprof.id}
//                 profileData={filprof}
//                 // askData={askListFull.filter((ask) => {//askDataを取り出してローカル変数のaskに入れる
//                 //   return (
//                 //     (filprof.userPro === ask.askFrom) | (filprof.userPro === ask.askTo)
//                 //   );
//                 // })}
//               />
//             ))}
//           </div>
//         </Grid>

//         <Grid item xs={4}>
//           <div className="ProfileBox">
//             <div className="app-details">
//               <ProfileManager/>
//             </div>
//           </div>
//         </Grid>

//         <Grid item xs={4} >
//           <h1 className="sample-box-02">Search Users</h1>
//           <div >
//             <Search/>
//           </div>

//           <h3 className="title-ask"><BsFillPeopleFill className="badge" />Approval request list</h3>
//               <div className="app-details" >
//                 <ul>
//                 {profile.id && askList.map((ask) => (
//                     <Ask
//                       key={ask.id}
//                       ask={ask}
//                       prof={profiles.filter((item) => { return item.userPro === ask.askFrom;})}
//                     />
//                   ))}
//                 </ul>
//               </div>
//         </Grid>

//       </Grid>
//     </div>
//   );
// };

// export default withCookies(Menu);

import React, { useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { AppBar, Button } from "@mui/material";
import {withCookies} from 'react-cookie';
import { ApiContext } from "../context/ApiContext";
import { Grid } from '@mui/material';
import '../App.css';
import Profile from "../component_parts/Profile";
import ProfileManager from "../component_parts/ProfileManager";
import Ask from "../component_parts/Ask";
import Search from "../component_parts/Search";

import { BsFillPeopleFill } from "react-icons/bs";//人のアイコン
import { GoMail } from "react-icons/go";//メールアイコン
// import Menuber from "../components/Menuber_components/Menuber";
import { styled } from '@mui/material/styles';



import { MatchContext } from "../context/MatchContext";
import Profile3 from "../component_parts/Profile3";

const Menu = (props) => {

  
  
  const { profiles, profile, askList, askListFull } = useContext(ApiContext);
  const { fprof, setfprof, del_comp } = useContext(MatchContext);
  // let listProfiles = [];
  const [run, setrun] = useState(false);
  
  const filterProfiles = profiles.filter((prof) => {return prof.id !== profile.id;});//自分以外のプロフィールをフィルタリングしたリターン


  const listProfiles =
  fprof &&
  fprof.map((filprof) => (//カードごとの情報をmapのループで取り出しfilprofに入れる
    <Profile3
      key={filprof.id}
      profileData={filprof}
      // askData={askListFull.filter((ask) => {//askDataを取り出してローカル変数のaskに入れる
      //   return (
      //     (filprof.userPro === ask.askFrom) | (filprof.userPro === ask.askTo)
      //   );
      // })}
    />
  ));



  return (

 
    <div className="all">
      
      {/* <Menuber/> */}
      
      <div className="MenuContents">
      <h1>Menu Page</h1>
    <ul className="MenuButton">
      <p></p>
      <li>
      <Button
        className="btn1"
        variant="contained"
        color="primary"
        component={Link}
        to="/"
      >
        Logout
      </Button>
      </li>
      <p></p>
      <li>
      <Button
        className="btn2"
        variant="outlined"
        color="primary"
        component={Link}
        to="/song-list"
      >
        Go to My Song List Page!
      </Button>
      </li>

      <p></p>
      <li>
      <Button
        className="btn3"
        variant="outlined"
        color="primary"
        component={Link}
        to="/myplaylist-list"
      >
        Go to My Play List Page!
      </Button>
      </li>
      <p></p>
      <li>
      <Button
        className="btn4"
        variant="outlined"
        color="primary"
        component={Link}
        to="/match-search"
      >
        Go to match-search!
      </Button>
      </li>

      <p></p>
      <li>
      <Button className="btn5"
        variant="outlined"
        color="primary"
        component={Link}
        to="/setting"
      >
        Go to setting!
      </Button>
      </li>

      <p></p>
      <li>
      <Button className="btn5"
        variant="outlined"
        color="primary"
        component={Link}
        to="/music-search"
      >
        Go to music-search!
      </Button>
      </li>

      <p></p>
      <li>
      <Button className="btn5"
        variant="outlined"
        color="primary"
        component={Link}
        to="/matting"
      >
        Go to mutch!
      </Button>
      </li>

      <p></p>
      <li>
      <Button className="btn5"
        variant="outlined"
        color="primary"
        component={Link}
        to="/songlistandsearch"
      >
        Go to songlistandsearch!
      </Button>
      </li>

      </ul>
</div>

      <br/>

      
      <Grid container>

        <Grid item xs={4}>
          <h2 className="sample-box-02">Friends Profile List</h2>
          <div className="app-profiles">
            {/* {listProfiles} */}
            {fprof.map((filprof) => (//カードごとの情報をmapのループで取り出しfilprofに入れる
              <Profile3
                key={filprof.id}
                profileData={filprof}
                // askData={askListFull.filter((ask) => {//askDataを取り出してローカル変数のaskに入れる
                //   return (
                //     (filprof.userPro === ask.askFrom) | (filprof.userPro === ask.askTo)
                //   );
                // })}
              />
            ))}
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="ProfileBox">
            <div className="app-details">
              <ProfileManager/>
            </div>
          </div>
        </Grid>

        <Grid item xs={4} >
          <h1 className="sample-box-02">Search Users</h1>
          <div >
            <Search/>
          </div>

          <h3 className="title-ask"><BsFillPeopleFill className="badge" />Approval request list</h3>
              <div className="app-details" >
                <ul>
                {profile.id && askList.map((ask) => (
                    <Ask
                      key={ask.id}
                      ask={ask}
                      prof={profiles.filter((item) => { return item.userPro === ask.askFrom;})}
                    />
                  ))}
                </ul>
              </div>
        </Grid>

      </Grid>
    </div>
  );
};

export default withCookies(Menu);

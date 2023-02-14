import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import {withCookies} from 'react-cookie';
import Profile from "../component_parts/Profile";
import { ApiContext } from "../context/ApiContext";
import { Grid } from '@mui/material';
import '../App.css';



const Menu = (props) => {
  
  const { profiles, profile, askList, askListFull } = useContext(ApiContext);

  const filterProfiles = profiles.filter((prof) => {return prof.id !== profile.id;});//自分以外のプロフィールをフィルタリングしたリターン


  const listProfiles =
  filterProfiles &&
  filterProfiles.map((filprof) => (//カードごとの情報をmapのループで取り出しfilprofに入れる
    <Profile
      key={filprof.id}
      profileData={filprof}
      askData={askListFull.filter((ask) => {//askDataを取り出してローカル変数のaskに入れる
        return (
          (filprof.userPro === ask.askFrom) | (filprof.userPro === ask.askTo)
        );
      })}
    />
  ));



  return (
    <>
      <h1>Menu Page</h1>
      <p></p>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
      >
        Logout
      </Button>

      <p></p>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/friend-list"
      >
        Go to Friend List Page!
      </Button>

      <p></p>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/myplaylist-list"
      >
        Go to My Play List Page!
      </Button>

      <p></p>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/match-search"
      >
        Go to match-search!
      </Button>

      <p></p>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/setting"
      >
        Go to setting!
      </Button>

      <p></p>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/itunes-api-test"
      >
        Go to itunesAPI test!
      </Button>

      <br/>
      <Grid container>
        <Grid item xs={4}>
          <div className="app-profiles">
            {listProfiles}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default withCookies(Menu);

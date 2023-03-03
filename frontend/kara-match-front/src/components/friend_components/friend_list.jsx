import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import React, {useState, useContext} from 'react'
import { ApiContext } from "../../context/ApiContext";
import { Card, CardContent } from '@mui/material'
import { Typography } from '@mui/material';

import "../../App.css"

import Mymusic from "../../component_parts/Mymusic";

const FriendList = (props) => {
  const { mysong } = useContext(ApiContext);

  // const new_mysong = mysong.filter((s) => {return s.id !== profile.id;});//自分以外のプロフィールをフィルタリングしたリターン


  //mysongから一つの音楽の情報を取り出して,<Mymusic>を使って音楽を一つ一つカードにして取り出す
  const listmysong =
  mysong &&
  mysong.map((filsong) => (//カードごとの情報をmapのループで取り出しfilsongに入れる
    <Mymusic
      key={filsong.id}
      songData={filsong}
    />
  ));

  return (
    <>
      <h1>MySong_List_Page</h1>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/friend-detail"
      >
        Go to friend-detail page
      </Button>
      <p></p>
      <Button variant="outlined" color="primary" component={Link} to="/menu">
        Back to menu
      </Button>


      <h2 >Mysong List</h2>
      <div >
        {console.log(listmysong)}
        {listmysong}
      </div>

    </>
  );
};
export default FriendList;

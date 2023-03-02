import React, { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { Card } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

// 友達承認された人を表示するためのカードスタイルを定義したファイル。

const Friend = ({ prof }) => {

  const getUserMusic =() => {
    // profのユーザのプレイリストを取得するリクエストをする関数
  }

  console.log("prof = " + prof)
  return (
      <Card style={{ position: "relative", display: "flex", marginBottom: 15 ,height: 100}}>
        {prof.img ? (
          <CardMedia style={{ minWidth: 100 }} image={prof.img} />
        ) : (
          <CardMedia
            style={{ minWidth: 100 }}
            image="http://127.0.0.1:8000/media/image/null.png"
          />
        )}
        <CardContent style={{ padding: 5 }}>
          <Typography variant="h6">{prof.nickName}</Typography>
          {/* <ExButton
            size="small"
            variant="contained"
            color="primary"
            onClick={() => getUserMusic()}
          >
            Make share playlist !!!
          </ExButton> */}
        </CardContent>
      </Card>
   
  );
};

export default Friend;

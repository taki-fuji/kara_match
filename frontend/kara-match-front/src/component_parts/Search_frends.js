import React, {useState, useContext} from 'react'
import { ApiContext } from '../context/ApiContext'

import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import CardActions from '@mui/material/CardActions';


import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';

import { MatchContext } from '../context/MatchContext';


//DataにMatch.jsから送られてきたフレンドのプロフィール情報が入っている
const Search_frends = ({Data}) => {
const { setclick, click, setSelectUser, SelectUser, setusername} = useContext(MatchContext);

const change = () => {//ボタンが押されたら押したuserをsetSelectUserに格納する
    setSelectUser(Data.userPro)
    setusername(Data.nickName)
    console.log(Data.userPro)
    console.log(SelectUser)
    setclick(!click);
  };
  return (
    <div>
        {console.log(Data)}

        <Card style={{ position: "relative", display: "flex", marginBottom: 10 }}>
        {Data.img ? (
            <CardMedia style={{ minWidth: 100 }} image={Data.img} />
        ) : (
            <CardMedia
            style={{ minWidth: 100 }}
            image="http://127.0.0.1:8000/media/image/null.png"
            />
        )}

        <CardContent style={{ padding: 5 }}>
            <Typography variant="h6">{Data.nickName}</Typography>
            <Typography>{Data.created_on}</Typography>
        </CardContent>

        <CardActions>
            <Button size="small" onClick={() => {
                        change();
                    }}>Select</Button>
        </CardActions>
        </Card>
    </div>
  )
}

export default Search_frends

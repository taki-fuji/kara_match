import React, {useState, useContext, useEffect} from 'react'
import { ApiContext } from '../context/ApiContext'
import { Card, CardContent } from '@mui/material'
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

import { useRef, EffectCallback, DependencyList } from 'react';

const Mymusic = ({ songData }) => {

    const { deleteSong, mysong, setDsong,} = useContext(ApiContext);

    const [deleteToggle, setDeleteToggle] = useState(false);//歌を除去する関数を起動する

    const isFirstRender = useRef(false)//これを使うことで初回にuseffectが起動するのを防ぐ

    useEffect(() => { // このeffectは初回レンダー時のみ呼ばれるeffect
        isFirstRender.current = true
    }, [])

    useEffect(() => {// 『count』 が更新された場合『と』初回レンダー時に動くeffect
        if(isFirstRender.current) { // 初回レンダー判定
          isFirstRender.current = false // もう初回レンダーじゃないよ代入
        } else {//2回目からここが動く
            deleteSong();//この関数で歌をデータベースから除去する
        }
      }, [deleteToggle]);

    const DeleteMysong = () => {
        setDsong(songData.id)//idをDsongに入れる,idを使って特定の歌を探す
        setDeleteToggle(!deleteToggle);//歌を除去する関数を起動する,useeffectを使って遅らせないとstateが変わる前にdeleteSong関数が起動してしまう
    }

    return(
        <div>
            <Card style={{ position: "relative", display: "flex", marginBottom: 10 }}>
                <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={songData.img_url}
                alt="Live from space album cover"
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">{songData.song_name}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">{songData.created_on}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant="contained" onClick={() => {
                        DeleteMysong();
                    }}>Delete</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Mymusic;
import React, {useState, useContext} from 'react'
import { ApiContext } from '../context/ApiContext'
import { Card, CardContent } from '@mui/material'
import { Typography } from '@mui/material';

const Mymusic = ({ songData }) => {

    // Users_song_view= () => {
    //     Object.values(mysong).map((s) =>{//Object.values(mysong)とすることでmtsongをobject型からarray型に変更している
    //         setmys()
    //         // return <Typography variant="h6">{s.trackCensoredName}</Typography>
    //     })
    // }

    return(
        <div>
            <Card style={{ position: "relative", display: "flex", marginBottom: 10 }}>
                <Typography variant="h6">{songData.song_name}</Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">{songData.created_on}</Typography>
            </Card>
        </div>
    )
}

export default Mymusic;
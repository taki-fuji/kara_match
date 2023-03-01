import React, {useState, useContext} from 'react'
import { ApiContext } from '../context/ApiContext'
import { Card, CardContent } from '@mui/material'
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

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
                    <Button size="small" variant="contained">Delete</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Mymusic;
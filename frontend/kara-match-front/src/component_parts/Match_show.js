import React, {useState, useContext, useEffect} from 'react'
import { ApiContext } from '../context/ApiContext'
import { Card, CardContent } from '@mui/material'
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

import { useRef, EffectCallback, DependencyList } from 'react';

const Match_show = ({ SData }) => {

   

    return(
        <div>
            <Card style={{ position: "relative", display: "flex", marginBottom: 10 }}>
                <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={SData.img_url}
                alt="Live from space album cover"
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">{SData.song_name}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">{SData.created_on}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Match_show;
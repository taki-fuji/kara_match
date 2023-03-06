import React, { useContext, useEffect, useState } from 'react'
import { ApiContext } from '../context/ApiContext';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';

import { MatchContext } from '../context/MatchContext';



const ExButton = styled(Button)(({theme}) => ({
    button: {
        margin: theme.spacing(1),
      },
}));

const Profile3 = ({ profileData }) => {
    
    const { newRequestFriend, profile, askListFull } = useContext(ApiContext);
    const { setdelete_ask_id, Delete_frends_tunction, setdelete_ask_id2} = useContext(MatchContext);
    const [fd_alert , setfd_alert] = useState(false)

    useEffect(() => {
        friend_delete()
    },[fd_alert])

    const friend_delete = () => {
        //フレンド除去関数をここに配置
        Delete_frends_tunction()
    };

    const alert = () => {
        Object.values(askListFull).map((a) =>{
            if(profile.userPro === a.askFrom  && profileData.userPro === a.askTo){
                setdelete_ask_id(a.id)
            }
            if(profile.userPro === a.askTo  && profileData.userPro === a.askFrom){
                setdelete_ask_id2(a.id)
            }
        })
        setfd_alert(!fd_alert)
    }


  return (
     <Card style={{ position: "relative", display: "flex", marginBottom: 10 }}>
      {profileData.img ? (
        <CardMedia style={{ minWidth: 100 }} image={profileData.img} />
      ) : (
        <CardMedia
          style={{ minWidth: 100 }}
          image="http://127.0.0.1:8000/media/image/null.png"
        />
      )}

      <CardContent style={{ padding: 5 }}>
        <Typography variant="h6">{profileData.nickName}</Typography>
        <Typography>{profileData.created_on}</Typography>

        <ExButton
            size="small"
            variant="contained"
            color="primary"
            onClick={() => alert()}
          >
            Delete Friend
          </ExButton>
       
      </CardContent>
    </Card>
  )
}

export default Profile3

import React, { useContext } from 'react'
import { ApiContext } from '../context/ApiContext'
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';



const ExButton = styled(Button)(({theme}) => ({
    button: {
        margin: theme.spacing(1),
      },
}));


const Profile2 = ({ profileData, askData }) => {
  const { newRequestFriend, profile } = useContext(ApiContext);

  const newRequest = () => {
    const askUploadData = new FormData();
    askUploadData.append("askTo", profileData.userPro);
    newRequestFriend(askUploadData);
  };

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
      </CardContent>
    </Card>
  );
};

export default Profile2;
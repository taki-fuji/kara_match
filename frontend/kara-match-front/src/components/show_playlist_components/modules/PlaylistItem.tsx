import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

type propsType = {
    playlistName: string;
    key:number;
}


const PlaylistItem = (props: propsType) => {
  return (
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={props.playlistName}
          secondary={
            <React.Fragment>
              
              ここに曲名をちょっとだけ出したい
            </React.Fragment>
          }
        />
      </ListItem>
  )
}

export default PlaylistItem
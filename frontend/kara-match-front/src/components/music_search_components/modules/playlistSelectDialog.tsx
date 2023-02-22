import React from 'react';

// mui
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';

// context
import { PlaylistContext } from '../../../context/playlist/PlaylistContext';

export interface playlistDialogProps {
  onClose: (value: string) => void;
}

const PlaylistSelectDialog = (props: playlistDialogProps) => {
  const { onClose } = props;

  const { playlist_list } = React.useContext(PlaylistContext);

  return (
    <Dialog onClose={() => onClose("close")} open>
      <DialogTitle>どのプレイリストに追加しますか？</DialogTitle>
      <List sx={{ pt: 0 }}>
        {playlist_list.map((playlist:string) => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => onClose(playlist)} key={playlist}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={playlist} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => onClose("addAcount")}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default PlaylistSelectDialog;
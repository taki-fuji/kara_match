import React from 'react';

// mui
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

// context
import { PlaylistContext } from '../../../context/playlist/PlaylistContext';

export interface playlistDialogProps {
  onClose: (value: string) => void;
}

const PlaylistSelectDialog = (props: playlistDialogProps) => {
  const { onClose } = props;

  const { playlist_list } = React.useContext(PlaylistContext);

  const closeButtonStyle = {
    height: 0,
    textAlign: "center",
  };

  return (
    <Dialog onClose={() => onClose("cancel")} open>
      <DialogTitle>どのプレイリストに追加しますか？</DialogTitle>
      <DialogContent dividers>
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
        </List>
      </DialogContent>
      <DialogActions>
        <IconButton autoFocus onClick={() => onClose("cancel")}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}

export default PlaylistSelectDialog;
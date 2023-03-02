import React from 'react';

// mui
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button'
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField'

// context
import { PlaylistContext } from '../../../context/playlist/PlaylistContext';

export interface playlistAddDialogProps {
  onClose: (value: string) => void;
}

const PlaylistAddDialog = (props: playlistAddDialogProps) => {
  const { onClose } = props;

  const { playlist_list } = React.useContext(PlaylistContext);

  const closeButtonStyle = {
    height: 0,
    textAlign: "center",
  };

  const [newPlaylistName, setNewPlaylistName] = React.useState('');

  const handleChangeNewPlaylistName = (event: any) => {
    setNewPlaylistName(event.target.value);
  }

  return (
    <Dialog onClose={() => onClose("cancel")} open>
      <DialogTitle>新しいプレイリストの名前を入力</DialogTitle>
      <DialogContent dividers>
        <TextField onChange={handleChangeNewPlaylistName} id="outlined-basic" label="プレイリスト名" variant="outlined" type="text"/>
        <Button onClick={() => onClose(newPlaylistName)}>追加</Button>
      </DialogContent>
      <DialogActions>
        <IconButton autoFocus onClick={() => onClose("cancel")}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}

export default PlaylistAddDialog;
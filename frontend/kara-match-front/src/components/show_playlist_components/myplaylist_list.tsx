import React from 'react'
import PlaylistItem from './modules/PlaylistItem'

// mui
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import List from '@mui/material/List';

// contextをインポート
import { PlaylistContext } from '../../context/playlist/PlaylistContext';
import { PlaylistProvider } from "../../context/playlist/interface";
import { playlistDialogProps } from '../music_search_components/modules/playlistSelectDialog';

// dialogをimport
import PlaylistAddDialog, {playlistAddDialogProps}  from './modules/playlistAddDialog';
import { PlaylistAdd } from '@mui/icons-material';


type propsType = {

}



const MyPlaylistList = () => {
  // state
  const [addPlaylistDialogConfig, setAddPlaylistDialogConfig] = React.useState<playlistAddDialogProps | undefined>();

  // playlist contextを持ってくる
  const { playlist_list, setPlaylist_list, addPlaylist, deletePlaylist}: PlaylistProvider = React.useContext(PlaylistContext);

  // プレイリスト追加ボタンが押されたときの処理
  const handleToggle = async () => {
    console.log("プレイリストを削除します");
    const ret = await new Promise<string>((resolve) => {
      setAddPlaylistDialogConfig({
        onClose:resolve,
      });
    });
    setAddPlaylistDialogConfig(undefined);
    // playlist追加
    addPlaylist(ret);
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/myplaylist"
      >
        Go to my-playlist
      </Button>

      <Box>
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {playlist_list.map((playlist,index)=>(
              <PlaylistItem playlistName={playlist} key={index} />
          ))}
        </List>
        <Button
          onClick={handleToggle}
        >
        追加
        </Button>
      </Box>

      <Button variant="outlined" color="primary" component={Link} to="/menu">
        Back to menu
      </Button>
      {addPlaylistDialogConfig && <PlaylistAddDialog {...addPlaylistDialogConfig} />}
    </>
  );
}

export default MyPlaylistList;



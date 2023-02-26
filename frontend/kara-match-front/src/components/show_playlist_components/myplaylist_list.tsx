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

type propsType = {

}

const MyPlaylistList = () => {
  // playlist contextを持ってくる
  const { playlist_list, setPlaylist_list }: PlaylistProvider = React.useContext(PlaylistContext);

  return (
    <>
      <h1>my playlist-List page</h1>

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
        <Button >
          プレイリスト追加
        </Button>
    </Box>

      <Button variant="outlined" color="primary" component={Link} to="/menu">
        Back to menu
      </Button>
    </>
  );
};
export default MyPlaylistList;



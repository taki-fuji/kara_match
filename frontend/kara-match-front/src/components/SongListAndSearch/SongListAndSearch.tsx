import React from 'react'
import MusicSearch from '../music_search_components/MusicSearch'
import SongList from '../songlist_components/SongList';
import { Divider, Box, Grid, Typography, Card } from '@mui/material';

import NewMenuber from '../../component_parts/NewMenuber';

const SongListAndSearch = () => {
  return (
    <div className="songlist-and-search">
      <NewMenuber />
      <Box
        sx={{
          bgcolor: '#e3f2fd', // 青系の背景色
          color: '#0d47a1',   // テキストカラーを濃い青
          padding: 1,         // 全体のパディング
          borderRadius: 3,    // ボックスに丸みを追加
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // 軽い影を追加
        }}
      >
        <Grid container spacing={4} columns={16}>
          <Grid item xs={8}>
            <Card
              sx={{
                padding: 2,
                border: '2px solid #1976d2', // 青色の枠線で囲む
                borderRadius: 3,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // 軽い影
              }}
            >
              
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Music Search
              </Typography>

              <MusicSearch />
            </Card>
          </Grid>

          <Grid item xs={8}>
            <Card
              sx={{
                padding: 2,
                border: '2px solid #1976d2', // 青色の枠線で囲む
                borderRadius: 3,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // 軽い影
              }}
            >

              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Added Songs
              </Typography>
              <div className="scroll" id="song_list">
                <SongList />
              </div>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default SongListAndSearch
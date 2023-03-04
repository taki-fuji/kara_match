import React from 'react'
import MusicSearch from '../music_search_components/MusicSearch'
import SongList from '../songlist_components/SongList';
import { Divider, Box, Grid } from '@mui/material';

const SongListAndSearch = () => {
  return (
    <div className="songlist-and-search">
        <Box
            sx={{
            display: 'flex',
            alignItems: 'top',
            width: 'fit-content',
            bgcolor: 'background.paper',
            color: 'text.secondary',
            '& svg': {
            m: 1.5,
            },
            '& hr': {
            mx: 0.5,
            },
        }}>
            
            <Grid container spacing={10} columns={16}>
            <Grid item xs={8} >
                    <Box sx={{height:'100%'}}>
                        <MusicSearch />
                    </Box>
            </Grid>
            <Grid item xs={8} >
                <h2>追加済み</h2>
                <div className="scroll" id='song_list' >
                    <SongList />
                </div>
            </Grid>
        </Grid>
        </Box>
    </div>
  )
}

export default SongListAndSearch
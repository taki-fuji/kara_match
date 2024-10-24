import React, { useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { AppBar, Button } from "@mui/material";
import {withCookies} from 'react-cookie';
import { Grid } from '@mui/material';



import { BsFillPeopleFill } from "react-icons/bs";//人のアイコン
import { GoMail } from "react-icons/go";//メールアイコン
// import Menuber from "../components/Menuber_components/Menuber";
import { styled } from '@mui/material/styles';

import { Toolbar, Typography, Box, Paper } from '@mui/material';

const NewMenuber = () => {
  return (
    <div>
      <Paper elevation={4} sx={{ borderRadius: 2, overflow: 'hidden', marginBottom: 4 }}>
        <AppBar
            position="static"
            sx={{
            backgroundColor: '#1976d2', // More modern blue
            padding: '10px 20px',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                KaraMatch
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>

                <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to="/menu"
                sx={{
                    textTransform: 'none',
                    padding: '8px 16px',
                    borderRadius: 8,
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
                >
                Menu
                </Button>

                <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to="/matting"
                sx={{
                    textTransform: 'none',
                    padding: '8px 16px',
                    borderRadius: 8,
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
                >
                Match
                </Button>
                

                {/* <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to="/song-list"
                sx={{
                    textTransform: 'none',
                    padding: '8px 16px',
                    borderRadius: 8,
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
                >
                My Song List
                </Button> */}

                <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to="/show_songList"
                sx={{
                    textTransform: 'none',
                    padding: '8px 16px',
                    borderRadius: 8,
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
                >
                My Song List
                </Button>


                <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to="/show_friend_songs"
                sx={{
                    textTransform: 'none',
                    padding: '8px 16px',
                    borderRadius: 8,
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
                >
                Friends Song List
                </Button>

                {/* <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to="/myplaylist-list"
                sx={{
                    textTransform: 'none',
                    padding: '8px 16px',
                    borderRadius: 8,
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
                >
                My Playlist
                </Button> */}

                {/* <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to="/music-search"
                sx={{
                    textTransform: 'none',
                    padding: '8px 16px',
                    borderRadius: 8,
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
                >
                Music Search
                </Button> */}

                <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to="/shwo_musicSearch"
                sx={{
                    textTransform: 'none',
                    padding: '8px 16px',
                    borderRadius: 8,
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
                >
                Music Search
                </Button>

                <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to="/songlistandsearch"
                sx={{
                    textTransform: 'none',
                    padding: '8px 16px',
                    borderRadius: 8,
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
                >
                Songlist & Search
                </Button>

                <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/"
                sx={{
                    textTransform: 'none',
                    padding: '8px 16px',
                    borderRadius: 8,
                }}
                >
                Logout
                </Button>
            </Box>
            </Toolbar>
        </AppBar>
        </Paper>
    </div>
  )
}

export default NewMenuber

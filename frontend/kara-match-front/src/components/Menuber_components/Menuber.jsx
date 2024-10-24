// import React, { useContext, useEffect, useState} from "react";
// import { Link } from "react-router-dom";
// import { AppBar, Button } from "@mui/material";
// import {withCookies} from 'react-cookie';
// import { Grid } from '@mui/material';
// import '../App.css';


// import { BsFillPeopleFill } from "react-icons/bs";//人のアイコン
// import { GoMail } from "react-icons/go";//メールアイコン
// // import Menuber from "../components/Menuber_components/Menuber";
// import { styled } from '@mui/material/styles';

// import { Toolbar, Typography, Box } from '@mui/material';




// const Menuber = () => {

//     return (
//         <div>
//         <Paper elevation={4} sx={{ borderRadius: 2, overflow: 'hidden', marginBottom: 4 }}>
//         <AppBar
//             position="static"
//             sx={{
//             backgroundColor: '#1976d2', // More modern blue
//             padding: '10px 20px',
//             }}
//         >
//             <Toolbar sx={{ justifyContent: 'space-between' }}>
//             <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
//                 My Music App
//             </Typography>

//             <Box sx={{ display: 'flex', gap: 2 }}>
//                 <Button
//                 variant="contained"
//                 color="secondary"
//                 component={Link}
//                 to="/"
//                 sx={{
//                     textTransform: 'none',
//                     padding: '8px 16px',
//                     borderRadius: 8,
//                 }}
//                 >
//                 Logout
//                 </Button>

//                 <Button
//                 variant="outlined"
//                 color="inherit"
//                 component={Link}
//                 to="/song-list"
//                 sx={{
//                     textTransform: 'none',
//                     padding: '8px 16px',
//                     borderRadius: 8,
//                     '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
//                 }}
//                 >
//                 My Song List
//                 </Button>

//                 <Button
//                 variant="outlined"
//                 color="inherit"
//                 component={Link}
//                 to="/myplaylist-list"
//                 sx={{
//                     textTransform: 'none',
//                     padding: '8px 16px',
//                     borderRadius: 8,
//                     '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
//                 }}
//                 >
//                 My Playlist
//                 </Button>

//                 <Button
//                 variant="outlined"
//                 color="inherit"
//                 component={Link}
//                 to="/music-search"
//                 sx={{
//                     textTransform: 'none',
//                     padding: '8px 16px',
//                     borderRadius: 8,
//                     '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
//                 }}
//                 >
//                 Music Search
//                 </Button>

//                 <Button
//                 variant="outlined"
//                 color="inherit"
//                 component={Link}
//                 to="/matting"
//                 sx={{
//                     textTransform: 'none',
//                     padding: '8px 16px',
//                     borderRadius: 8,
//                     '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
//                 }}
//                 >
//                 Match
//                 </Button>

//                 <Button
//                 variant="outlined"
//                 color="inherit"
//                 component={Link}
//                 to="/songlistandsearch"
//                 sx={{
//                     textTransform: 'none',
//                     padding: '8px 16px',
//                     borderRadius: 8,
//                     '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
//                 }}
//                 >
//                 Songlist & Search
//                 </Button>
//             </Box>
//             </Toolbar>
//         </AppBar>
//         </Paper>
        
//         </div>
//     )
// }

// export default Menuber

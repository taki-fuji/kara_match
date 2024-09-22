import React, { useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { AppBar, Button } from "@mui/material";
import './home.css'

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';



const Home = () => {


  return (
    <>
   <ul class="topnav">
	<li><a class="active" href="#home">Login</a></li>
	<li><a href="#news">News</a></li>
	<li><a href="#contact">Contact</a></li>
	
</ul>
    </>
  )
}

export default Home

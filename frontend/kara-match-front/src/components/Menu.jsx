import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import {withCookies} from 'react-cookie';
import Profile from "../component_parts/Profile";
import { ApiContext } from "../context/ApiContext";



const Menu = (props) => {

  const { profiles, profile, askList, askListFull } = useContext(ApiContext);

  return (
    <>
      <h1>Menu Page</h1>
      <p></p>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
      >
        Logout
      </Button>

      <p></p>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/friend-list"
      >
        Go to Friend List Page!
      </Button>

      <p></p>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/myplaylist-list"
      >
        Go to My Play List Page!
      </Button>

      <p></p>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/match-search"
      >
        Go to match-search!
      </Button>

      <p></p>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/setting"
      >
        Go to setting!
      </Button>

      <p></p>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/itunes-api"
      >
        Go to itunesAPI test!
      </Button>
    </>
  );
};

export default withCookies(Menu);

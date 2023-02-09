import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Menu = () => {
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
    </>
  );
};

export default Menu;

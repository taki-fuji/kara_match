import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const MyPlaylistList = () => {
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
      <p></p>
      <Button variant="outlined" color="primary" component={Link} to="/menu">
        Back to menu
      </Button>
    </>
  );
};
export default MyPlaylistList;

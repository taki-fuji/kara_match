import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const MyPlayList = () => {
  return (
    <>
      <h1>my playlist page</h1>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/music-search"
      >Go to music-search</Button>
      <p></p>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/myplaylist-list"
      >Back to playlist-list</Button>
    </>
  );
};
export default MyPlayList;
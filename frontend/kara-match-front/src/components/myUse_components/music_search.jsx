import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const MusicSearch = () => {
  return (
    <>
      <h1>Music-search page</h1>
      
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/myplaylist"
      >Back to myplaylist</Button>
    </>
  );
};
export default MusicSearch;
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const MatchSearch = () => {
  return (
    <>
      <h1>match_search_page</h1>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/match-waite"
      >
        Go to match-waite
      </Button>
      <p></p>

      <Button variant="outlined" color="primary" component={Link} to="/menu">
        Back to menu
      </Button>
    </>
  );
};
export default MatchSearch;

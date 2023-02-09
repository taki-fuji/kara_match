import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const MatchWaite = () => {
  return (
    <>
      <h1>match_waite_page</h1>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/match-candidate"
      >Go to match-candidate-page</Button>
      <p></p>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/match-search"
      >Back to match-search-page</Button>
    </>
  );
};
export default MatchWaite;
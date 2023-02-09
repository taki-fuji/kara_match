import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const MatchCandidate = () => {
  return (
    <>
      <h1>match_candidate_page</h1>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/match-complite"
      >Go to match-complite</Button>
      <p></p>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/match-waite"
      >Back to match-wait-page</Button>
    </>
  );
};
export default MatchCandidate;
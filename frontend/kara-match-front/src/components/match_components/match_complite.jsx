import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const MatchComplete = () => {
  return (
    <>
      <h1>match complite page</h1>
      
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/menu"
      >Back to menu</Button>
    </>
  );
};
export default MatchComplete;
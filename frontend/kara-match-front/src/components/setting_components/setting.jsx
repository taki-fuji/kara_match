import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Setting = () => {
  return (
    <>
      <h1>Setting page</h1>
      
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/menu"
      >Back to menu</Button>
    </>
  );
};
export default Setting;
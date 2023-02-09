import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const FriendList = () => {
  return (
    <>
      <h1>Friend_List_Page</h1>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/friend-detail"
      >
        Go to friend-detail page
      </Button>
      <p></p>
      <Button variant="outlined" color="primary" component={Link} to="/menu">
        Back to menu
      </Button>
    </>
  );
};
export default FriendList;

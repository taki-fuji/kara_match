import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const FriendDetail = () => {
  return (
    <>
      <h1>Friend_detail_page</h1>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/friend-list"
      >Back to friend-list page</Button>
    </>
  );
};
export default FriendDetail;
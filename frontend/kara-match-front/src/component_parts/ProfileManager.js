import React, { useContext, useState } from "react";
import { Paper, IconButton, Button, TextField, Box, Typography } from "@mui/material";
import { MdAddAPhoto } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { BsPersonPlus, BsTrash, BsPersonCheckFill } from "react-icons/bs";
import { LocationOn } from "@mui/icons-material";
import { ApiContext } from "../context/ApiContext";
import styled from "@emotion/styled";

const ImageWrapper = styled(Box)({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",
});

const ProfileImage = styled("img")({
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid #ddd",
});

const ProfileDetails = styled(Box)({
  textAlign: "center",
  marginTop: "15px",
});

const ProfileManager = () => {
  const {
    profile,
    editedProfile,
    setEditedProfile,
    cover,
    setCover,
    editProfile,
    createProfile,
    deleteProfile,
  } = useContext(ApiContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleEditPicture = () => {
    document.getElementById("imageInput").click();
  };

  return (
    <Paper sx={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        プロフィール管理
      </Typography>

      <ImageWrapper>
        <ProfileImage
          src={
            profile.img
              ? profile.img
              : "https://kara-match-backend.onrender.com/media/image/null.png"
          }
          alt="profile"
        />
        <input
          type="file"
          id="imageInput"
          hidden
          onChange={(event) => {
            setCover(event.target.files[0]);
            event.target.value = ""; // 入力をリセット
          }}
        />
        <IconButton onClick={handleEditPicture} color="primary">
          <MdAddAPhoto />
        </IconButton>
      </ImageWrapper>

      <ProfileDetails>
        <BsPersonCheckFill /> {profile && <span>{profile.nickName}</span>}
        <hr />

        <TextField
          label="ニックネーム"
          value={editedProfile.nickName}
          name="nickName"
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <Typography variant="body2" color="textSecondary" gutterBottom>
          Joined at: {profile.created_on}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <LocationOn /> JAPAN
        </Typography>

        <Box sx={{ marginTop: "15px" }}>
          {editedProfile.id ? (
            <Button
              variant="contained"
              color="primary"
              onClick={editProfile}
              startIcon={<FaUserEdit />}
              sx={{ marginRight: "10px" }}
            >
              更新
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={createProfile}
              startIcon={<BsPersonPlus />}
              sx={{ marginRight: "10px" }}
            >
              作成
            </Button>
          )}

          <Button
            variant="outlined"
            color="error"
            onClick={deleteProfile}
            startIcon={<BsTrash />}
          >
            削除
          </Button>
        </Box>
      </ProfileDetails>
    </Paper>
  );
};

export default ProfileManager;





// import React, {useContext} from 'react'
// import { ApiContext } from '../context/ApiContext'
// import { styled } from '@mui/material/styles';
// import LocationOn from '@mui/icons-material/LocationOn';
// import { BsPersonCheckFill } from "react-icons/bs";
// import { MdAddAPhoto } from "react-icons/md";//カメラアイコン
// import { BsTrash } from "react-icons/bs";//ゴミ箱アイコン
// import { BsPersonPlus } from "react-icons/bs";
// import { FaUserEdit } from "react-icons/fa";//ユーザー書き換えのアイコン
// import { IconButton } from '@mui/material';
// import './pm.css';


// import Paper from '@mui/material/Paper';


// const Profile = styled("div")(({theme}) => ({
   
// }));



// const Image_wrapper = styled("div")(({theme}) => ({
//     textAlign: "center",
//     position: "relative",
//     margin: 6,
// }));

// const Exbutton = styled("button")(({theme}) => ({
//     // position: "absolute",
//     // top: "80%",
//     // left: "70%",
// }));

// const Profile_image = styled("img")(({theme}) => ({
//     width: 150,
//     height: 150,
//     ojectFit: "cover",
//     maxWidth: "100%",
//     borderRadius: "50%",
//     backgroundColor: "white",
// }));

// const Profile_details = styled("div")(({theme}) => ({
//     textAlign: "center",
// }));

// const Exspan = styled("span")(({theme}) => ({
//     verticalAlign: "middle",
//     color: "lightgrey",
//     fontFamily: '"Comic Neue", cursive',
// }));

// const Exhr = styled("hr")(({theme}) => ({
//     border: "none",
//     margin: "0 0 7px 0",
// }));



// const ProfileManager = () => {
//   const {
//     profile,
//     editedProfile,
//     setEditedProfile,
//     deleteProfile,
//     cover,
//     setCover,
//     createProfile,
//     editProfile,
//   } = useContext(ApiContext);

//   const handleEditPicture = () => {
//     const fileInput = document.getElementById("imageInput");//引数で指定されたIDの要素(return の中にある<input>のidの名前)を取得
//     fileInput.click();
//     console.log("カメラアイコンクリック")
//   };

//   const handleInputChange = () => (event) => {
//     const value = event.target.value;
//     const name = event.target.name;
//     setEditedProfile({ ...editedProfile, [name]: value });
//   };

//   // これでプロフィール更新処理を呼び出す
//   const handleSaveProfile = () => {
//     editProfile(); 
//   };
  
  
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setCover(file);  // 画像ファイルをステートに保存
//   };
  
//   return (
//     <Paper>
//     <Profile >
//       <Image_wrapper>
//         {profile.id ? (
//           <Profile_image src={profile.img} alt="profile" />
//         ) : (
//           <Profile_image
//             // src="http://127.0.0.1:8000/media/image/null.png"
//             src="https://kara-match-backend.onrender.com/media/image/null.png"
//             alt="profile"
//           />
//         )}
//         <input
//           type="file"
//           id="imageInput"
//           hidden="hidden"//inputのダイアログボタンを隠す
//           //hidden=true
//           onChange={(event) => {//
//             console.log(event.target.files[0])
//             setCover(event.target.files[0]);
//             event.target.value = "";
//           }}
//         />
//         <IconButton onClick={handleEditPicture}>
//           <MdAddAPhoto className="photo" />
//         </IconButton>
//       </Image_wrapper>

//       {editedProfile.id ? (
//         editedProfile.nickName ? (
//           <button className="user" onClick={() => editProfile()}>
//             <FaUserEdit />
//           </button>
//         ) : (
//           <button className="user-invalid" disabled>
//             <FaUserEdit />
//           </button>
//         )
//       ) : editedProfile.nickName && cover.name ? (
//         <button className="user" onClick={() => createProfile()}>
//           <BsPersonPlus />
//         </button>
//       ) : (
//         <button className="user-invalid" disabled>
//           <BsPersonPlus />
//         </button>
//       )}
//       <button className="trash" onClick={() => deleteProfile()}>
//         <BsTrash />
//       </button>

//       <Profile_details>
//         <BsPersonCheckFill className="badge" />{" "}
//         {profile && <span>{profile.nickName}</span>}
//         <hr />
//         <input
//           type="text"
//           value={editedProfile.nickName}
//           name="nickName"
//           onChange={handleInputChange()}
//         />
//         <hr />
        
//         <span>Joined at {profile.created_on} </span>
//         <hr />
//         <LocationOn /> <span>JAPAN</span>
//       </Profile_details>
//     </Profile>
//     </Paper>
//   );
// };

// export default ProfileManager;
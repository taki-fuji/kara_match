import React, {useContext} from 'react'
import { ApiContext } from '../context/ApiContext'
import { styled } from '@mui/material/styles';
import LocationOn from '@mui/icons-material/LocationOn';
import { BsPersonCheckFill } from "react-icons/bs";
import { MdAddAPhoto } from "react-icons/md";//カメラアイコン
import { BsTrash } from "react-icons/bs";//ゴミ箱アイコン
import { BsPersonPlus } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";//ユーザー書き換えのアイコン
import { IconButton } from '@mui/material';
import './pm.css';


import Paper from '@mui/material/Paper';


const Profile = styled("div")(({theme}) => ({
   
}));



const Image_wrapper = styled("div")(({theme}) => ({
    textAlign: "center",
    position: "relative",
    margin: 6,
}));

const Exbutton = styled("button")(({theme}) => ({
    // position: "absolute",
    // top: "80%",
    // left: "70%",
}));

const Profile_image = styled("img")(({theme}) => ({
    width: 150,
    height: 150,
    ojectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
    backgroundColor: "white",
}));

const Profile_details = styled("div")(({theme}) => ({
    textAlign: "center",
}));

const Exspan = styled("span")(({theme}) => ({
    verticalAlign: "middle",
    color: "lightgrey",
    fontFamily: '"Comic Neue", cursive',
}));

const Exhr = styled("hr")(({theme}) => ({
    border: "none",
    margin: "0 0 7px 0",
}));



const ProfileManager = () => {
  const {
    profile,
    editedProfile,
    setEditedProfile,
    deleteProfile,
    cover,
    setCover,
    createProfile,
    editProfile,

    editCover,
  } = useContext(ApiContext);

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");//引数で指定されたIDの要素(return の中にある<input>のidの名前)を取得
    fileInput.click();
    console.log("カメラアイコンクリック")
  };

  const handleInputChange = () => (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setEditedProfile({ ...editedProfile, [name]: value });
  };
  
  return (
    <Paper>
    <Profile >
      <Image_wrapper>
        {profile.id ? (
          <Profile_image src={profile.img} alt="profile" />
        ) : (
          <Profile_image
            src="http://127.0.0.1:8000/media/image/null.png"
            alt="profile"
          />
        )}
        <input
          type="file"
          id="imageInput"
          hidden="hidden"//inputのダイアログボタンを隠す
          //hidden=true
          onChange={(event) => {//
            console.log(event.target.files[0])
            setCover(event.target.files[0]);
            event.target.value = "";
          }}
        />
        <IconButton onClick={handleEditPicture}>
          <MdAddAPhoto className="photo" />
        </IconButton>
      </Image_wrapper>

      {editedProfile.id ? (
        editedProfile.nickName ? (
          <button className="user" onClick={() => editProfile()}>
            <FaUserEdit />
          </button>
        ) : (
          <button className="user-invalid" disabled>
            <FaUserEdit />
          </button>
        )
      ) : editedProfile.nickName && cover.name ? (
        <button className="user" onClick={() => createProfile()}>
          <BsPersonPlus />
        </button>
      ) : (
        <button className="user-invalid" disabled>
          <BsPersonPlus />
        </button>
      )}
      <button className="trash" onClick={() => deleteProfile()}>
        <BsTrash />
      </button>

      <Profile_details>
        <BsPersonCheckFill className="badge" />{" "}
        {profile && <span>{profile.nickName}</span>}
        <hr />
        <input
          type="text"
          value={editedProfile.nickName}
          name="nickName"
          onChange={handleInputChange()}
        />
        <hr />
        <span>Joined at {profile.created_on} </span>
        <hr />
        <LocationOn /> <span>JAPAN</span>
      </Profile_details>
    </Profile>
    </Paper>
  );
};

export default ProfileManager;




  //   return (
  //     <div  className="comment">
  //       <div className="image-wrapper">
  //         {profile.id ? (
  //           <img src={profile.img} alt="profile" className="profile-image" />
  //         ) : (
  //           <img
  //             src="http://127.0.0.1:8000/media/image/null.png"
  //             alt="profile"
  //             className="profile-image"
  //           />
  //         )}
  //         <input
  //           type="file"
  //           id="imageInput"
  //           hidden="hidden"
  //           //hidden=true
  //           onChange={(event) => {
  //             setCover(event.target.files[0]);
  //             event.target.value = "";
  //           }}
  //         />
  //         <IconButton onClick={handleEditPicture}>
  //           <MdAddAPhoto className="photo" />
  //         </IconButton>
  //       </div>
  
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
  
  //       <div className="profile-details">
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
  //       </div>
  //     </div>
  //   );
  // };
  
  // export default ProfileManager;
import React, { useContext, useEffect } from 'react';
import { ApiContext } from '../context/ApiContext';
import { styled } from '@mui/material/styles';
import LocationOn from '@mui/icons-material/LocationOn';
import { BsPersonCheckFill } from "react-icons/bs";
import { MdAddAPhoto } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { IconButton, Button } from '@mui/material';
import './pm.css';
import Paper from '@mui/material/Paper';

const Profile = styled("div")(({theme}) => ({}));

const Image_wrapper = styled("div")(({theme}) => ({
    textAlign: "center",
    position: "relative",
    margin: 6,
}));

const Profile_image = styled("img")(({theme}) => ({
    width: 150,
    height: 150,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
    backgroundColor: "white",
}));

const Profile_details = styled("div")(({theme}) => ({
    textAlign: "center",
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
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    console.log("value", value);
    console.log("name", name);
    setEditedProfile({ ...editedProfile, [name]: value });
    console.log("editedProfile", editedProfile);
  };

  const handleAddNickName = async () => {
    if (editedProfile.nickName) {
      try {
        await createProfile();  // ニックネームを追加
        console.log("Nickname added successfully");
      } catch (error) {
        console.error("Error adding nickname:", error);
      }
    }
  };

  const handleSave = async () => {
    if (editedProfile.nickName) {
      try {
        await editProfile();  // プロフィールを編集するための関数を呼び出す
        console.log("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await deleteProfile();
      console.log("Profile deleted successfully");
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  useEffect(() => {
    console.log("editedProfile updated:", editedProfile);
  }, [editedProfile]);

  return (
    <Paper>
      <Profile>
        {console.log("img: " + profile.img + " nickname: " + profile.nickName)}
        <Image_wrapper>
          {profile.id ? (
            <Profile_image src={profile.img} alt="profile" />
          ) : (
            <Profile_image
              src="https://kara-match-backend.onrender.com/media/image/null.png"
              alt="profile"
            />
          )}
          <input
            type="file"
            id="imageInput"
            hidden="hidden"
            onChange={(event) => {
              setCover(event.target.files[0]);
              event.target.value = "";
            }}
          />
          <IconButton onClick={handleEditPicture}>
            <MdAddAPhoto className="photo" />
          </IconButton>
        </Image_wrapper>

        <Profile_details>
          {/* ニックネーム表示欄 */}
          <div>
            <BsPersonCheckFill className="badge" />{" "}
            <span>現在のニックネーム: {profile.nickName || "未設定"}</span>
          </div>
          <hr />

          {/* ニックネーム入力欄 */}
          <div>
            <input
              type="text"
              value={editedProfile.nickName || ""}
              name="nickName"
              placeholder="新しいニックネームを入力"
              onChange={handleInputChange}
            />
          </div>
          <hr />

          {/* ニックネームが追加されていない場合は「ニックネーム追加」ボタンを表示 */}
          {!profile.nickName || !profile.img  ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddNickName}
              disabled={!editedProfile.nickName}
            >
              ニックネーム追加
            </Button>
          ) : (
            // ニックネームが追加されている場合は「決定」ボタンを表示
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave} // ここでhandleSaveを呼び出す
            >
              画像&ネーム 決定
            </Button>
          )}
          <hr />

          <span>Joined at {profile.created_on}</span>
          <hr />
          <LocationOn /> <span>JAPAN</span>
        </Profile_details>

        <button className="trash" onClick={handleDeleteProfile}>
          <BsTrash />
        </button>
      </Profile>
    </Paper>
  );
};

export default ProfileManager;

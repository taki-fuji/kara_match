// ApiContext：全てのファイルで使えるステート、関数などをまとめて宣言する。ファイル

import React, { createContext, useState, useEffect } from "react";
import { withCookies } from "react-cookie";
import axios from "axios";
import PlaylistContext from "./playlist/PlaylistContext";

import { useCookies } from "react-cookie";
import { FaGlasses } from "react-icons/fa";

// ApiContextという名前で、Contextを宣言している。コンポーネントツリーを無視して、コンポーネントの値を送れる。
export const ApiContext = createContext();

const ApiContextProvider = (props) => {
    // const token = props.cookies.get("current-token");// ログイン認証に成功したときにcurrent-tokenにtokenが保存されているのでgetで取得する
    const [inputToken, setInputToken] = useState("");//tokenを入れておくstate,使わないかも
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);//cookieを管理する,setCookieでcookiesに値を保存removeCookieでリセット
    const [profile, setProfile] = useState([]);//ログインしたユーザーのプロフィールを格納するstate
    const [profiles, setProfiles] = useState([]);//他のユーザーを含めたプロフィールを格納するstate
    const [editedProfile, setEditedProfile] = useState({ id: "", nickName: "" });//プロフィールを編集した時の情報を格納するstate
    const [askList, setAskList] = useState([]);//友達の申請リスト(自分宛)を格納するstate
    const [askListFull, setAskListFull] = useState([]);//自分宛の友達申請+自分が出している申請を格納
    const [cover, setCover] = useState([]);//画像保存用


    const [Allsongs, setAllsongs] = useState([])//全ての歌を入れるstate
    const [mysong, setMysong] = useState([]);//自分のsongを入れておくstate
    const [addsong, setAddsong] = useState({song_name: "",singer: "",artistId: "",collectionId: "",trackId: "",img_url: ""});//追加した音楽の情報を入れておくstate
    //idを消してみたid: "0",

    const [Dsong,setDsong] = useState([]);//消去する歌のidを入れておくstate

    const [UpdateCheck, setUpdateCheck] = useState(false);//追加、除去をsongjudgeに知らせるstate,いらないかも

    const [updata_prof, setupdata_prof] = useState(false);
    const [updata_prof2, setupdata_prof2] = useState(false);


// ページが更新されるたび、関数が読まれてしまうがこのEffect内の関数は最初の一回しか読まれない。
  useEffect(() => {


  //ログインしているuser自身の情報をとってくる
    const getMyProfile = async () => {
      try {

        const resmy = await axios.get(//ログインしているプロフィール情報を取得
          "http://localhost:8000/api/user/myprofile/",
          {
            headers: {//token割り当て
              Authorization: `Token ${cookies.token}`,
            },
          }
        );


       
        const res = await axios.get(
          // approval フレンドリクエストを承認した人たちの情報

          "http://localhost:8000/api/user/approval/",
          {
            headers: {
              Authorization: `Token ${cookies.token}`,
            },
          }
        );
        
        resmy.data[0] && setProfile(resmy.data[0]);//resmyにデータが入っていたらserProfileでデータを格納
        resmy.data[0] &&
          setEditedProfile({
            id: resmy.data[0].id,
            nickName: resmy.data[0].nickName,
          });//取得した情報を格納,プロフィールの名前などに初期値として割り当てておく
        resmy.data[0] &&
          setAskList(
            res.data.filter((ask) => {
              return resmy.data[0].userPro === ask.askTo;
            })
          );//res.dataには自分宛以外の申請も含まれているのでfilterで自分宛のものだけを取り出している
        setAskListFull(res.data);//res.dataをそのまま入れておく
      } catch {
        console.log("error");
      }
    };


    const getProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/profile/", {
          headers: {
            Authorization: `Token ${cookies.token}`,
          },
        });
        setProfiles(res.data);
      } catch {
        console.log("error");
      }
    };
    
    // const getInbox = async () => {
    //   try {
    //     const res = await axios.get("http://localhost:8000/api/dm/inbox/", {
    //       headers: {
    //         Authorization: `Token ${token}`,
    //       },
    //     });
    //     setInbox(res.data);
    //   } catch {
    //     console.log("error");
    //   }
    // };
    getMyProfile();
    getProfile();
    // getInbox();
    setupdata_prof2(!updata_prof2)
  }, [cookies.token, profile.id, cover, updata_prof]);
    //tokenかprofile.idが変更されたら、Effect内が実行される
      // playlistContextを取ってきて歌のデータをここにも共有する
  //  const {playlist, playlistDispatch} = React.useContext(PlaylistContext);
    const getMysong = async () => {//最初に自分のsongデータをとってくる
      try{
        const res = await axios.get("http://localhost:8000/api/user/mysong/", {
          headers: {
            Authorization: `Token ${cookies.token}`,
          },
        });
        res.data[0] && setMysong(res.data);
      } catch {
        console.log("error");
      }
    };

    useEffect(() => {
      getMysong();
    },[cookies.token, addsong, Dsong])

    const getAllsong = async () => {//最初に自分のsongデータをとってくる
      try{
        const res = await axios.get("http://localhost:8000/api/user/song/", {
          headers: {
            Authorization: `Token ${cookies.token}`,
          },
        });
        setAllsongs(res.data);
      } catch {
        console.log("error");
      }
    };

    useEffect(() => {
      getAllsong();
    },[cookies.token, addsong, Dsong])
    // useEffect(() => {
    //   editProfile()
    // },[cover])


    

  //ここで音楽を追加,除去する関数を作る

    // const token = t.cookies.get("current-token");

    const createSong = async () => {
      
      // console.log(addsong)
      var create_judge = true;

      Object.values(mysong).map((s) =>{//Object.values(mysong)とすることでmtsongをobject型からarray型に変更している
        if(addsong.trackId === s.trackId){//チェックを押した歌のcollectionIdと自分の選択した歌のcollectionIdを比較して同じ場合だったら
          console.log("同じ曲は追加できません")
          create_judge = false;
        }
      })

      if(create_judge === false){//いらないとは思うがバグ予防?
        console.log("同じ曲は追加できません")
      }else {
      const createData = new FormData();
      createData.append("id", addsong.id);
      createData.append("song_name", addsong.song_name);
      createData.append("singer", addsong.singer);
      createData.append("artistId", addsong.artistId);
      createData.append("collectionId", addsong.collectionId);
      createData.append("trackId", addsong.trackId);
      createData.append("img_url", addsong.img_url);

      // for (let value of createData.entries()) { 
      //   console.log(value); 
      // }
      
      try {
        const res = await axios.post(
          "http://localhost:8000/api/user/song/",
          createData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${cookies.token}`,
            },
          }
        );
        console.log("保存完了")
        setAddsong([])
        setMysong([])
        getMysong()
        setUpdateCheck(!UpdateCheck)
        // setMysong(res.data);
        // setAddsong({id: res.data.id, song_name: res.data.song_name, singer: res.data.singer, artistId: res.data.artistId, collectionId: res.data.collectionId, trackId: res.data.trackId, img_url: res.data.img_url})
        // setProfile(res.data);
        // setEditedProfile({ id: res.data.id, nickName: res.data.nickName });
      } catch {
        console.log("error");
      }
    }
    };


    const deleteSong = async () => {
      console.log(Dsong)
      try {
        await axios.delete(
          `http://localhost:8000/api/user/song/${Dsong}/`,//mysong.id -> Dsong
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${cookies.token}`,
            },
          }
        );
        console.log("除去完了")
        setDsong([])
        setMysong([])
        getMysong()
        setUpdateCheck(!UpdateCheck)
        // setMysong([]);
        // setAddsong({id: "",song_name: "",singer: "",artistId: "",collectionId: "",trackId: "",img_url: ""})

        // setProfiles(profiles.filter((dev) => dev.id !== profile.id));
        // setProfile([]);
        // setEditedProfile({ id: "", nickName: "" });
        // setCover([]);
        // setAskList([]);
      } catch {
        console.log("error");
      }
    };


    //ここで音楽を追加,除去する関数を作る


  const createProfile = async () => {
    console.log(cover.name)
    const createData = new FormData();
    createData.append("nickName", editedProfile.nickName);
    cover.name && createData.append("img", cover, cover.name);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/profile/",
        createData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${cookies.token}`,
          },
        }
      );
      setProfile(res.data);
      setEditedProfile({ id: res.data.id, nickName: res.data.nickName });
    } catch {
      console.log("error");
    }
  };




  const deleteProfile = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/user/profile/${profile.id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${cookies.token}`,
          },
        }
      );
      setProfiles(profiles.filter((dev) => dev.id !== profile.id));
      setProfile([]);
      setEditedProfile({ id: "", nickName: "" });
      setCover([]);
      setAskList([]);
    } catch {
      console.log("error");
    }
  };


  const editProfile = async () => {
    console.log(cover.name)
    console.log(editedProfile.nickName)
    const editData = new FormData();
    editData.append("nickName", editedProfile.nickName);
    cover.name && editData.append("img", cover, cover.name);
    try {
      const res = await axios.put(
        `http://localhost:8000/api/user/profile/${profile.id}/`,
        editData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${cookies.token}`,
          },
        }
      );
      setProfile(res.data);
    } catch {
      console.log("error");
    }
  };
  

  const newRequestFriend = async (askData) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/user/approval/`,
        askData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${cookies.token}`,
          },
        }
      );
      setAskListFull([...askListFull, res.data]);
    } catch {
      console.log("error");
    }
  };

  //   const sendDMCont = async (uploadDM) => {
  //     try {
  //       await axios.post(`http://localhost:8000/api/dm/message/`, uploadDM, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Token ${token}`,
  //         },
  //       });
  //     } catch {
  //       console.log("error");
  //     }
  //   };

  const changeApprovalRequest = async (uploadDataAsk, ask) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/user/approval/${ask.id}/`,
        uploadDataAsk,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${cookies.token}`,
          },
        }
      );
      setAskList(askList.map((item) => (item.id === ask.id ? res.data : item)));

      const newDataAsk = new FormData();
      newDataAsk.append("askTo", ask.askFrom);
      newDataAsk.append("approved", true);

      const newDataAskPut = new FormData();
      newDataAskPut.append("askTo", ask.askFrom);
      newDataAskPut.append("askFrom", ask.askTo);
      newDataAskPut.append("approved", true);

      const resp = askListFull.filter((item) => {
        return item.askFrom === profile.userPro && item.askTo === ask.askFrom;
      });

      !resp[0]
        ? await axios.post(
            `http://localhost:8000/api/user/approval/`,
            newDataAsk,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${cookies.token}`,
              },
            }
          )
        : await axios.put(
            `http://localhost:8000/api/user/approval/${resp[0].id}/`,
            newDataAskPut,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${cookies.token}`,
              },
            }
          );
    } catch {
      console.log("error");
    }
  };


  return (
    <ApiContext.Provider
      value={{
        profile,
        profiles,
        cover,
        setCover,
        askList,
        askListFull,
        // inbox,
        newRequestFriend,
        createProfile,
        editProfile,
        deleteProfile,
        changeApprovalRequest,
        // sendDMCont,
        editedProfile,
        setEditedProfile,



        //自分で書いた下
        addsong,
        setAddsong,
        cookies,
        setCookie,
        inputToken,
        setInputToken,
        createSong,
        deleteSong,

        setMysong,
        mysong,

        Dsong,
        setDsong,

        UpdateCheck,
        setUpdateCheck,
        //songのstate達上

        Allsongs,

        cookies,

        updata_prof,
        setupdata_prof,

        updata_prof2,
        setupdata_prof2,

      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};


export default ApiContextProvider;
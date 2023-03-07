import React, { createContext, useState, useEffect, useContext } from "react";
import { withCookies } from "react-cookie";
import axios from "axios";

import { useCookies } from "react-cookie";

import { ApiContext } from "./ApiContext";

export const MatchContext = createContext();

const MatchContextProvider = (props) => {

    const [SelectUser, setSelectUser] = useState()//Search_frends.jsでselectされた歌のuserを入れるstate
    const [click, setclick] = useState(false)//match機能のフレンド選択でクリックされたか判定するstate
    const [username, setusername] = useState("No Select");//usernameを保存するstate
    const [fprof, setfprof] = useState([]);//フレンドのプロフィールを格納する
    const { profiles, profile, askList, askListFull, cookies, setupdata_prof, updata_prof, setupdata_prof2, updata_prof2 } = useContext(ApiContext);
    const approve_askList = askList.filter((ask) => {return ask.approved === true;});//自分宛のフレンドリクエストがtrueのもの(フレンドのuser)をフィルタリングしたリターン
    const friends_profile =[]//フレンドのプロフィールを格納する変数
    const [delete_ask_id, setdelete_ask_id] = useState();
    const [delete_ask_id2, setdelete_ask_id2] = useState();
    const [del_comp, setdel_comp] = useState(false);
    const [del_comp2, setdel_comp2] = useState(false);


    const Delete_frends_tunction = async () => {
      console.log(delete_ask_id)
      try {
        await axios.delete(
          `http://localhost:8000/api/user/approval/${delete_ask_id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${cookies.token}`,
            },
          }
        );
        console.log("除去完了")
      } catch {
        console.log("error");
      }

      console.log(delete_ask_id2)
      try {
        await axios.delete(
          `http://localhost:8000/api/user/approval/${delete_ask_id2}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${cookies.token}`,
            },
          }
        );
        console.log("除去完了")
      } catch {
        console.log("error");
      }

      setupdata_prof(!updata_prof)
    };


    //----------------フレンド表示機能---------------------
    useEffect(() => {
            console.log("下記が友達のapproveList" + approve_askList)
            console.log(approve_askList)
            Search_myfrends_profile()

    }, [askList, cookies.token,  profile.id, updata_prof2])
    
    const Search_myfrends_profile = () => {//ここでフレンドだけのprofileを選択している
    Object.values(profiles).map((s) =>{//Object.values(mysong)とすることでmtsongをobject型からarray型に変更している
        Object.values(approve_askList).map((a) =>{
            if(s.userPro === a.askFrom){//チェックを押した歌のcollectionIdと自分の選択した歌のcollectionIdを比較して同じ場合だったら
                // console.log("User nickName")
                // console.log(s.nickName)
                // setfprof(s)
                friends_profile.push(s)
                console.log("下記が友達List" + approve_askList)
                console.log(friends_profile)
            }
        })
    })
    console.log(fprof)
    setfprof(friends_profile)//ここでstateに入れることで下記のmapから画面に表示することができた
    }
    //----------------フレンド表示機能-------------------
  return (
    <MatchContext.Provider
    value={{
        SelectUser,
        setSelectUser,
        click,
        setclick,
        username,
        setusername,
        fprof,
        setfprof,
        delete_ask_id,
        setdelete_ask_id,
        Delete_frends_tunction,
        delete_ask_id2,
        setdelete_ask_id2,
        del_comp,

        del_comp2,
    }}    
    >
        {props.children}
    </MatchContext.Provider>
  )
}

export default MatchContextProvider

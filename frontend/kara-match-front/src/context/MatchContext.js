import React, { createContext, useState, useEffect } from "react";
import { withCookies } from "react-cookie";
import axios from "axios";

import { useCookies } from "react-cookie";

export const MatchContext = createContext();

const MatchContextProvider = (props) => {

    const [SelectUser, setSelectUser] = useState()//Search_frends.jsでselectされた歌のuserを入れるstate

    const [click, setclick] = useState(false)//match機能のフレンド選択でクリックされたか判定するstate

    const [username, setusername] = useState("No Select");

  return (
    <MatchContext.Provider
    value={{
        SelectUser,
        setSelectUser,
        click,
        setclick,
        username,
        setusername,
    }}    
    >
        {props.children}
    </MatchContext.Provider>
  )
}

export default MatchContextProvider

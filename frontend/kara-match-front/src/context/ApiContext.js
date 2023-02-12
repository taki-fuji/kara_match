import React, { createContext, useState, useEffect } from "react";
import { withCookies } from "react-cookie";
import axios from "axios";
export const ApiContext = createContext();

const ApiContextProvider = (props) => {
    const token = props.cookies.get("current-token");
    const [profile, setProfile] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [editedProfile, setEditedProfile] = useState({ id: "", nickName: "" });
    const [askList, setAskList] = useState([]);
    const [askListFull, setAskListFull] = useState([]);
    const [inbox, setInbox] = useState([]);
    const [cover, setCover] = useState([]);


}

export default withCookies(ApiContextProvider);
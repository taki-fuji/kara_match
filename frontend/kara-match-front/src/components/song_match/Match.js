import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import React, {useState, useContext, useEffect} from 'react'
import { ApiContext } from '../../context/ApiContext';
import { Card, CardContent } from '@mui/material'
import { Typography } from '@mui/material';


import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';

import "../../App.css"

import Search_frends from '../../component_parts/Search_frends';

import Profile2 from "../../component_parts/Profile2";//検索したプロフィールを表示する

import { MatchContext } from "../../context/MatchContext";

import Match_show from "../../component_parts/Match_show";

import { useRef, EffectCallback, DependencyList } from 'react';



const Match = () => {

    //ここから下記がフレンドを表示する機能
    const { profiles, profile, askList, askListFull } = useContext(ApiContext);
    const approve_askList = askList.filter((ask) => {return ask.approved === true;});//自分宛のフレンドリクエストがtrueのもの(フレンドのuser)をフィルタリングしたリターン
    

    const [fprof, setfprof] = useState([]);//フレンドのプロフィールを格納する
    const friends_profile =[]//フレンドのプロフィールを格納する変数

    
    useEffect(() => {
            console.log("下記が友達のapproveList" + approve_askList)
            console.log(approve_askList)
            Search_myfrends_profile()
    }, [askList])
    
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

    
    const listProfiles =
    fprof &&
    fprof.map((fri_prof) => (//カードごとの情報をmapのループで取り出しfilprofに入れる
        <Search_frends
        key={fri_prof.id}
        Data={fri_prof}
        />
    ));

    //ここまでがフレンドを表示する機能

//---------------------------------------------------------------

    //下記がフレンドと同じ歌を表示する機能
    const { mysong, Allsongs} = useContext(ApiContext);//自分の歌のリスト
    const { SelectUser, click, username, setusername} = useContext(MatchContext);
    const [matchsongs, setmatchsongs] = useState([]);//同じ歌を格納するstate


    const frend_songs=[]//選択したフレンドの歌格納する
    const mso =[]//同じ歌を格納する配列

    const isFirstRender = useRef(false)//これを使うことで初回にuseffectが起動するのを防ぐ

    useEffect(() => { // このeffectは初回レンダー時のみ呼ばれるeffect
        isFirstRender.current = true
    }, [])

    const Search_equal_song = () => {
        console.log(SelectUser)
        console.log(Allsongs)
        Object.values(Allsongs).map((m) =>{//ここで選択したフレンドの歌だけをAllsongsから抜き取る
            if(m.user === SelectUser){//SelectUserには選択したuserが入っている
                frend_songs.push(m);
            }
        })
        console.log(frend_songs)
        // const frend_songs = Allsongs.filter((son) => {return son.user === SelectUser;});
            Object.values(mysong).map((m) =>{//自分の歌をmapで回す
                console.log(m.trackId)
                Object.values(frend_songs).map((f) =>{//フレンドの歌をmapで回す
                    console.log(f.trackId)
                    if(m.trackId === f.trackId){//trackIdが一緒なら画面に出力する
                        // setmatchsongs(m);
                        console.log("マッチ")
                        mso.push(m);
                    }
                })
            })
        setmatchsongs(mso);//配列からstateに値を入れるとなんか上手くいく
    }

    useEffect(() => {
        if(isFirstRender.current) { // 初回レンダー判定
          isFirstRender.current = false // もう初回レンダーじゃないよ代入
        } else {//2回目からここが動く
            Search_equal_song()
        }
    }, [click]);

    //下の処理で画面に表示できるようにする
    const matching_song = 
            matchsongs &&
            matchsongs.map((msong) => (
                <Match_show
                key={msong.id}
                SData={msong}
                />
    ));
    //ここまでがフレンドと同じ歌を表示する機能


    useEffect(() => {//ページに戻ってきた時に前の値が入っているためrenderのタイミングで初期化
        setusername("No Select")
    },[])

//---------------------------------------------------------------


    // 検索キーワードを保持するためのstate
    const [keyword, setKeyword] = useState('');

    //自分以外のフレンドプロフィール && 検索したフレンドプロフィール
    const serch_frend = fprof.filter((prof) => {return (prof.id !== profile.id && prof.nickName === keyword);});//自分以外のプロフィールをフィルタリングしたリターン

    //下の記述で検索したkeywordでプロフィールを表示する
    const search_Profiles =
    serch_frend &&
    serch_frend.map((filprof) => (//カードごとの情報をmapのループで取り出しfilprofに入れる
        <Search_frends
        key={filprof.id}
        Data={filprof}
        />
    ));

    // const listProfiles =
    // fprof &&
    // fprof.map((fri_prof) => (//カードごとの情報をmapのループで取り出しfilprofに入れる
    //     <Search_frends
    //     key={fri_prof.id}
    //     Data={fri_prof}
    //     />
    // ));

    // 検索窓の入力が行われたときに、入力された値をkeyword stateに格納する関数
    const handleChange = (event) => {
        setKeyword(event.target.value)
    }

    const handleSearch = async() => {
    }

  return (
    <div>
      <h1>Hello My friend</h1>


        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '80%' }}>
            <TextField sx={{ ml: 1, flex: 1 }} variant='standard' label="キーワードでフレンドを検索" id="standard-basic" onChange={handleChange} type="text"/>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: '15px', width:'20px'}} aria-label="search" size='small' onClick={handleSearch}>
                    <SearchIcon />
            </IconButton>
        </Paper>

        <div>
            {search_Profiles}
        </div>

        <h2>List of the same song</h2>

        <h4>{username}</h4>

        <div>
            {matching_song}
        </div>

        <h2>Friends List</h2>

        <div>
            {listProfiles}
        </div>
    </div>
  )
}

export default Match

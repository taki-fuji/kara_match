import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import React, {useState, useContext, useEffect} from 'react'
import { ApiContext } from '../../context/ApiContext';
import { Card, CardContent, Box } from '@mui/material'
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

import { Grid } from '@mui/material';

import NewMenuber from "../../component_parts/NewMenuber";


const Match = () => {
    const { profiles, profile, askList, askListFull, cookies } = useContext(ApiContext);

    //ここから下記がフレンドを表示する機能
    const { fprof } = useContext(MatchContext);//fprofにフレンドのプロフィール情報が入っている

    
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

    // <TextField sx={{ ml: 1, flex: 1 }} variant='standard' label="キーワードでフレンドを検索" id="standard-basic" onChange={handleChange} type="text"/>

  return (
    // <div>
    //   <NewMenuber/>

    //   <Grid container>
    //     <Grid item xs={6}>
    //     <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '80%' }}>
    //         <TextField sx={{ ml: 1, flex: 1 }} variant='standard' label="キーワードでフレンドを検索" id="standard-basic" onChange={handleChange} type="text"/>
    //         <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    //         <IconButton type="button" sx={{ p: '15px', width:'20px'}} aria-label="search" size='small' onClick={handleSearch}>
    //                 <SearchIcon />
    //         </IconButton>
    //     </Paper>

    //         <div>
    //             {search_Profiles}
    //         </div>

    //         <h2>Friends List</h2>
    //         <div>
    //             {listProfiles}
    //         </div>
    //     </Grid>


    //     <Grid item xs={6}>
    //     <h2>List of the same song</h2>

    //     <h4>{username}</h4>
       
    //     <div>
    //         {matching_song}
    //     </div>
    //     </Grid>



    //     </Grid>
    // </div>

    <div>

      <NewMenuber />
      
      <Box
        sx={{
          bgcolor: '#e3f2fd', // 青系の背景色
          color: '#0d47a1',   // テキストカラーを濃い青
          padding: 1,         // 全体のパディング
          borderRadius: 3,    // ボックスに丸みを追加
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // 軽い影を追加
        }}
      >

      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Box
            sx={{
              border: '2px solid #1976d2', // 左側全体を青枠で囲む
              borderRadius: '8px',
              padding: '16px', // 全体の内側に余白を追加
              bgcolor: '#fff', // 内側を白色に変更
            }}
          >
            <Paper
              component="form"
              sx={{
                p: '10px 15px',
                display: 'flex',
                alignItems: 'center',
                width: '80%',
                border: '2px solid #1976d2', // 青の枠線
                borderRadius: '8px', // 角を少し丸く
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 軽い影を追加
              }}
            >
              <TextField
                sx={{ ml: 1, flex: 1 }}
                variant="standard"
                label="キーワードでフレンドを検索"
                id="standard-basic"
                onChange={handleChange}
                type="text"
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                type="button"
                sx={{ p: '15px', width: '20px' }}
                aria-label="search"
                size="small"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </Paper>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Search Results
              </Typography>
              <div>{search_Profiles}</div>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Friends List
              </Typography>
              <div>{listProfiles}</div>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Paper
            component="form"
            sx={{
              p: '10px 15px',
              display: 'flex',
              alignItems: 'center',
              width: '80%',
              border: '2px solid #1976d2', // 青の枠線
              borderRadius: '8px', // 角を少し丸く
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 軽い影を追加
            }}
          >
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                List of the same song
              </Typography>
              <h4 style={{ color: '#1976d2' }}>{username}</h4>
              <div>{matching_song}</div>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      </Box>
    </div>
  )
}

export default Match

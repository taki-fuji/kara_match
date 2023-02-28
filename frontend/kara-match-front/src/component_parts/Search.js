import React, {useState, useContext} from 'react'
import { ApiContext } from '../context/ApiContext'


import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import {ToggleButton,ToggleButtonGroup} from '@mui/material';


import Profile from './Profile';



const Search = () => {

    // 検索キーワードを保持するためのstate
    const [keyword, setKeyword] = useState('');

    const { profiles, profile, askList, askListFull } = useContext(ApiContext);

    //自分以外のプロフィール && 検索したプロフィール
    const filterProfiles = profiles.filter((prof) => {return (prof.id !== profile.id && prof.nickName === keyword);});//自分以外のプロフィールをフィルタリングしたリターン


    const listProfiles =
    filterProfiles &&
    filterProfiles.map((filprof) => (//カードごとの情報をmapのループで取り出しfilprofに入れる
        <Profile
        key={filprof.id}
        profileData={filprof}
        askData={askListFull.filter((ask) => {//askDataを取り出してローカル変数のaskに入れる
            return (
            (filprof.userPro === ask.askFrom) | (filprof.userPro === ask.askTo)
            );
        })}
        />
    ));


    // 検索窓の入力が行われたときに、入力された値をkeyword stateに格納する関数
    const handleChange = (event) => {
        setKeyword(event.target.value)
    }

    const handleSearch = async() => {
    }

    return(
        <div>
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '80%' }}>
            <TextField sx={{ ml: 1, flex: 1 }} variant='standard' label="キーワードでユーザーを検索" id="standard-basic" onChange={handleChange} type="text"/>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: '15px', width:'20px'}} aria-label="search" size='small' onClick={handleSearch}>
                    <SearchIcon />
            </IconButton>
        </Paper>

        {listProfiles}


        </div>
    )
};

export default Search;
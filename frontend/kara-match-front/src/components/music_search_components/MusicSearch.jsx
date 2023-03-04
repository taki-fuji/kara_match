import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import React, {useState} from 'react'
import qs from 'qs';
import axios from 'axios';

// modulesをインポート
import ErrorPage from './modules/Error';
import NoResult from './modules/No_result';
import Result from './modules/Result';
import Result2 from './modules/Result2';

// material-uiのインポート
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Box from "@mui/material/Box";

const MusicSearch = () => {

    // 検索キーワードを保持するためのstate
    const [keyword, setKeyword] = useState('');
    // APIコール状態を管理するstate
    const [resultType, setResultType] = useState('init');
    // 検索結果を入れるstate
    const [items, setItems] = useState([]);
    // Result1 or 2 を管理するstate
    const [alignment, setAlignment] = React.useState('1');

    const apiClient = axios.create({
        baseURL: "https://itunes.apple.com",
    });
    
    const handleSearch = async(keyword) => {
        const params = {
            term:keyword,
            media: "music",
            entity: "musicTrack",
            country: "jp",
            lang: "ja_jp",
            limit: "50"
        };

        // baseURLに設定したparamsを使ってgetリクエストを送信
        try{
            const response = await apiClient.get(`/search?${qs.stringify(params)}`);
            console.log('/search?$'+qs.stringify(params))
            console.log(response)
            const {data} = response;
            // console.log(data.resultCount)
            //以下の条件分岐でgetの結果がどうなったのかをresultTyleに保持する
            if(data.resultCount === 0){//検索結果がない時
                setResultType('no_result')
            }else{//検索が成功した時
                setResultType('success')
                setItems(data.results)
            }
        }catch(error){//getリクエストがエラーだった時
            console.log("error in components/itunes_API/Search.jsx at handleSerch() while get with itunes API")
            console.log(error)
            setResultType('failure')
        }
        
    }

    // 検索窓の入力が行われたときに、入力された値をkeyword stateに格納する関数
    const handleChange = (event) => {
        handleSearch(event.target.value)
    }

    // APIとの通信ができたかどうかで表示するコンポーネントを変更する関数
    const switchView = () => {
        // console.log(alignment)
        switch(resultType){
            case "no_result":
                return <NoResult />
            case "success":
                if(alignment === '0'){
                    return <Result items={items} />
                }else if(alignment === '1'){
                    return (
                        <div className="scroll">
                            <Result2 items={items} />
                        </div>
                        )
                    
                }else{
                    return <h1>予期していません</h1>
                }
            case "failure":
                return <ErrorPage />
            default:
                return <p></p>
        }
    }
    
    // 検索結果の見せ方を変更するボタンが押された時にそれを変更する関数
    const handleAlignment = (event, newAlignment) => {
      setAlignment(newAlignment);
    };

  return (
    <div>
        
      <Box className="search_component">
      <TextField
        onChange={handleChange}
        id="music_searchbox"
        fullWidth
        label="アーティスト、曲名、歌詞"
        multiline
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />

        {switchView()}
        </Box>

        </div>
  )
}

export default MusicSearch;
import React, {useState} from 'react'
import qs from 'qs';
import axios from 'axios';

// modulesをインポート
import ErrorPage from './modules/Error';
import NoResult from './modules/No_result';
import Result from './modules/Result';

//material-ui
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';

const Search = () => {
    // 検索キーワードを保持するためのstate
    const [keyword, setKeyword] = useState('');
    // APIコール状態を管理するstate
    const [resultType, setResultType] = useState('init')
    // 検索結果を入れるstate
    const [items, setItems] = useState([])

    const apiClient = axios.create({
        baseURL: "https://itunes.apple.com",
    });
    
    const handleSearch = async() => {
        const params = {
            term:keyword,
            media: "music",
            entity: "musicTrack",
            country: "jp",
            lang: "ja_jp",
            limit: "50"
        };
        console.log(params.keyword)
        // baseURLに設定したparamsを使ってgetリクエストを送信
        try{
            const response = await apiClient.get(`/search?${qs.stringify(params)}`);
            console.log('/search?$'+qs.stringify(params))
            console.log(response)//APIのレスポンスをテスト出力

            const {data} = response;
            console.log(data.resultCount)
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
        setKeyword(event.target.value)
    }

    // APIとの通信ができたかどうかで表示するコンポーネントを変更する関数
    const switchView = () => {
        switch(resultType){
            case "no_result":
                return <NoResult />
            case "success":
                return <Result items={items}/>
            case "failure":
                return <ErrorPage />
            default:
                return <p>検索してみよう!</p>
        }
    }

  return (
    <div>
        {/* 検索バー */}
        <SearchIcon />
        <TextField fullWidth label="キーワードで音楽を検索" id="fullWidth" onChange={handleChange} type="text"/>
        {/* 検索ボタン */}
        <button className="search-botton" onClick={handleSearch}>検索</button>
        {switchView()}
    </div>
  )
}

export default Search